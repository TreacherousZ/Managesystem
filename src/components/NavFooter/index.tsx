import React, { memo } from 'react'
import { FooterWrapper } from './style'

const NavFooter = memo(() => {
	return (

		<FooterWrapper>
			<div className='footerContent'>
			<a className='a' href='https://github.com/TreacherousZ' target = '_blank' rel='noreferrer'>TreacherousZ Github主页</a>
			<span className='gutter'>|</span>
			<span> Vx: TreacherousZ</span>
			</div>


		</FooterWrapper>


	)
})

export default NavFooter
