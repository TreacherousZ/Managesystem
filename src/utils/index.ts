/**
 * 工具函数封装
 */

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

export const formatState = (state:number)=> {
	if(state===1) return '在职'
	if(state===2) return '试用期'
	if(state===3) return '离职'
}


