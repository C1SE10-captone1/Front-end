import { Space, Tag } from 'antd';
import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import { MySideOption } from '@/components/business/aside';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { BuniesssUser } from '@/interface/business';
import { FC } from 'react';

const { Item: SearchItem } = MyPage.MySearch;

const asideOptions: MySideOption[] = [
  {
    title: 'MTH 203',
    key: 1,
  },
  {
    title: 'CMU-SE 403 CIS',
    key: 2,
  },
  {
    title: 'CMU-SE 450 AIS (2022F)',
    key: 3,
  },
];

const tableColums: MyPageTableOptions<BuniesssUser> = [
  {
    title: 'Name',
    children: [
      { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    ],
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags, record) => (
      <>
        {record.tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <MyButton type="text">Invite {record.lastName}</MyButton>
        <MyButton type="text">Delete</MyButton>
      </Space>
    ),
  },
];

const BusinessWithAsidePage: FC = () => {
  return (
    <MyPage
      pageApi={getBusinessUserList}
      asideData={asideOptions}
      asideKey="key"
      searchRender={
        <>
          <SearchItem label="Mã số sinh viên" name="firstName" type="input" />
          <SearchItem label="Tên" name="firstName1" type="input" />
        </>
      }
      tableOptions={tableColums}
    ></MyPage>
  );
};

export default BusinessWithAsidePage;
