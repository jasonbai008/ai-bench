<template>
    <div class="coming-soon" :style="{ height: height }">
      <div class="text-container">
        <!-- 每个字符单独包装以实现逐字动画 -->
        <span v-for="(char, index) in charArray" :key="index" class="character" :style="{ animationDelay: `${index * 0.2}s` }">
          {{ char }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComingSoon',
    props: {
      // 接收高度参数，默认为80vh
      customHeight: {
        type: String,
        default: '80vh',
      },
      // 接收文字参数，默认为"敬请期待"
      text: {
        type: String,
        default: '敬请期待',
      },
    },
    computed: {
      // 计算最终高度
      height() {
        return this.customHeight || '80vh'
      },
      // 将文字字符串转换为字符数组
      charArray() {
        return this.text.split('');
      },
    },
  }
  </script>
  
  <style scoped>
  .coming-soon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* 字符样式 */
  .character {
    font-size: 22px;
    color: #444;
    opacity: 0;
    letter-spacing: 1px;
    transform: translateY(30px);
    /* 设置动画 */
    animation: slideIn 0.4s forwards;
  }
  
  /* 从右到左显现的动画 */
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  