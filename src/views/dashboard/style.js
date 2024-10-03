import styled from "styled-components";


export const DashboardWrapper = styled.div`
  padding: 40px 60px;  /* 增加左右和上下的填充 */
  margin: 0 auto;
  background-color: #fff;
 

	.userInfo {
		display: flex;
		align-items: center;
	}

	.userImg{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 30px;
	}
	.report {
		display: flex;
		margin-top: 40px;
		.card {
		flex: 1;
		height:100px;
		padding: 10px;
		margin-right: 20px;
		border-radius: 5px;
		color: white;
		font-size: 14px;

		&:nth-child(1){
			background-color: #f4864f;
		}
		&:nth-child(2){
			background-color: #887edc;
		}
		&:nth-child(3){
			background-color: #4f95e5;
		}
		&:nth-child(4){
			background-color: #6dc3d7;
		}

		&:last-child{
			margin-right: 0;
		}

		.num{
		text-align: center;
		font-size: 24px;
		}
	}



	}


	.chart{
		margin-top: 50px;
	}
	.itemLine{
		height:400px
	}
	.pieChart{
		display: flex;
		height:400px

	}
.itemPie{
	flex: 1;
}

.itemRadar {
  width: 100%;  /* 或者一个具体的宽度，比如 600px */
  height: 400px;  /* 必须设置明确的高度，ECharts 需要这个高度来渲染 */
}

`
