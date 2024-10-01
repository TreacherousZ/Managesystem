import { Navigate, useRoutes } from "react-router-dom";
import Login from '@/views/login/Login'
import Welcome from '@/views/Welcome'
import Dashboard from "@/views/dashboard";
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout/index'
import UserList from "@/views/system/user";

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
		element: <Layout />,
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

export default function Router() {
	return useRoutes(router)
}
