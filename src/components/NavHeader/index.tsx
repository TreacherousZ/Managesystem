import React, { memo } from 'react'
import { HeaderWrapper } from './style'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import storage from '@/utils/storage'
import { useStore } from '@/store'


const NavHeader = memo(() => {
	const {userInfo, collapsed, updateCollapsed} = useStore()
	const breadList = [
		{
			title: '首页'
		},
		{
			title: '工作台'
		}
	]

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

	return (
		<HeaderWrapper>
			<div className='left'>
				<div onClick={toggleCollapsed}>
					{collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
				</div>
				<Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
			</div>
			<div className='right'>
				<Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
				<Dropdown menu={{ items, onClick }} trigger={['click']}>
					<span className='nickName'>{userInfo.userName}</span>
				</Dropdown>
			</div>
		</HeaderWrapper>
	)
})


export default NavHeader
