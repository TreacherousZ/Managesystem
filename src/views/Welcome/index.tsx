import React, { memo } from 'react'
import { WelcomeWrapper } from './style'

const Welcome = memo(() => {

	return (
		<WelcomeWrapper>
			<div className='content'>
				<div className='subTitle'>欢迎体验</div>
				<div className="title">React18通用后台管理系统</div>
				<div className="desc">React18+ReactRouter+antd+TypeScrip+Vite实现通用后台</div>
			</div>
		<img src="src/assets/welcome-bg.png" />

		</WelcomeWrapper>
	)
})

export default Welcome
