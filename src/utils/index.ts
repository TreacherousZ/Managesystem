/**
 * 工具函数封装
 */

import { Menu } from "@/types/api"

//格式化金额
export const fotmatMoney = (num: number | string) => {
	const a = parseFloat(num.toString())
	return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

//格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
	let curDate = new Date()
	if (date) curDate = date
	if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
	if (rule === 'HH:mm:sss') return curDate.toLocaleTimeString()
	return curDate.toLocaleString()
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
	let curDate = new Date()
	if (date instanceof Date) curDate = date
	else if (date) curDate = new Date(date)

	let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
	fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
	type OType = {
		[key: string]: number
	}
	const O: OType = {
		'M+': curDate.getMonth() + 1,
		'd+': curDate.getDate(),
		'H+': curDate.getHours(),
		'm+': curDate.getMinutes(),
		's+': curDate.getSeconds()
	}
	for (const k in O) {
		const val = O[k].toString()
		fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
		// fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
	}
	return fmt
}
export const formatState = (state: number) => {
	if (state === 1) return '在职'
	if (state === 2) return '试用期'
	if (state === 3) return '离职'
}

//获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[]=>{
	return list.reduce((result: string[],item:Menu.MenuItem)=>{
		return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children): item.path+'')
	},[])
}
