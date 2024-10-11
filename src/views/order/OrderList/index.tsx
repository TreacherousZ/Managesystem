import api from "@/api";
import { Order } from "@/types/api";
import { useAntdTable } from "ahooks";
import { Button, Form, Input, Select, Space } from "antd"
import Table, { ColumnsType } from "antd/es/table";
import { OrderListWrapper } from "./style";

export default function OrderList() {
	const [form] = Form.useForm()

	const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Order.SearchParams) => {
		return api
			.getOrderList({
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

	const { tableProps, search } = useAntdTable(getTableData, {
		form,
		defaultPageSize: 10,
		defaultParams: [
			{current: 1, pageSize: 10},
			{state: 0}
		]
	})

	const columns: ColumnsType<Order.OrderItem> = [
		{
			title: '订单编号',
			dataIndex: 'orderId',
			key: 'orderId'
		},
		{
			title: '城市',
			dataIndex: 'cityName',
			key: 'cityName'
		},
		{
			title: '下单地址',
			dataIndex: 'startedAddress',
			key: 'startedAddress'
		},
		{
			title: '下单时间',
			dataIndex: 'createTime',
			key: 'createTime'
		},
		{
			title: '订单价格',
			dataIndex: 'orderMount',
			key: 'orderMount'
		},
		{
			title: '订单状态',
			dataIndex: 'state',
			key: 'state'
		},
		{
			title: '用户名称',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: '司机名称',
			dataIndex: 'driverName',
			key: 'driverName'
		},
		{
			title: '操作',
			key: 'action',
			render(_, record) {
				return <Space>
					<Button type='text'>详情</Button>
					<Button type='text'>打点</Button>
					<Button type='text'>轨迹</Button>
					<Button type='text' danger>删除</Button>
				</Space>
			}
		},
	]
	return (
		<OrderListWrapper>
			<div className="OrderList">

				<div className='user-list'>
					<Form className='searchForm' form={form} layout='inline' initialValues={{ state: 0 }}>
						<Form.Item name='orderId' label='订单ID'>
							<Input placeholder='请输入用户ID' />
						</Form.Item>
						<Form.Item name='userName' label='用户名称'>
							<Input placeholder='请输入用户名称' />
						</Form.Item>
						<Form.Item name='state' label='订单状态'>
							<Select style={{ width: 120 }}>
								<Select.Option value={0}>进行中</Select.Option>
								<Select.Option value={1}>已完成</Select.Option>
								<Select.Option value={2}>超时</Select.Option>
								<Select.Option value={3}>取消</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item>
							<Space>
								<Button type='primary' onClick={search.submit}>
									搜索
								</Button>
								<Button type='default' onClick={search.reset}>
									重置
								</Button>
							</Space>
						</Form.Item>
					</Form>
					<div className='baseTable'>
						<div className='header'>
							<div className='title'>用户列表</div>
							<div className='action'>
								<Button type='primary' >
									新增
								</Button>

							</div>
						</div>
						<Table
							bordered
							rowKey='userId'
							columns={columns}
							{...tableProps}
						/>
					</div>

				</div>

			</div>
		</OrderListWrapper>
	)


}
