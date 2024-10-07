import React, { memo, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import { Dept, Menu } from '@/types/api'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
import { message } from '@/utils/AntdGlobal'
import { formatDate } from '@/utils'
import { MenuListWrapper } from './style'
const MenuList = memo(() => {
	const [form] = useForm()
	const [data, setData] = useState<Menu.MenuItem[]>([])

	const deptRef = useRef<{
		open: (type: IAction, data?: Dept.EidtParams | { parentId: string }) => void
	}>()
	const handleCreate = () => {
		deptRef.current?.open('create')
	}

	useEffect(() => {
		getMenuList()
	}, [])

	const handleDelet = (id:string) => {
		Modal.confirm({
			title:'确认',
			content:'确认删除改部门吗？',
			onOk:()=>{
				handleDelSubmit(id)
			}

		})
	}
	const handleDelSubmit = async (_id:string)=>{
		await api.deleteDept({
			_id
		})
		message.success('删除成功')
		getMenuList()
	}

	const handleSubCreate = (id: string) => {
		deptRef.current?.open('create', { parentId: id })
	}
	const getMenuList = async () => {
		const data = await api.getMenuList(form.getFieldsValue())
		setData(data)
	}
	const handleReset = () => {
		form.resetFields()
	}
	const handleEdit = (record: Menu.MenuItem) => {
		// deptRef.current?.open('edit', record)
	}

	const columns: ColumnsType<Menu.MenuItem> = [
		{
			title: '菜单名称',
			dataIndex: 'menuName',
			key: 'menuName',
		},
		{
			title: '菜单图标',
			dataIndex: 'icon',
			key: 'icon',
		},
		{
			title: '菜单类型',
			dataIndex: 'menuType',
			key: 'menuType',
			render(menuType: number){
				return {
					1:'菜单',
					2:'按钮',
					3:'页面'
				}[menuType]
			}
		},
		{
			title: '权限标识',
			dataIndex: 'menuCode',
			key: 'menuCode',
		},
		{
			title: '路由地址',
			dataIndex: 'path',
			key: 'path',
		},
		{
			title: '组件名称',
			dataIndex: 'component',
			key: 'component',
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
			render(createTime){
				return formatDate(createTime)
			}
		},
		{
			title: '操作',
			key: 'action',
			width: 200,
			render(_, record) {
				return <Space>
					<Button type='text' onClick={() => handleSubCreate(record._id)}>新增</Button>
					<Button type='text' onClick={() => handleEdit(record)}>编辑</Button>
					<Button type='text' onClick={() => handleDelet(record._id)}>删除</Button>
				</Space>
			}
		}
	]
	return (
			<MenuListWrapper>
			<Form className='searchForm' layout='inline' form={form}>
				<Form.Item label='菜单名称' name='menuName'>
					<Input placeholder='菜单名称' />
				</Form.Item>
				<Form.Item label='菜单状态' name='menuState' >
					<Select className='menuState'>
						<Select.Option value={1}>正常</Select.Option>
						<Select.Option value={2}>停用</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type='primary' className='mr10' onClick={getMenuList}>搜索</Button>
					<Button type='default' onClick={handleReset}>重置</Button>
				</Form.Item>
			</Form>

			<div className='baseTable'>
				<div className='header'>
					<div className='title'>菜单列表</div>
					<div className='action'>
						<Button type='primary' onClick={handleCreate}>新增</Button>
					</div>
				</div>
				<Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
			</div>
			</MenuListWrapper>
	)
})

export default MenuList
