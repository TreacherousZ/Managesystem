// 接口类型定义

export interface Result<T = any> {
	code: number
	data: T,
	msg: string
}
export namespace Login {
	export interface params {
		userName: string
		userPwd: string
	}
}

export namespace User {
	export interface UserItem {
		"_id": string,
		"userId": number,
		"userName": string,
		"createId": number,
		"deptId": string,
		"deptName": string,
		"job": string,
		"mobile": string,
		"role": number,
		"roleList": string,
		"state": number,
		"userEmail": string,
		"userImg": string
	}
}
