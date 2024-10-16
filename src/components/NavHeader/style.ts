import styled from "styled-components";

export const HeaderWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 64px;
padding: 0 10px;
background-color: var(--dark-bg-color);
color: var(--dark-color);
.left {
	display: flex;
	align-items: center;
}

.right {
	display: flex;
	align-items: center;
}

.ant-breadcrumb{
	margin-left: 10px;
}

.ant-switch{
	margin-right: 10px;
}

.nickName {
	cursor: pointer;
	color:var(--dark-color)
}

`
