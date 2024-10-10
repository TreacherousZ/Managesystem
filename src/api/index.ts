/**
 * 接口定义
 */


import request from "@/utils/request";
import { Dept, Login, Menu, ResultData, Role, User, dashboard } from "@/types/api";

export default {
	//登录
	login(params: Login.params) {
		return request.post<string>('/users/login', params, { showLoading: false })
	},
	//获取用户信息
	getUserInfo() {
		return request.get<User.UserItem>('/users/getUserInfo')
	},

	//获取工作台汇总数据
	getReportData() {
		return request.get<dashboard.ReportData>('/order/dashboard/getReportData')
	},

	//获取折线图数据
	getLineData() {
		return request.get<dashboard.LineData>('/order/dashboard/getLineData')
	},

	//获取城市饼图数据
	getPieCityData() {
		return request.get<dashboard.PieData[]>('/order/dashboard/getPieCityData')
	},

	//获取年龄饼图数据
	getPieAgeData() {
		return request.get<dashboard.PieData[]>('/order/dashboard/getPieAgeData')
	},

	//获取雷达图数据
	getRadarData() {
		return request.get<dashboard.RadarData>('/order/dashboard/getRadarData')
	},

	//获取用户列表
	getUserList(params: User.Params) {
		return request.get<ResultData<User.UserItem>>('/users/list', params)

	},

	//创建用户
	createUser(params: User.CreateParams) {
		return request.post('/users/create', params)
	},

	//编辑用户
	editUser(params: User.EditParams) {
		return request.post('/users/edit', params)
	},

	//删除和批量删除用户
	delUser(params: { userIds: number[] }) {
		return request.post('/users/delete', params)
	},
	getPermissionList() {
		return request.get<{ buttonList: string[], menuList: Menu.MenuItem[] }>('/users/getPermissionList')
	},

	//部门管理
	//部门列表
	getDeptList(params?: Dept.Params) {
		return request.get<Dept.DeptItem[]>('/dept/list', params)
	},
	//获取当前账号下的所有用户
	getAllUserList() {
		return request.get<User.UserItem[]>('/users/all/list')
	},
	createDept(params: Dept.CreateParams) {
		return request.post('/dept/create', params)
	},
	eidtDept(params: Dept.EidtParams) {
		return request.post('/dept/edit', params)
	},
	deleteDept(params: Dept.DelParams) {
		return request.post('/dept/delete', params)
	},
	//菜单管理
	getMenuList(params?: Menu.Params) {
		return request.get<Menu.MenuItem[]>('/menu/list', params)
	},
	createMenu(params: Menu.CreateParams) {
		return request.post('/menu/create', params)
	},
	editMenu(params: Menu.EditParams) {
		return request.post('/menu/edit', params)
	},
	deleteMenu(params: Menu.DelParams) {
		return request.post('/menu/delete', params)
	},
	//角色管理
	getRoleList(params: Role.Params) {
		return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
	},
	createRole(params: Role.CreateParams) {
		return request.post('/roles/create', params)
	},
	editRole(params: Role.EditParams) {
		return request.post('/roles/edit', params)
	},
	delRole(params: { _id: string }) {
		return request.post('/roles/delete', params)
	},
	updatePermission(params: Role.Permission){
		return request.post('/roles/update/permission', params)
	},
	getAllRoleList(){
		return request.get<Role.RoleItem[]>('/roles/allList')
	}

}
