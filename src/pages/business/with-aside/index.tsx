import MyButton from '@/components/basic/button';
import { DeleteOutlined, DownOutlined, EditOutlined, PlusCircleFilled, RollbackOutlined, UploadOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Dropdown, Input, Menu, Space, Table, Upload, Form, Modal, Select, Progress } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { supabase } from './../../../config/supabase';
// import Search from 'antd/es/transfer/search';
import { AuthContext } from './../../../context/AuthContext';
import './style.css';
import { toast } from 'react-hot-toast';
import { error } from 'console';
import { read, utils, writeFile } from 'xlsx';

import { difference, differenceBy, differenceWith, uniq, uniqBy } from 'lodash';

import ImgGuideUpLoad from './img/Untitled1.png';

const { Search } = Input;
// const handleMenuClick = e => {
//   message.info('Click on menu item.');
//   console.log('click', e);
// };
const onC = e => {
  console.log(e);
};
const onSearch = e => {
  return;
};

const BusinessWithAsidePage: FC = () => {
  const [listDataClassesResponse, setListDataClassesResponse] = useState<any[]>([]);

  const [liststudent, setliststudent] = useState([]);
  const currentUser = useContext(AuthContext);
  const [ClassCode, setClassCode] = useState('Class code');
  const [SchoolYear, setSchoolYear] = useState('School year');
  const [Semester, setSemester] = useState('Semester');
  const [classID, setClassID] = useState('');
  const useID = currentUser?.currentUser?.id;
  const [students, setstudents] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(4);
  const [page1, setpage1] = useState(1);
  const [paginationSize1, setPaginationSize1] = useState(2);
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (value, item, index) => {
        return (page - 1) * paginationSize + index + 1;
      },
    },
    {
      title: 'Student code',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* {record.id} */}
          {/*   */}
          <EditOutlined value={record.student_code} onClick={() => showEditModal(record)} />
          <DeleteOutlined style={{ color: 'red', marginLeft: '12px' }} />
          {/* onClick={() => showDeleteModal(record)} */}
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (id, record, index) => {
        return (page1 - 1) * paginationSize1 + index + 1;
      },
    },
    {
      title: 'Student code',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <RollbackOutlined
            style={{ color: 'green', marginLeft: '12px' }}
            value={record.id}
            onClick={() => showRecoveModal(record)}
          />
        </Space>
      ),
    },
  ];
  const showRecoveModal = e => {
    console.log(e);
    // setClassRecover(e);
    // setIsModalOpenRecoverClass(e);
  };
  const [loading, setloading] = useState();

  useEffect(async () => {
    const { data: classes, err } = await supabase
      .from('classes')
      .select('*', 'class_code')
      .eq('uid', useID)
      .eq('is_delete', false);

    setListDataClassesResponse(classes);
  }, [useID]);

  const menuSchoolYear = () => {
    const schoolYear = new Set(listDataClassesResponse.map(e => e.school_year));

    const schoolYearList = [...schoolYear];

    const schoolYearListRender = schoolYearList.map(e => ({
      key: e,
      label: e,
    }));

    return (
      <Menu
        onClick={e => {
          setloading(true);
          setSchoolYear(e.key);
          setSemester('Semester');
          setClassCode('ClassCode');
          setClassID('');
        }}
        items={schoolYearListRender}
      />
    );
  };

  const menuSemester = () => {
    const semesterList = listDataClassesResponse.filter(c => c.school_year === SchoolYear);

    const semesterLists = new Set(semesterList.map(e => e.semester).sort());

    const semesterListData = [...semesterLists];

    const semesterListRender = semesterListData.map(c => ({
      key: c,
      label: c,
    }));

    return (
      <Menu
        onClick={e => {
          setSemester(e.key);
        }}
        items={semesterListRender}
      />
    );
  };
  const menuClassCode = () => {
    const classCodeList = listDataClassesResponse.filter(c => c.school_year === SchoolYear && c.semester === Semester);

    const classCodeListTmp = new Set(classCodeList.map(e => e.class_code).sort());

    const classCodeListRender = [...classCodeListTmp].map(c => ({
      key: c,
      label: c,
    }));

    return (
      <Menu
        onClick={async e => {
          setClassCode(e.key);
          if (SchoolYear && Semester && ClassCode) {
            const { ...Class } = listDataClassesResponse.filter(
              c => c.school_year === SchoolYear && c.semester === Semester && c.class_code === e.key,
            );

            const idClass = Class[0].id;

            setClassID(idClass);

            const { data: students, err } = await supabase
              .from('students')
              .select('*')
              .eq('class_id', idClass)
              .eq('is_delete', false);

            setliststudent(students);
            setloading(false);
          }
        }}
        items={classCodeListRender}
      />
    );
  };
  // function refresh
  const refreshData = async () => {
    const { data } = await supabase.from('students').select('*').eq('class_id', classID).eq('is_delete', false);

    setliststudent(data);
  };
  //xu ly modal o day
  //modal of add student

  const [form] = Form.useForm();
  const [isModalOpenAddStudent, setIsModalOpenAddStudent] = useState(false);
  const showModal = () => {
    form.resetFields();
    if (classID) setIsModalOpenAddStudent(true);
    else {
      toast.error('please choose a class for add student!', {
        duration: 5000,
      });
    }
  };
  const handleOkForAddStudent = async e => {
    if (liststudent.filter(c => c.student_code === e.student_code).length > 0) {
      toast.error('student code is exits!', {
        duration: 5000,
      });

      setIsModalOpenAddStudent(false);

      return;
    }

    try {
      e.class_id = classID;

      const { error } = await supabase.from('students').insert(e);

      refreshData();
      toast.success('Add student success.', {
        duration: 5000,
      });
    } catch (error) {
      toast.error('somthing went wrong!', {
        duration: 5000,
      });
    }

    setIsModalOpenAddStudent(false);
  };
  // modal of edit classes
  const [studentEdit, setstudentEdit] = useState();
  const [idStudentEdit, setIdstudentEdit] = useState();

  const [isModalOpenEditStudent, setIsModalOpenEditStudent] = useState(false);
  const showEditModal = e => {
    setstudentEdit(e);
    setIdstudentEdit(e.id);
    form.setFieldsValue({
      student_code: e.student_code,
      full_name: e.full_name,
    });
    setIsModalOpenEditStudent(true);
  };
  const handleOkEditForStudent = async e => {
    try {
      const { error } = await supabase.from('students').update(e).eq('class_id', classID).eq('id', idStudentEdit);

      refreshData();
      if (error) throw error;

      toast.success('Edit class success.', {
        duration: 5000,
      });
    } catch (err) {
      toast.error('somthing went wrong!', {
        duration: 5000,
      });
    }

    setIsModalOpenEditStudent(false);
  };
  //modal delete classes
  const [isModalOpenDeleteStudent, setIsModalOpenDeleteStudent] = useState(false);
  const [studentDelete, setStudentDelete] = useState();
  const showDeleteModal = e => {
    console.log(e);

    setStudentDelete(e);
    setIsModalOpenDeleteStudent(true);
  };
  const handleOkDeleteStudent = async () => {
    try {
      classDelete.is_delete = true;
      const { error } = await supabase.from('classes').update(classDelete).eq('id', classDelete.id);

      if (error) throw error;
      refreshData();
      toast.success('Delete class success.', {
        duration: 5000,
      });
    } catch (err) {
      toast.error('somthing went wrong!', {
        duration: 5000,
      });
    }

    setIsModalOpenDeleteClass(false);
  };
  const handleCancel = () => {
    setIsModalOpenAddStudent(false);
    setIsModalOpenEditStudent(false);
  };
  // function for handle file import student
  const [progress, setprogress] = useState(0);
  const [hiddentProgress, setHidentProgress] = useState(true);
  const handleImport = $event => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = event => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          let data = rows.map(e => ({ ...e, student_code: e.student_code + '', class_id: classID }));

          const dataAffterFormat = uniqBy(data, 'student_code');

          const dataInsert = differenceBy(
            dataAffterFormat,
            liststudent,
            'student_code',

            // function(arrValue, othValue) {
            // return arrValue.student_code === othValue.student_code;
            // }
          );
          setHidentProgress(false);
          if (dataInsert.length === 0) {
            toast.error('student code is exits!', {
              duration: 5000,
            });
          } else {
            dataInsert.map(async e => {
              let inteval = 1;

              while (inteval !== 100) {
                setTimeout(() => {
                  setprogress(inteval);
                }, 1000);
                inteval += 1;
              }
              setliststudent([...liststudent, e]);
              const { error } = await supabase.from('students').insert(e);
            });
            toast.success('import file success.', {
              duration: 5000,
            });
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <div css={styles}>
    <div className="tabs-main">
      <div className="aside-main">
        <div style={{ display: 'flex', padding: '20px' }}>
  <label style={{ paddingRight: '20px' }}>Please choose a class</label>
          <Dropdown overlay={menuSchoolYear()} className="dropdown-scroll">
            <Button>
              <Space>
                {SchoolYear}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown overlay={menuSemester()} className="dropdown-scroll">
            <Button>
              <Space>
                {Semester}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown overlay={menuClassCode()} className="dropdown-scroll">
            <Button>
              <Space>
                {ClassCode}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <div style={{ paddingLeft: '300px', justifyContent: 'center' }}>
            <Search
              placeholder="Search students..."
              onSearch={onSearch}
              enterButton
              style={{
                width: 250,
                paddingRight: '10px',
              }}
            />
          </div>
          <div style={{ paddingLeft: '10px', justifyContent: 'center' }}>
            <Button onClick={showModal}>
              <PlusCircleFilled style={{ color: '#1E90FF' }} />
              Add Student
            </Button>
          </div>           
   <Modal title="Add Student" open={isModalOpenAddStudent} onOk={form.submit} onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={handleOkForAddStudent}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <span>
            <Form.Item
              name="student_code"
              label="Student Code"
              rules={[
                {
                  required: true,
                  message: 'Input student code',
                  pattern: new RegExp('^([{20\\21\\22\\23\\24\\25\\26\\27\\28}][0-9]{9,10})$'),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="full_name"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: 'Input student name',
                  pattern: new RegExp(
                    '^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]{2,50}$',
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </span>
        </Form>
      </Modal>
      <Modal title="Edit Student" open={isModalOpenEditStudent} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleOkEditForStudent}>
          <Form.Item
            name="student_code"
            label="Student Code"
            rules={[
              {
                required: true,
                message: 'Input student code',
              },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: 'Input student name',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Class"
        open={isModalOpenDeleteStudent}
        onOk={form.submit}
        onCancel={handleCancel}
        okButtonProps={{
          className: 'button-delete-modal',
          style: {
            color: 'red',
          },
          type: 'ghost',
        }}
      >
        <Form form={form} onFinish={handleOkDeleteStudent}>
          <h4>Are you sure delete class ?</h4>
        </Form>
      </Modal>
        </div>
        <div className="content-table" style={{overflow: 'auto',height: '100%',  backgroundColor: '#fdfdfd',
width: '100%',
borderRadius: '6px',
boxShadow: '0 4px 28px rgba(123,151,158,.25)',
border: '1px solid #d6dee1',
padding: '1rem'}}>
          <div className="table">
            <h3>Existing Students</h3>
       <Table
              // pagination={{ pageSize: 5 }}
              dataSource={liststudent}
              columns={columns}
              bordered
              // onChange={onC}
              loading={loading}
              locale={{ emptyText: 'please choose a class to display students list' }}
              pagination={{
                onChange(current, pageSize) {
                  setPage(current);
                  setPaginationSize(pageSize);
                },
                defaultPageSize: 5,
              }}
              size="small"
            />
          </div>
          <div className='table' style={{marginTop:'0',paddingTop:'0'}}>
              <h3>Deleted Class</h3>
              <Table
                pagination={{
                  onChange(current, pageSize) {
                    setpage1(current);
                    setPaginationSize1(pageSize);
                  },
                  defaultPageSize: 5,
                }}
                // dataSource={classHasDelete}
                columns={columns1}
                bordered
                loading={loading}
              />
            </div>
          <div className='table' style={{marginTop:'0',paddingTop:'0'}}>
                        <div
            style={{
              // width: '100%',
              paddingTop: '40px',
            }}
          >
            <div>
              <Space>
                <input
                  style={{ margin: 0 }}
                  type="file"
                  required
                  onChange={handleImport}
                  onClick={() => {
                    setHidentProgress(true);
                  }}
                  disabled={classID?.length === 0}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <Progress
                style={{margin:'0px',padding:'0px'}}
                  percent={progress}
                  status="active"
                  type="circle"
                  width={40}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  hidden={hiddentProgress}
                />
                Example file import:
                <img src={ImgGuideUpLoad} height="auto" width="900px" alt="" />
              </Space>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    // padding: 20px;
    margin: 30px;
  }

  // .table {
  //   flex: 1;
  //   overflow: hidden;
  // }
`;

export default BusinessWithAsidePage;
