import React, { Children, memo, useEffect, useState } from 'react'
import { SideMenuWrapper } from './style'
import { Collapse, Menu } from 'antd';
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useStore } from '@/store';
import { MenuProps, MenuTheme } from 'antd/es/menu';
import { Menu as IMenu } from '@/types/api';
import * as Icons from '@ant-design/icons'

const SideMenu = memo(() => {
	const [menuList, setMenuList] = useState<MenuItem[]>([])
	const collapsed = useStore(state => state.collapsed)
	const data:any = useRouteLoaderData('layout')

	type MenuItem = Required<MenuProps>['items'][number]
	//生成每一个菜单项
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
		if(!name) return <></>
		const customerIcons:{[key:string]: any} = Icons
		const icon = customerIcons[name]
		if(!icon) return<></>
		return React.createElement(icon)
	}

	const navigate = useNavigate()
	const clickHandle = () => {
		return navigate('/welcome')
	}


	//递归生成菜单
	const getTreeMenu = (menuList:IMenu.MenuItem[], treeList:MenuItem[]=[])=>{
		menuList.forEach((item, index)=>{
			if(item.menuType === 1){
				if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))

				treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || [])))
			}
		})
		return treeList
	}
	//初始化获取接口菜单列表数据
	useEffect(()=>{

    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
	},[])
	// const items = [
	// 	{
	// 		label: '工作台',
	// 		key: '1',
	// 		icon: <DesktopOutlined />
	// 	},
	// 	{
	// 		label: '系统管理',
	// 		key: '2',
	// 		icon: <SettingOutlined />,
	// 		children: [
	// 			{
	// 				label: '用户管理',
	// 				key: '3',
	// 				icon: <TeamOutlined />
	// 			},
	// 			{
	// 				label: '部门管理',
	// 				key: '4',
	// 				icon: <TeamOutlined />
	// 			}
	// 		]
	// 	},

	// ]


	return (

		<SideMenuWrapper>
			<div>
				<div className='logo' onClick={clickHandle}>
					<img src="src/assets/logo.png" className='img' />
					{collapsed ? '' : <span>运输管理系统</span>}

				</div>
			</div>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
				style={{ width: collapsed ? 80 : 'auto' }}
				items={menuList}
			/>

		</SideMenuWrapper>


	)
})

export default SideMenu
