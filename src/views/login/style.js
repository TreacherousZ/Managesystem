import styled from "styled-components";

export const LoginWrapper = styled.div`
  height: 100vh; /* 高度占满整个屏幕 */
  width: 100vw;  /* 宽度占满整个屏幕 */
  display: flex;
  justify-content: center;
  /* align-items: center; */

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 图片按比例铺满容器，可能会裁剪 */
    z-index: -1; /* 让图片在最底层，确保其他内容在图片上层 */
  }
		.login-from{
		background-color: white;
		position: absolute;
		right: 10%;
		width:500px;
		top:50%;
		transform: translateY(-50%);
		padding: 50px;
		.title{
			font-size: 42px;
			line-height: 1.5;
			text-align: center;
			margin-bottom: 30px;
		}
		}
`;
