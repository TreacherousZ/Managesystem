import React, { memo, useRef } from 'react'
import { RoleWrapper } from './style'
import { useAntdTable } from 'ahooks'
import { Button, Form, Input, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import { Role, User } from '@/types/api'
import FormItem from 'antd/es/form/FormItem'
import { formatDate } from '@/utils'
import CreateRole from './CreateRole'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
const RoleList = memo(() => {
	const roleRef = useRef<{
		open: (type: IAction, data?: Role.RoleItem) => void
	}>()
	const [form] = useForm()
	const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Role.Params) => {
		return api
			.getRoleList({
				...formData,
				pageNum: current,
				pageSize: pageSize
			})
			.then(data => {
				return {
					total: data.page.total,
					list: data.list
				}
			})
	}
	// 创建角色
	const handleCreate = () => {
		roleRef.current?.open('create')
	}
	// 编辑角色
	const handleEdit = (data: Role.RoleItem) => {
		roleRef.current?.open('edit', data)
	}

	const { tableProps, search } = useAntdTable(getTableData, {
		form,
		defaultPageSize: 10
	})

	const columns: ColumnsType<Role.RoleItem> = [
		{
			title: '角色名称',
			dataIndex: 'roleName',
			key: 'roleName'
		},
		{
			title: '备注',
			dataIndex: 'remark',
			key: 'remark'
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			key: 'updateTIme',
			render(updateTime: string) {
				return formatDate(updateTime)
			}
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
			render(createTime: string) {
				return formatDate(createTime)
			}
		},
		{
			title: '操作',
			key: 'action',
			render(_, record) {
				return (<Space>
					<Button onClick={() => handleEdit(record)}>编辑</Button>
					<Button>设置权限</Button>
					<Button>删除</Button>
				</Space>
				)
			}
		},
	]
	return (
		<RoleWrapper>
			<Form form={form} className='searchForm' layout='inline'>
				<Form.Item name='roleName' label='角色名称'>
					<Input placeholder='请输入角色名称' />
				</Form.Item>
				<FormItem>
					<Space>
						<Button type='primary' onClick={search.submit}>搜索</Button>
						<Button type='default' onClick={search.submit}>重置</Button>
					</Space>
				</FormItem>

			</Form>
			<div className='baseTable'>
				<div className='header'>
					<div className='title'>角色列表</div>
					<div className='action'>
						<Button type='primary' onClick={handleCreate}>
							新增
						</Button>

					</div>
				</div>
				<Table
					bordered
					rowKey='_id'

					columns={columns}
					{...tableProps}
				/>
			</div>
			<CreateRole mRef={roleRef} update={search.submit} />
		</RoleWrapper>
	)
})

export default RoleList
