<template>
  <transition
    :name="transitionName"
    :mode="mode"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <slot></slot>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  name: {
    type: String,
    default: 'fade'
  },
  mode: {
    type: String,
    default: 'out-in'
  },
  duration: {
    type: Number,
    default: 300
  },
  delay: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'transition', // 'transition' or 'animation'
    validator: (value) => ['transition', 'animation'].includes(value)
  },
  direction: {
    type: String,
    default: '', // '', 'forward', 'backward'
    validator: (value) => ['', 'forward', 'backward'].includes(value)
  }
});

const route = useRoute();
const transitionName = ref(props.name);

// Update transition name based on route depth
watch(() => route.path, (newPath, oldPath) => {
  if (props.direction) {
    transitionName.value = `${props.name}-${props.direction}`;
    return;
  }
  
  // Determine direction based on route path
  if (newPath && oldPath) {
    const newDepth = newPath.split('/').filter(Boolean).length;
    const oldDepth = oldPath.split('/').filter(Boolean).length;
    
    if (newDepth > oldDepth) {
      transitionName.value = `${props.name}-forward`;
    } else if (newDepth < oldDepth) {
      transitionName.value = `${props.name}-backward`;
    } else {
      transitionName.value = `${props.name}-forward`; // Default to forward for same-level navigation
    }
  } else {
    transitionName.value = props.name;
  }
}, { immediate: true });

// Transition hooks
const beforeEnter = (el) => {
  el.style.transitionDuration = `${props.duration}ms`;
  el.style.transitionDelay = `${props.delay}ms`;
  el.style.animationDuration = `${props.duration}ms`;
  el.style.animationDelay = `${props.delay}ms`;
};

const enter = (el, done) => {
  if (props.type === 'animation') {
    // Let CSS animation handle it
    el.addEventListener('animationend', done, { once: true });
  } else {
    // Let CSS transition handle it
    el.addEventListener('transitionend', done, { once: true });
  }
};

const afterEnter = (el) => {
  resetStyles(el);
};

const enterCancelled = (el) => {
  resetStyles(el);
};

const beforeLeave = (el) => {
  el.style.transitionDuration = `${props.duration}ms`;
  el.style.transitionDelay = `${props.delay}ms`;
  el.style.animationDuration = `${props.duration}ms`;
  el.style.animationDelay = `${props.delay}ms`;
};

const leave = (el, done) => {
  if (props.type === 'animation') {
    // Let CSS animation handle it
    el.addEventListener('animationend', done, { once: true });
  } else {
    // Let CSS transition handle it
    el.addEventListener('transitionend', done, { once: true });
  }
};

const afterLeave = (el) => {
  resetStyles(el);
};

const leaveCancelled = (el) => {
  resetStyles(el);
};

const resetStyles = (el) => {
  el.style.transitionDuration = '';
  el.style.transitionDelay = '';
  el.style.animationDuration = '';
  el.style.animationDelay = '';
};
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transitions */
.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-backward-enter-active,
.slide-backward-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-backward-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-backward-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Zoom transitions */
.zoom-forward-enter-active,
.zoom-forward-leave-active,
.zoom-backward-enter-active,
.zoom-backward-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.zoom-forward-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.zoom-forward-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.zoom-backward-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.zoom-backward-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
