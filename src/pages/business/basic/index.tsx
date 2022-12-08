import { Space, Tag, Button, Dropdown, Table, Menu } from 'antd';
import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { BuniesssUser } from '@/interface/business';
import { FC, useState, useEffect, useContext } from 'react';
import { supabase } from './../../../config/supabase';
import { AuthContext } from './../../../context/AuthContext';
import { DownOutlined } from '@ant-design/icons';



const BusinessBasicPage: FC = () => {
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(4);
  const [loading, setLoading] = useState();
  
  const currentUser = useContext(AuthContext);
  const useID = currentUser?.currentUser?.id;

  //list classes 
  const [listDataClassesResponse, setListDataClassesResponse] = useState<any[]>([]);
  const [ClassCode, setClassCode] = useState('Class code');
  //list exam
  const [exam, setExam] = useState('Exams');
  const [listDataExamsResponse, setListDataExamsResponse] = useState<any[]>([]);
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
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  useEffect(async () => {
    const { data: classes, err } = await supabase
      .from('classes')
      .select('*', 'class_code')
      .eq('uid', useID)
      .eq('is_delete', false);

    setListDataClassesResponse(classes);
  }, [useID]);
    
// menu class code 
const menuClassCode = () => {

  const classCodeListTmp = new Set(listDataClassesResponse.map(e => e.class_code).sort());
  const classCodeListRender = [...classCodeListTmp].map(c => ({
    key: c,
    label: c,
  }));

  return (
    <Menu
      onClick={async e => {
        setClassCode(e.key);
        console.log("🚀 ~ file: index.tsx:93 ~ menuClassCode ~ key", e.key)
        const { data: classID, err } = await supabase
        .from('classes')
        .select('id')
        .eq('class_code', e.key)
        .eq('is_delete', false);
        console.log("🚀 ~ file: index.tsx:80 ~ menuClassCode ~ classID", classID)

        const { data: exams, err1 } = await supabase
        .from('exams')
        .select('*')
        .eq('class_id', classID[0].id)
        .eq('is_delete', false);
        console.log("🚀 ~ file: index.tsx:87 ~ menuClassCode ~ exams", exams)
        setListDataExamsResponse(exams)
          // const { data: studentsIsDelete, err1 } = await supabase
          //   .from('students')
          //   .select('*')
          //   .eq('class_id', idClass)
          //   .eq('is_delete', true)
          //   .order('student_code', { ascending: true });
          // setliststudentIsDelete(studentsIsDelete);
          setLoading(false);
        }
      }
      items={classCodeListRender}
    />
  );
};

const menuExam = () => {
  console.log("day la list exam tra ve ",listDataExamsResponse);
  
  const examsListTmp = new Set(listDataExamsResponse.map(e => e.name).sort());

  const examListRender = [...examsListTmp].map(c => ({
    key: c,
    label: c,
  }));

  return (
    <Menu
      onClick={async e => {
        setExam(e.key);
        console.log(e);
      //   const { data: result, error } = await supabase
      // .from("answer_students")
      // .select("*, students(full_name, student_code)")
      // .eq("students.is_delete", false)
      // .eq("students.class_id", class_id);
        
        }
      }
      items={examListRender}
    />
  );
};


  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <div >
      {/* css={styles} */}
      <div className="tabs-main">
        <div className="aside-main">
          {/* <div style={{ display: 'flex', padding: '20px' }}> */}
          <Space style={{ padding: '20px' }}>
            <label style={{ paddingRight: '10px', fontWeight: 'bold', paddingTop: '5px' }}>Please choose a class and exam</label>
            <Dropdown overlay={menuClassCode()} className="dropdown-scroll">
              <Button>
                <Space>
                {ClassCode}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={menuExam()} className="dropdown-scroll">
              <Button>
                <Space>
                  {exam}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            {/* <div style={{ paddingLeft: '200px', justifyContent: 'center' }}>
            <Search
              placeholder="Search students by name..."
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
          </div> */}
          </Space>
          <div
            className="content-table"
            style={{
              overflow: 'auto',
              height: '100%',
              width: '100%',
              borderRadius: '2px',
              boxShadow: '0 4px 28px rgba(123,151,158,.25)',
              border: '1px solid #d6dee1',
              padding: '1rem',
            }}
          >
            <div className="table" style={{ marginTop: '0', paddingTop: '0' }}>
              <h3>Result of students</h3>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{
                  onChange(current, pageSize) {
                    setPage(current);
                    setPaginationSize(pageSize);
                  },
                  defaultPageSize: 50,
                }}
                scroll={{
                  y: 240,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessBasicPage;
