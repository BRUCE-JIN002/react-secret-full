<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData, withBase } from 'vitepress';
const { isDark } = useData();
const frame = ref<HTMLIFrameElement>();
function syncTheme() {
  frame.value?.contentWindow?.postMessage({ type: 'react-secret-theme', theme: isDark.value ? 'dark' : 'light' }, window.location.origin);
}
function onMessage(event: MessageEvent) {
  if (event.origin === window.location.origin && event.source === frame.value?.contentWindow && event.data?.type === 'react-secret-theme-ready') syncTheme();
}
watch(isDark, syncTheme);
onMounted(() => window.addEventListener('message', onMessage));
onBeforeUnmount(() => window.removeEventListener('message', onMessage));
</script>
<template><div class="ai-studio-page"><iframe ref="frame" :src="withBase('/playground/index.html?studio=ai')" title="AI 前端创作工作台" allow="clipboard-write" @load="syncTheme" /></div></template>
<style scoped>.ai-studio-page{height:calc(100dvh - 64px);min-height:650px;width:100%;}.ai-studio-page iframe{width:100%;height:100%;border:0;display:block;}@media(max-width:640px){.ai-studio-page{height:1250px;}}</style>
