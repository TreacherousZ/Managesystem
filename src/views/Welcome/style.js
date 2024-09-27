import styled from "styled-components";

export const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;  /* 增加左右和上下的填充 */
  margin: 0 auto;
  background-color: #fff;
  height: calc(86.25vh);

  .content {
    flex: 1;  /* 让内容部分占据剩余空间 */
    margin-right: 10px;  /* 缩小内容和图片之间的间距 */
    display: flex;
    flex-direction: column;
    justify-content: center;  /* 让内容在竖直方向上居中 */

    .subTitle {
      font-size: 30px;
      line-height: 42px;
      color: black;
    }

    .title {
      font-size: 44px;  /* 增大主标题字体 */
      line-height: 64px;
      font-weight: bold;
      color: #ed6c00;
    }

    .desc {
      text-align: left;
      font-size: 16px;  /* 增大描述文字的字号 */
      color: gray;
      margin-top: 10px;
    }
  }

  img {
    width: 400px;  /* 增大图片宽度 */
    height: auto;  /* 保持图片比例 */
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }

  @media (max-width: 1200px) {
    padding: 20px 40px;  /* 在较小屏幕上减少左右填充 */

    .content {
      margin-right: 5px;  /* 在中等屏幕上进一步减小内容和图片的间距 */

      .title {
        font-size: 36px;  /* 在小屏上缩小主标题字体 */
        line-height: 50px;
      }

      .desc {
        font-size: 14px;  /* 缩小描述文字的字号 */
      }
    }

    img {
      width: 320px;  /* 在小屏上减小图片大小 */
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;  /* 在非常小的屏幕上，将布局改为上下排列 */
    text-align: center;  /* 让文字居中对齐 */

    .content {
      margin-right: 0;
      margin-bottom: 20px;  /* 让内容和图片之间有一定的上下间距 */
    }

    img {
      width: 280px;  /* 减小图片大小以适应小屏幕 */
    }
  }
`;
