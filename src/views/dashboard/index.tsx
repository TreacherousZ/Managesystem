import React, { memo, useEffect, useState } from 'react'
import { DashboardWrapper } from './style'
import Desc from '@/hook/desc'
import { Button, Card } from 'antd'
import * as echarts from 'echarts'
import { useStore } from '@/store'
import api from '@/api'
import { dashboard } from '@/types/api'
import { useCharts } from '@/hook/UseCharts'

const Dashboard = memo(() => {
	const userInfo = useStore(state => state.userInfo)
	const [report, setReport] = useState<dashboard.ReportData>()

	//初始化折线图
	const [lineRef, lineChart] = useCharts()
	//初始化饼图
	const[pieRef1, pieChart1] = useCharts()
	const[pieRef2, pieChart2] = useCharts()
	//初始化雷达图
	const[radarRef, radarChart] = useCharts()


	// 图表
	useEffect(() => {
		renderLineChart()
		renderPieChart1()
		renderPieChart2()
		renderRadarChart()

	}, [lineChart, pieChart1, pieChart2, radarChart])

	//加载折线图
	const renderLineChart = async () =>{
		if(!lineChart) return
		const data = await api.getLineData()
				// 折线图
				lineChart?.setOption({
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['订单', '流水']
					},
					grid: {
						left: 50,
						right: 50,
						bottom: 20
					},
					xAxis: {
						data: data.label
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '订单',
							type: 'line',
							data: data.order
						},
						{
							name: '流水',
							type: 'line',
							data: data.money
						}
					]
				})
	}

	//加载饼图1
	const renderPieChart1 = async () => {
		if(!pieChart1) return
		const data = await api.getPieCityData()
		pieChart1?.setOption({
			title: {
				text: '司机城市分布',
				left: 'center',
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left'
			},
			series: [
				{
					name: '城市分布',
					type: 'pie',
					radius: '50%',
					data
				}
			]
		})
	}

	//加载饼图2
	const renderPieChart2 = async () => {
		if(!pieChart2) return
		const data = await api.getPieAgeData()
		pieChart2?.setOption({
			title: {
				text: '司机年龄分布',
				left: 'center',
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left'
			},
			series: [
				{
					name: '年龄分布',
					type: 'pie',
					radius: [50, 180],
					roseType: 'area',
					data
				}
			]
		})

	}

	//加载雷达图
	const renderRadarChart = async () => {
		if(!radarChart) return
		const data = await api.getRadarData()
		radarChart?.setOption({
			// title: {
			// 	text: '司机模型诊断',
			// 	left: 'center',
			// },
			legend: {
				data: ['司机模型诊断'],
			},
			radar: {
				indicator: data.indicator,
			},
			series: [
				{
					name: '模型诊断',
					type: 'radar',
					data: data.data
				}
			]
		})
	}


	//刷新饼图
	const handleRefresh = ()=>{
		renderPieChart1()
		renderPieChart2()
	}

	useEffect(() => {
		getReportData()
	}, [])

	const getReportData = async () => {
		const data = await api.getReportData()
		setReport(data)

	}


	return (
		<DashboardWrapper>
			<div className='userInfo'>
				<img src={userInfo.userImg} className='userImg' />
				<Desc />
			</div>
			<div className='report'>
				<div className="card">
					<div className="title">司机数量</div>
					<div className="num">{ report?.driverCount}个</div>
				</div>

				<div className="card">
					<div className="title">总流水</div>
					<div className="num">{report?.totalMoney}元</div>
				</div>

				<div className="card">
					<div className="title">总订单</div>
					<div className="num">{report?.orderCount}单</div>
				</div>

				<div className="card">
					<div className="title">开通城市</div>
					<div className="num">{report?.cityNum}座</div>
				</div>
			</div>

			<div className="chart">
				<Card title='订单和流水走势图' extra={<Button type='primary' onClick={renderLineChart}>刷新</Button>} >
					<div ref={lineRef} className='itemLine'></div>
				</Card>
			</div>

			<div className="chart">
				<Card title='司机分布' extra={<Button type='primary' onClick={handleRefresh}>刷新</Button>} >
					<div className="pieChart">
						<div ref={pieRef1} className='itemPie'></div>
						<div ref={pieRef2} className='itemPie'></div>
					</div>
				</Card>
			</div>

			<div className="chart">
				<Card title='模型诊断' extra={<Button type='primary' >刷新</Button>} >
					<div ref={radarRef} className='itemRadar'></div>
				</Card>
			</div>

		</DashboardWrapper>
	)
})

export default Dashboard
