<script setup lang="ts">
import { useLesson } from './useLesson'
const { lesson, lang } = useLesson()
</script>

<template>
  <div v-if="lesson" class="coming-soon">
    <p class="cs-badge">{{ lang === 'zh' ? '本课正在编写中' : 'This lesson is being written' }}</p>
    <p>{{ lang === 'zh' ? '这一课会讲：' : 'What it will cover:' }}</p>
    <ul>
      <li v-for="item in lesson[lang].outline" :key="item">{{ item }}</li>
    </ul>
    <p class="cs-note">
      <template v-if="lang === 'zh'">想第一时间看到？在 GitHub 上点个 Star 或 Watch 就能收到更新。</template>
      <template v-else>Want to know when it lands? Star or watch the repo on GitHub.</template>
    </p>
  </div>
</template>
