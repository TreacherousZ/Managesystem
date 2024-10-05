import React, { memo, useEffect, useState } from 'react'
import { Button, Form, Input, Space, Table } from 'antd'
import { DeptListWrapper } from './style'
import { useForm } from 'antd/es/form/Form'
import CreatrDept from './CreateDept'
import api from '@/api'
import { Dept } from '@/types/api'
const DeptList = memo(() => {
	const [form] = useForm()
	const [data, setData] = useState<Dept.DeptItem[]>([])
	useEffect(() => {
		getDeptList()
	}, [])

	const getDeptList = async () => {
		const data = await api.getDeptList(form.getFieldsValue())
		setData(data)
	}
	const handleReset = ()=>{
		form.resetFields()
	}

	const columns = [
		{
			title: '部门名称',
			dataIndex: 'deptName',
			key: 'deptName',
			width: 200
		},
		{
			title: '负责人',
			dataIndex: 'userName',
			key: 'userName',
			width: 150
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			key: 'updateTime',
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
		}, {
			title: '操作',
			key: 'action',
			width: 200,
			render() {
				return <Space>
					<Button type='text'>新增</Button>
					<Button type='text'>编辑</Button>
					<Button type='text'>删除</Button>
				</Space>
			}
		}
	]
	return (
		<DeptListWrapper>
			<Form className='searchForm' layout='inline' form={form}>
				<Form.Item label='部门名称' name='deptName'>
					<Input placeholder='部门名称' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' className='mr10' onClick={getDeptList}>搜索</Button>
					<Button type='default' onClick={handleReset}>重置</Button>
				</Form.Item>
			</Form>

			<div className='baseTable'>
				<div className='header'>
					<div className='title'>部门列表</div>
					<div className='action'>
						<Button className='addBtn'>新增</Button>
					</div>
				</div>
				<Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
			</div>
			<CreatrDept/>
		</DeptListWrapper>
	)
})

export default DeptList
