<template>
  <div class="m-dropdown" v-click-outside="hideDropdown">
    <!-- 下拉菜单触发按钮 -->
    <div class="dropdown-trigger" @click="toggleDropdown">
      <slot name="trigger">
        <div class="default-trigger">
          <span>{{ currentLabel }}</span>
          <i class="arrow" :class="{ 'arrow-up': isVisible }"></i>
        </div>
      </slot>
    </div>
    
    <!-- 下拉菜单内容 -->
    <transition name="dropdown-fade">
      <div class="dropdown-menu" v-show="isVisible">
        <!-- 右上角三角形 -->
        <div class="triangle"></div>
        
        <!-- 菜单选项列表 -->
        <ul class="menu-list">
          <!-- 默认全部类型选项 -->
          <li 
            class="menu-item" 
            :class="{ active: currentValue === '' }"
            @click="selectOption('', '全部类型')">
            <span class="item-text">全部类型</span>
          </li>
          
          <!-- 动态生成的选项列表 -->
          <li 
            v-for="(item, index) in options" 
            :key="index"
            class="menu-item"
            :class="{ active: currentValue === item.value }"
            @click="selectOption(item.value, item.label)">
            <span class="item-text">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
// 注意：http-vue-loader 需要这种写法
module.exports = {
  name: 'MDropdown',
  props: {
    // 选项列表
    options: {
      type: Array,
      default: () => [
        { value: 'huoqibao', label: '活钱宝' },
        { value: 'gongmu', label: '公募' },
        { value: 'simu', label: '私募' },
        { value: 'tougu', label: '投顾' }
      ]
    },
    // 默认选中的值
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      isVisible: false,
      currentValue: this.value,
      currentLabel: '全部类型'
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
      this.updateLabel();
    }
  },
  created() {
    // 初始化时更新显示的标签
    this.updateLabel();
  },
  methods: {
    // 切换下拉菜单显示状态
    toggleDropdown() {
      this.isVisible = !this.isVisible;
    },
    
    // 隐藏下拉菜单
    hideDropdown() {
      this.isVisible = false;
    },
    
    // 选择选项
    selectOption(value, label) {
      this.currentValue = value;
      this.currentLabel = label;
      this.$emit('input', value);
      this.$emit('change', value);
      this.hideDropdown();
    },
    
    // 更新当前显示的标签
    updateLabel() {
      if (this.currentValue === '') {
        this.currentLabel = '全部类型';
        return;
      }
      
      const selectedOption = this.options.find(option => option.value === this.currentValue);
      if (selectedOption) {
        this.currentLabel = selectedOption.label;
      }
    }
  },
  // 自定义指令：点击外部关闭下拉菜单
  directives: {
    'click-outside': {
      bind(el, binding) {
        const handler = (e) => {
          if (el.contains(e.target)) {
            return;
          }
          binding.value(e);
        };
        
        el._clickOutside = handler;
        document.addEventListener('click', handler);
        
        // 移动端触摸事件支持
        document.addEventListener('touchstart', handler);
      },
      unbind(el) {
        document.removeEventListener('click', el._clickOutside);
        document.removeEventListener('touchstart', el._clickOutside);
        delete el._clickOutside;
      }
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
.m-dropdown {
  position: relative;
  display: inline-block;
  font-size: 14px;
  color: #333;
}

/* 触发按钮样式 */
.dropdown-trigger {
  cursor: pointer;
  user-select: none;
}

.default-trigger {
  display: flex;
  align-items: center;
  padding: 8px 12px;
}

/* 箭头样式 */
.arrow {
  display: inline-block;
  margin-left: 5px;
  border: solid #666;
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s;
}

.arrow-up {
  transform: rotate(-135deg);
}

/* 下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  min-width: 120px;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 右上角三角形 */
.triangle {
  position: absolute;
  top: -6px;
  right: 10px;
  width: 12px;
  height: 12px;
  background-color: #fff;
  transform: rotate(45deg);
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.03);
}

/* 菜单列表样式 */
.menu-list {
  position: relative;
  margin: 0;
  padding: 5px 0;
  list-style: none;
}

/* 菜单项样式 */
.menu-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f7fa;
}

.menu-item.active {
  /* 选中项样式 */
  color: #e86433;
  font-weight: bold;
}

/* 菜单项文本样式 */
.item-text {
  display: block;
  text-align: center;
}

/* 过渡动画 */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 