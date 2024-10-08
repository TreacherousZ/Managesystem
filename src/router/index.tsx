import { createBrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Login from '@/views/login/Login'
import Welcome from '@/views/Welcome'
import Dashboard from "@/views/dashboard";
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout/index'
import UserList from "@/views/system/user";
import DeptList from "@/views/system/dept";
import MenuList from "@/views/system/menu";
import AuthLoader from "./AuthLoader";
import RoleList from "@/views/system/role";
import path from "path";
const router = [
	{
		path: '/',
		element: <Navigate to='/login' />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		id:'layout',
		element: <Layout />,
		loader:AuthLoader,
		children: [
			{
				path: '/welcome',
				element: <Welcome />
			},
			{
				path: '/dashboard',
				element: <Dashboard />
			},
			{
				path: '/userList',
				element: <UserList />
			},
			{
				path: '/deptList',
				element: <DeptList />
			},
			{
				path: '/menuList',
				element: <MenuList />
			},
			{
				path:'/roleList',
				element:<RoleList/>
			}
		]
	},
	{
		path: '*',
		element: <Error404 />
	},
	{
		path: '/403',
		element: <Error403 />
	}
]

export default createBrowserRouter(router)
