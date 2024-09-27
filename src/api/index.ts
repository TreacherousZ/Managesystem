/**
 * 接口定义
 */


import request from "@/utils/request";
import { Login, User } from "@/types/api";

export default {
	//登录
	login(params: Login.params) {
		return request.post<string>('/users/login', params, { showLoading: false})
	},
	//获取用户信息
	getUserInfo(){
		return request.get<User.UserItem>('/users/getUserInfo')
	}
}
