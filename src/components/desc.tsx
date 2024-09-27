import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '用户ID',
    children: '1260816246',
  },
  {
    key: '2',
    label: 'email',
    children: 'sc123@leeds.ac.uk',
  },
  {
    key: '3',
    label: '状态',
    children: '在职',
  },
  {
    key: '4',
    label: '手机号',
    children: '12345678910',
  },
  {
    key: '5',
    label: '岗位',
    children:'前端工程师',
  },
	{
    key: '6',
    label: '部门',
    children:'大前端',
  }
];

const Desc: React.FC = () => <Descriptions title="祝您每天开心" items={items} />;

export default Desc;
