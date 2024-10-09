import React, { Children, memo, useEffect, useState } from 'react'
import { SideMenuWrapper } from './style'
import { Collapse, Menu } from 'antd';
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStore } from '@/store';
import { MenuProps, MenuTheme } from 'antd/es/menu';
import { Menu as IMenu } from '@/types/api';
import * as Icons from '@ant-design/icons'

const SideMenu = memo(() => {
	const [menuList, setMenuList] = useState<MenuItem[]>([])
	const navigate = useNavigate()
	const collapsed = useStore(state => state.collapsed)
	const data: any = useRouteLoaderData('layout')
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])

	const { pathname } = useLocation()
	type MenuItem = Required<MenuProps>['items'][number]
	// 生成每一个菜单项
	function getItem(
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[]
	): MenuItem {
		return {
			label,
			key,
			icon,
			children
		} as MenuItem
	}
	function createIcon(name?: string) {
		if (!name) return <></>
		const customerIcons: { [key: string]: any } = Icons
		const icon = customerIcons[name]
		if (!icon) return <></>
		return React.createElement(icon)
	}
	//递归生成菜单
	const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
		menuList.forEach((item, index) => {
			if (item.menuType === 1 ) {
				// 如果有按钮或者这个菜单项没有子菜单，则创建没有下拉图标的菜单项
				if (item.buttons || !item.children || item.children.length === 0) {
					// 创建没有子项的菜单项
					treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
				} else {
					// 正常创建带子菜单的菜单项
					treeList.push(
						getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
					)
				}
			}
		})
		return treeList
	}

	// 初始化，获取接口菜单列表数据
	useEffect(() => {
		const treeMenuList = getTreeMenu(data.menuList)
		setMenuList(treeMenuList)
		setSelectedKeys([pathname])
	}, [])

	// Logo点击
	const handleClickLogo = () => {
		navigate('/welcome')
	}

	// 菜单点击
	const handleClickMenu = ({ key }: { key: string }) => {
		setSelectedKeys([key])
		navigate(key)
	}


	return (

		<SideMenuWrapper>
			<div>
				<div className='logo' onClick={handleClickLogo}>
					<img src="src/assets/logo.png" className='img' />
					{collapsed ? '' : <span>运输管理系统</span>}

				</div>
			</div>
			<Menu
				mode="inline"
				theme="dark"
				style={{ width: collapsed ? 80 : 'auto' }}
				items={menuList}
				onClick={handleClickMenu}
				selectedKeys={selectedKeys}
			/>

		</SideMenuWrapper>


	)
})

export default SideMenu
