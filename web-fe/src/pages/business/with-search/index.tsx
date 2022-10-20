import { Button, Space, Tag } from 'antd';
import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { BuniesssUser } from '@/interface/business';
import { FC } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const { Item: SearchItem } = MyPage.MySearch;

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
        <MyButton type="text">Detail {record.lastName}</MyButton>
        <MyButton type="text">Delete</MyButton>
      </Space>
    ),
  },
];

const BusinessWithSearchPage: FC = () => {
  return (
    <MyPage
      pageApi={getBusinessUserList}
      searchRender={
        <>
          <SearchItem label="Lớp : " name="firstName" type="input" />
        </>
      }
      tableOptions={tableColums}
    ></MyPage>
  );
};

export default BusinessWithSearchPage;
