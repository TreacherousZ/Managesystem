import styled from "styled-components";

export const HeaderWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 64px;
padding: 0 10px;
background-color: white;
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
	color: black;
}

`
