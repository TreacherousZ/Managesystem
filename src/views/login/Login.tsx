import React, { memo } from 'react'; // 引入 memo
import { LoginWrapper } from "./style"; // 样式文件
import login_bg from '@/assets/login_bg.jpg'; // 导入图片
import { Form, Button, Input } from "antd";
const onFinish = () => {

}
const Login = memo(() => {
	return (
		<LoginWrapper>
			<img src={login_bg} />
			<div className='login-from'>
				<div className='title'>系统登录</div>
				<Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
					<Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input />
					</Form.Item>

					<Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type='primary' block htmlType='submit'>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</LoginWrapper>
	);
});


export default Login
