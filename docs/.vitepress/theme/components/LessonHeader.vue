<script setup lang="ts">
import { useLesson } from './useLesson'
import { lessonNumber } from '../../lessons'
const { lesson, stage, lang } = useLesson()
const t = {
  zh: { min: '分钟阅读', level: '难度', lesson: '第', unit: '课' },
  en: { min: 'min read', level: 'Level', lesson: 'Lesson', unit: '' },
}
</script>

<template>
  <header v-if="lesson && stage" class="lesson-header">
    <div class="lh-top">
      <span class="lh-code">{{ lang === 'zh' ? `${t.zh.lesson} ${lessonNumber(lesson)} ${t.zh.unit}` : `${t.en.lesson} ${lessonNumber(lesson)}` }}</span>
      <span class="lh-stage" :style="{ color: stage.color, borderColor: stage.color }">{{ stage[lang] }}</span>
    </div>
    <h1 class="lh-title">{{ lesson[lang].title }}</h1>
    <p class="lh-subtitle">{{ lesson[lang].subtitle }}</p>
    <div class="lh-meta">
      <span>{{ lesson.minutes }} {{ t[lang].min }}</span>
      <span class="lh-level">
        {{ t[lang].level }}
        <i v-for="n in 5" :key="n" :class="{ on: n <= lesson.level }" :style="n <= lesson.level ? { background: stage.color } : {}"></i>
      </span>
    </div>
    <blockquote class="lh-quote">{{ lesson[lang].quote }}</blockquote>
  </header>
</template>
