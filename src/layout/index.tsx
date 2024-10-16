import React, { useEffect } from 'react'
import { Layout, theme, Watermark } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/SideMenu'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { router } from '@/router'
import TabsFC from '@/components/Tabs'

const { Content, Sider } = Layout

const App: React.FC = () => {
	const { collapsed, userInfo, updateUserInfo } = useStore()
	const { pathname } = useLocation()
	useEffect(() => {
		getUserInfo()
	}, [])
	const getUserInfo = async () => {
		const data = await api.getUserInfo()
		updateUserInfo(data)
	}

	const data = useRouteLoaderData('layout') as IAuthLoader
	const route = searchRoute(pathname, router)
	if (route && route.meta?.auth === false) {
		//继续执行
	} else {
		//权限判断
		const staticPath = ['/welcome', '/403', '/404']
		if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
			return <Navigate to='/403' />
		}
	}



	return (

		<Watermark content='TreacherousZ' inherit={false}>
			{
				userInfo._id ? (<Layout>
					<Sider collapsed={collapsed}>
						<SideMenu />
					</Sider>
					<Layout>
						<NavHeader />
						<TabsFC />
						<Content className={styles.content}>
							<div className={styles.wrapper}>
								<Outlet></Outlet>
							</div>
							<NavFooter />
						</Content>
					</Layout>
				</Layout>) : null

			}

		</Watermark>

	)
}

export default App
