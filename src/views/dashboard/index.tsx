import React, { memo } from 'react'
import { DashboardWrapper } from './style'
import Desc from '@/components/desc'


const Dashboard = memo(() => {
	return (
		<DashboardWrapper>
			<div className='userInfo'>
				<img src='src/assets/userImg.jpg' className='userImg' />
				<Desc />
			</div>
			<div className='report'>
				<div className="card">
					<div className="title">司机数量</div>
					<div className="num">100个</div>
				</div>

				<div className="card">
					<div className="title">总流水</div>
					<div className="num">100000元</div>
				</div>

				<div className="card">
					<div className="title">总订单</div>
					<div className="num">20000单</div>
				</div>

				<div className="card">
			<div className="title">开通城市</div>
			<div className="num">50座</div>
		</div>
			</div>

		</DashboardWrapper>
	)
})

export default Dashboard
