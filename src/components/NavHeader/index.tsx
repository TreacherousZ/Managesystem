import React, { memo, useEffect } from 'react'
import { HeaderWrapper } from './style'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import {  Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import storage from '@/utils/storage'
import { useStore } from '@/store'
import BreadCrumb from './BreadCrumb'


const NavHeader = memo(() => {
 useEffect(()=>{
	handleSwitch(isDark)
 },[])

	const {userInfo, collapsed, updateCollapsed, updateTheme, isDark} = useStore()

	const items: MenuProps['items'] = [
		{
			key: 'email',
			label: '邮箱：' + userInfo.userEmail
		},
		{
			key: 'logout',
			label: '退出'
		}
	]
	//控制菜单图标关闭展开
	const toggleCollapsed = ()=> {
		updateCollapsed()
	}


	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key === 'logout') {
			storage.remove('token')
			location.href = '/login?callback=' + encodeURIComponent(location.href)
		}
	}

	const handleSwitch = (isDark: boolean)=>{
		if(isDark){
			document.documentElement.dataset.theme = 'dark'
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.dataset.theme = 'light'
			document.documentElement.classList.remove('dark')
		}
		storage.set('isDark', isDark)
		updateTheme(isDark)
	}

	return (
		<HeaderWrapper>
			<div className='left'>
				<div onClick={toggleCollapsed}>
					{collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
				</div>
				<BreadCrumb/>
			</div>
			<div className='right'>
				<Switch checked={isDark} checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} onChange={handleSwitch}/>
				<Dropdown menu={{ items, onClick }} trigger={['click']}>
					<span className='nickName'>{userInfo.userName}</span>
				</Dropdown>
			</div>
		</HeaderWrapper>
	)
})


export default NavHeader
