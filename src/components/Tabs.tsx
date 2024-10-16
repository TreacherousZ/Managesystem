import { IAuthLoader } from "@/router/AuthLoader";
import { searchRoute } from "@/utils";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";

interface TabsItem {
	key: string
	label: string
	closable: boolean
}

export default function TabsFC() {
	const [activeKey, setActiveKey] = useState('')
	const { pathname } = useLocation()
	const [tabsList, setTabsList] = useState<TabsItem[]>([{ key: '/welcome', label: '首页', closable: false }])
	const data = useRouteLoaderData('layout') as IAuthLoader

	const navigate = useNavigate()

	useEffect(() => {
		addTabs()
	}, [pathname])

	const addTabs = () => {
		const route = searchRoute(pathname, data.menuList)
		if (!route) return
		if (!tabsList.find(item => item.key === route.path)) {
			tabsList.push({
				key: route.path,
				label: route.menuName,
				closable: pathname !== '/welcome'
			})
		}
		setTabsList([...tabsList])
		setActiveKey(pathname)
	}

	const handleChange = (path: string) => {
		navigate(path)
	}

	const handleDel = (path: string) => {
		if (pathname === path) {
			tabsList.forEach((item, index: number) => {
				if (item.key !== pathname) return
				const nextTab = tabsList[index + 1] || tabsList[index - 1]
				navigate(nextTab.key)
			})
		}
		setTabsList(tabsList.filter(item => item.key !== path))
	}

	return <Tabs items={tabsList}
		tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: 'var(--dark-bg-color' }}
		type='editable-card'
		hideAdd
		activeKey={activeKey}
		onChange={handleChange}
		onEdit={(path) => handleDel(path as string)}
	/>
}
