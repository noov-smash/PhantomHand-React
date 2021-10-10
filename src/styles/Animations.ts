import { css } from "styled-components";

export const FadeIn = css`
  opacity: 0;
  background: rgba(255, 255, 255, 0.8);
  &.active {
    opacity: 1;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    /* -webkit-transition-delay: .1s; */
    /* transition-delay: .1s; */
  }
`;

export const ZoomIn = css`
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  :hover {
    transform: scale(1.02);
  }
`;

export const BlockSlideAnimationCSS = css`
  overflow: hidden;
  position: relative;
  .animation--text {
    opacity: 0;
  }
  &.active {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      /*アニメーションの設定*/
      animation: secondaryImageOverlayIn 0.6s 0s cubic-bezier(0.77, 0, 0.175, 1),
        secondaryImageOverlayOut 0.6s 0.6s cubic-bezier(0.77, 0, 0.175, 1);
      animation-fill-mode: both;
    }
    .animation--text {
      /*アニメーションの設定*/
      animation: fadeIn 0.1s 0.5s;
      animation-fill-mode: both;
    }
  }

  /*keyframesの設定*/
  /*文字が消えている状態から現れるアニメーション*/
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  /*はじめにブロックを伸ばすアニメーション*/
  @keyframes secondaryImageOverlayIn {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  /*のび太ブロックを横に追いやるアニメーション*/
  @keyframes secondaryImageOverlayOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(102%);
    }
  }
`;
