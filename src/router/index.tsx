import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";

// 懒加载组件
const Login = React.lazy(() => import('@/views/login/Login'));
const Welcome = React.lazy(() => import('@/views/Welcome'));
const Dashboard = React.lazy(() => import('@/views/dashboard'));
const Error404 = React.lazy(() => import('@/views/404'));
const Error403 = React.lazy(() => import('@/views/403'));
const Layout = React.lazy(() => import('@/layout/index'));
const UserList = React.lazy(() => import('@/views/system/user'));
const DeptList = React.lazy(() => import('@/views/system/dept'));
const MenuList = React.lazy(() => import('@/views/system/menu'));
const RoleList = React.lazy(() => import('@/views/system/role'));
const OrderList = React.lazy(() => import('@/views/order/OrderList'));
const DriverList = React.lazy(() => import('@/views/order/DriverList'));
const OrderCluster = React.lazy(() => import('@/views/order/OrderCluster'));

import AuthLoader from "./AuthLoader";

export const router = [
	{
		path: '/',
		element: <Navigate to='/login' />
	},
	{
		path: '/login',
		element: <React.Suspense fallback={<div>Loading...</div>}>
			<Login />
		</React.Suspense>
	},
	{
		id: 'layout',
		element: <React.Suspense fallback={<div>Loading...</div>}>
			<Layout />
		</React.Suspense>,
		loader: AuthLoader,
		children: [
			{
				path: '/welcome',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<Welcome />
				</React.Suspense>
			},
			{
				path: '/dashboard',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<Dashboard />
				</React.Suspense>
			},
			{
				path: '/userList',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<UserList />
				</React.Suspense>
			},
			{
				path: '/deptList',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<DeptList />
				</React.Suspense>
			},
			{
				path: '/menuList',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<MenuList />
				</React.Suspense>,
				meta: {
					auth: false
				}
			},
			{
				path: '/roleList',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<RoleList />
				</React.Suspense>
			},
			{
				path: '/orderList',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<OrderList />
				</React.Suspense>
			},
			{
				path: '/driverList',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<DriverList />
				</React.Suspense>
			},
			{
				path: '/cluster',
				element: <React.Suspense fallback={<div>Loading...</div>}>
					<OrderCluster />
				</React.Suspense>
			}
		]
	},
	{
		path: '*',
		element: <React.Suspense fallback={<div>Loading...</div>}>
			<Error404 />
		</React.Suspense>
	},
	{
		path: '/403',
		element: <React.Suspense fallback={<div>Loading...</div>}>
			<Error403 />
		</React.Suspense>
	}
]

export default createBrowserRouter(router);
