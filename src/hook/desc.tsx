import React, { memo, useEffect } from 'react'
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useStore } from '@/store';
import { formatState } from '@/utils';
const Desc = memo(() => {

	//请求接口数据
	const userInfo = useStore(state => state.userInfo)

	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: '用户ID',
			children: userInfo.userId,
		},
		{
			key: '2',
			label: 'email',
			children: userInfo.userEmail,
		},
		{
			key: '3',
			label: '状态',
			children: formatState(userInfo.state) ,
		},
		{
			key: '4',
			label: '手机号',
			children: userInfo.mobile,
		},
		{
			key: '5',
			label: '岗位',
			children: userInfo.job,
		},
		{
			key: '6',
			label: '部门',
			children: userInfo.deptName,
		}
	];


	return (
		<Descriptions title="祝您每天开心">
			{items.map(item => (
				<Descriptions.Item key={item.key} label={item.label}>
					{item.children}
				</Descriptions.Item>
			))}
		</Descriptions>
	)
})

export default Desc
