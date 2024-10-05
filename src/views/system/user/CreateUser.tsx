import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Select, Upload } from "antd";
import { useImperativeHandle, useState } from "react";
import storage from "@/utils/storage";
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { message } from "@/utils/AntdGlobal";
import { IAction, IModalProp } from "@/types/modal";
import { User } from "@/types/api";
import api from "@/api";

const CreateUser = (props: IModalProp) => {
	const [form] = Form.useForm()
	const [img, setImg] = useState('')
	const [loading, setLoading] = useState(false)
	const [visble, setVisbile] = useState(false)
	const [action, setAction] = useState<IAction>('create')

	useImperativeHandle(props.mRef, () => {
		return {
			open
		}
	})

	const open = (type: IAction, data?: User.UserItem) => {
		setAction(type)
		setVisbile(true)
		if (type === 'eidt' && data) {
			form.setFieldsValue(data)
			setImg(data.userImg)
		}
	}

	const handleSubmit = async () => {
		const valid = await form.validateFields()
		console.log(valid)
		if (valid) {

			const params = {
				...form.getFieldsValue(),
				userImg: img
			}

			if (action === 'create') {
				await api.createUser(params)
				message.success('创建成功')
				props.update()
			} else {
				await api.editUser(params)
				message.success('修改成功')

			}
			handleCancel()
			props.update()
		}
	}



	const handleCancel = () => {
		setVisbile(false)
		form.resetFields()
	}

	//上传之前，接口处理
	const beforeUpload = (file: RcFile) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('只能上传png或jpeg格式的文件');
			return false
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}
	//上传后，图片处理
	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			setLoading(false)
			const { code, data, msg } = info.file.response
			if (code === 0) {
				setImg(data.file)
			} else {
				message.error(msg)
			}
		} else if (info.file.status === 'error') {
			message.error('服务器异常，请稍候重试')
		}
	}

	return (
		<Modal
			title={action === 'create' ? '创建用户' : '编辑用户'}
			width={800}
			open={visble}
			onOk={handleSubmit}
			onCancel={handleCancel}
			okText='确定'
			cancelText='取消'
		>
			<Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
				<Form.Item name='userId' hidden>
					<Input />
				</Form.Item>
				<Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
					<Input placeholder="请输入用户名称"></Input>
				</Form.Item>
				<Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
					<Input placeholder="请输入用户邮箱"></Input>
				</Form.Item>
				<Form.Item label='手机号' name='mobile'>
					<Input type='number' placeholder="请输入手机号"></Input>
				</Form.Item>
				<Form.Item label='部门' name='deptId'>
					<Input placeholder="请输入部门" ></Input>
				</Form.Item>
				<Form.Item label='岗位' name='job'>
					<Input placeholder="请输入岗位"></Input>
				</Form.Item>
				<Form.Item label='状态' name='state'>
					<Select>
						<Select.Option value={1}>在职</Select.Option>
						<Select.Option value={2}>离职</Select.Option>
						<Select.Option value={3}>试用期</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label='角色' name='roleList'>
					<Input placeholder="请输入角色"></Input>
				</Form.Item>


				<Form.Item label='用户头像'>
					<Upload
						listType="picture-circle"
						showUploadList={false}
						headers={
							{
								Authorization: 'Bearer ' + storage.get('token'),
								icode: '9AF78BC87D071B3C'
							}
						}
						action='/api/users/upload'
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{
							img ? <img src={img} style={{ width: '100%', borderRadius: '100%' }} /> :
								(
									<div>
										{loading ? <LoadingOutlined /> : <PlusOutlined />}
										<div style={{ marginTop: 5 }}>上传头像</div>
									</div>
								)
						}

					</Upload>
				</Form.Item>
			</Form>

		</Modal>
	)
}

export default CreateUser
