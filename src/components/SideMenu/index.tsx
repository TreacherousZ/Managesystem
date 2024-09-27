import React, { Children, memo } from 'react'
import { SideMenuWrapper } from './style'
import { Collapse, Menu } from 'antd';
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';

const SideMenu = memo(() => {
	const collapsed = useStore(state=>state.collapsed)

	const navigate =  useNavigate()
	const clickHandle = () => {
		return navigate('/welcome')
	}


	const items = [
		{
			label: '工作台',
			key: '1',
			icon: <DesktopOutlined />
		},
		{
			label: '系统管理',
			key: '2',
			icon: <SettingOutlined />,
			children: [
				{
					label: '用户管理',
					key: '3',
					icon: <TeamOutlined />
				}
			]
		},

	]


	return (

		<SideMenuWrapper>
			<div>
				<div className='logo' onClick={clickHandle}>
					<img src="src/assets/logo.png" className='img' />
					{collapsed? '' : <span>运输管理系统</span>}

				</div>
			</div>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
				style = {{width: collapsed? 80: 'auto'}}
				items={items}
			/>

		</SideMenuWrapper>


	)
})

export default SideMenu
