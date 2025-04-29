<template>
  <div class="profit-display" 
       @touchstart="handleTouchStart" 
       @touchmove="handleTouchMove" 
       @touchend="handleTouchEnd">
    <!-- 标题部分 -->
    <div class="title-container">
      <div class="title-wrapper" :class="{ 'slide-up': showYesterday, 'slide-down': showToday }">
        <!-- 今日收益在上，昨日收益在下 -->
        <div class="title-item">今日收益(更新中)</div>
        <div class="title-item">昨日收益</div>
      </div>
    </div>

    <!-- 数值部分 -->
    <div class="value-container">
      <div class="value-wrapper" :class="{ 'slide-up': showYesterday, 'slide-down': showToday }">
        <!-- 今日数据在上，昨日数据在下 -->
        <div class="value-item">
          <!-- 数字和箭头符号 -->
          <span class="number">1124.98</span>
          <span class="arrow-icon">></span>
        </div>
        <div class="value-item">
          <span class="number">1098.45</span>
          <span class="arrow-icon">></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfitDisplay",
  data() {
    return {
      // 控制显示状态
      showToday: true,       // 控制显示今日收益，默认显示今日收益
      showYesterday: false,  // 控制显示昨日收益
      
      // 触摸事件相关数据
      touchStartY: 0,        // 触摸开始位置
      touchEndY: 0,          // 触摸结束位置
      minSwipeDistance: 30,  // 最小滑动距离，小于这个距离不触发滑动
      
      // 动画状态
      isAnimating: false,    // 是否正在执行动画
      
      // 初始动画是否已完成
      initialAnimationDone: false,
    };
  },
  mounted() {
    // 首次加载时延迟一段时间后执行切换动画
    setTimeout(() => {
      this.playInitialAnimation();
    }, 200);
  },
  methods: {
    // 播放初始动画
    playInitialAnimation() {
      // 设置动画状态
      this.isAnimating = true;
      
      // 先显示今日收益
      this.showToday = true;
      this.showYesterday = false;
      
      // 短暂延迟后切换到昨日收益
      setTimeout(() => {
        this.showToday = false;
        this.showYesterday = true;
        
        // 再延迟一段时间后切回今日收益
        setTimeout(() => {
          this.showToday = true;
          this.showYesterday = false;
          
          // 动画结束
          setTimeout(() => {
            this.isAnimating = false;
            this.initialAnimationDone = true;
          }, 300);
        }, 1000);
      }, 500);
    },
    
    // 处理触摸开始事件
    handleTouchStart(event) {
      // 如果初始动画未完成或正在动画中，不处理滑动
      if (!this.initialAnimationDone || this.isAnimating) return;
      
      // 记录触摸开始的Y坐标
      this.touchStartY = event.touches[0].clientY;
    },
    
    // 处理触摸移动事件
    handleTouchMove(event) {
      // 如果初始动画未完成或正在动画中，不处理滑动
      if (!this.initialAnimationDone || this.isAnimating) return;
      
      // 阻止默认滚动行为
      event.preventDefault();
      
      // 获取当前触摸位置
      this.touchEndY = event.touches[0].clientY;
      
      // 计算滑动距离
      const swipeDistance = this.touchEndY - this.touchStartY;
      
      // 根据滑动方向和距离切换显示内容
      if (Math.abs(swipeDistance) > this.minSwipeDistance) {
        // 设置动画状态
        this.isAnimating = true;
        
        if (swipeDistance > 0) {
          // 向下滑动，显示今日收益
          this.showToday = true;
          this.showYesterday = false;
        } else {
          // 向上滑动，显示昨日收益
          this.showYesterday = true;
          this.showToday = false;
        }
        
        // 动画结束后重置动画状态，但保持显示状态
        setTimeout(() => {
          this.isAnimating = false;
        }, 300);
      }
    },
    
    // 处理触摸结束事件
    handleTouchEnd() {
      // 触摸结束时不做特殊处理，保持当前显示状态
    }
  },
};
</script>

<style scoped>
.profit-display {
  padding: 10px 15px;
  /* 添加触摸事件相关样式 */
  touch-action: pan-x; /* 允许水平滑动，禁止垂直滑动 */
  user-select: none;   /* 防止文本被选中 */
}

/* 标题容器样式 */
.title-container {
  height: 24px;
  overflow: hidden;
  margin-bottom: 0;
}

.title-wrapper {
  /* 初始状态 */
  position: relative;
  transition: transform 0.3s ease-in-out;
}

/* 数值容器样式 */
.value-container {
  height: 40px;
  overflow: hidden;
}

.value-wrapper {
  /* 初始状态 */
  position: relative;
  transition: transform 0.3s ease-in-out;
}

/* 向上滑动显示昨日收益 */
.slide-up {
  transform: translateY(-50%);
}

/* 向下滑动显示今日收益 */
.slide-down {
  transform: translateY(0);
}

/* 自动动画类 */
.slide-animation {
  /* 定义动画 */
  animation: slideUpDown 1s ease-in-out;
}

/* 定义滑动动画 */
@keyframes slideUpDown {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-50%);
  }
  75% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

.title-item {
  height: 24px;
  line-height: 24px;
  /* 修改标题颜色为图片中的棕色 */
  color: #a67c52;
  font-size: 14px;
}

.value-item {
  height: 40px;
  display: flex;
  align-items: center;
}

.number {
  /* 修改数字颜色为图片中的棕色 */
  font-size: 24px;
  font-weight: bold;
  color: #a67c52;
  margin-right: 5px;
}

/* 箭头样式 */
.arrow-icon {
  /* 使用 > 符号替代原来的三角形 */
  font-size: 18px;
  color: #a67c52;
  font-weight: bold;
}
</style>
