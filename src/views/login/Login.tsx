import React, { memo, useState } from 'react';
import { LoginWrapper } from "./style";
import login_bg from '@/assets/login_bg.jpg';
import LoginForm from '@/components/LoginForm';
import { Login } from '@/types/api';
import api from '@/api';
import storage from '@/utils/storage';
import { message } from 'antd';
import { useStore } from '@/store';



const LoginFC = memo(() => {
	const [loading, setLoading] = useState(false)
	const updateToken = useStore(state=>state.updateToken)
  const onFinish = async (values: Login.params) => {
    try {
     
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
	return (
		<LoginWrapper>
			<img src={login_bg} />
			<div className='login-from'>
				<div className='title'>系统登录</div>
				<LoginForm onFinish={onFinish} loading={loading} />
			</div>
		</LoginWrapper>
	);
});


export default LoginFC
