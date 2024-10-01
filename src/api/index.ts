/**
 * 接口定义
 */


import request from "@/utils/request";
import { Login, ResultData, User, dashboard } from "@/types/api";

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
		return request.get<ResultData<User.UserItem>>('/users/list')

	}
}
