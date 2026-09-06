<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useData, withBase } from 'vitepress';
const props = defineProps<{ example: string; title: string }>();
const { isDark } = useData();
const revision = ref(0);
const loaded = ref(false);
const opened = ref(false);
const src = computed(() => withBase(`/playground/index.html?example=${encodeURIComponent(props.example)}&theme=${isDark.value ? 'dark' : 'light'}&revision=${revision.value}`));
watch(src, () => { loaded.value = false; });
</script>
<template>
  <section class="demo-frame" aria-label="交互演示">
    <div class="demo-frame-header">
      <span>交互演示 <span class="demo-frame-badge">React</span></span>
      <div>
        <a :href="src" target="_blank" rel="noreferrer">独立窗口 ↗</a>
        <button v-if="opened" @click="revision++">重置演示</button>
      </div>
    </div>
    <div v-if="!opened" class="demo-frame-placeholder">
      <p>亲手试一试，更容易理解。</p>
      <span>在当前页面运行 {{ title }} 的交互示例。</span>
      <button @click="opened = true">运行演示</button>
    </div>
    <div v-else class="demo-frame-stage">
      <div v-if="!loaded" class="demo-frame-loading">正在加载演示…</div>
      <iframe :key="src" :src="src" :title="`${title} 交互演示`" @load="loaded = true" allow="clipboard-write; fullscreen" />
    </div>
    <div class="demo-frame-footer">示例按需加载 · 点击「重置演示」恢复页面初始状态</div>
  </section>
</template>
