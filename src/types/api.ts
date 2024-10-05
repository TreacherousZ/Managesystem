// 接口类型定义


export interface Result<T = any> {
	code: number
	data: T,
	msg: string
}

export interface ResultData<T = any> {
	list: T[]
	page: {
		pageNum: number
		pageSize: number
		total: number | 0
	}
}

export interface PageParams{
	pageNum: number;
	pageSize: number
}

export namespace Login {
	export interface params {
		userName: string
		userPwd: string
	}
}

export namespace User {
	export interface Params extends PageParams{
		userId?:number
		userName?: string
		state?: number
	}

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

	export interface CreateParams {
		userName: string
		userEmail: string
		mobile?: number
		deptId: string
		job?: string
		state?: number
		roleList: string[]
		userImg: string
	}

	export interface EditParams extends CreateParams{
		userId:number
	}
}
export namespace Dept {
	export interface Params{
		deptName?:string

	}
	export interface DeptItem{
		_id:string
		createTime:string
		updateTime: string
		deptName: string
		parentId: string
		userName: string
		children: DeptItem[]
	}
}


export namespace dashboard {
	export interface ReportData {
		driverCount: number;
		totalMoney: number;
		orderCount: number;
		cityNum: number
	}

	export interface LineData {
		label: string[],
		order: number[],
		money: number[]
	}

	export interface PieData {
		value: number,
		name: string
	}

	export interface RadarData {
		indicator: Array<{ name: string; max: number }>
		data: {
			name: string
			value: number[]
		}
	}
}



