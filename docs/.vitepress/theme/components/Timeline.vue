<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { withBase } from 'vitepress'
import { lessons, stages, stageOf, lessonNumber } from '../../lessons'
import { useLang, readDone } from './useLesson'

const lang = useLang()
const done = ref<string[]>([])
onMounted(() => { done.value = readDone() })
const prefix = computed(() => (lang.value === 'zh' ? '/' : '/en/'))
const readyCount = lessons.filter((l) => l.ready).length

const t = {
  zh: {
    title: '学习路线',
    sub: `从零开始的美股理财课：${lessons.length} 课，由浅入深。目前已上线 ${readyCount} 课。`,
    legend: '阶段',
    min: '分钟',
    level: '难度',
    go: '开始学习',
    soon: '编写中',
    done: '已学完',
    progress: '你的进度',
  },
  en: {
    title: 'Learning Path',
    sub: `A from-zero course on investing in US markets: ${lessons.length} lessons, gentle to advanced. ${readyCount} are live so far.`,
    legend: 'Stages',
    min: 'min',
    level: 'Level',
    go: 'Start lesson',
    soon: 'In progress',
    done: 'Done',
    progress: 'Your progress',
  },
}
</script>

<template>
  <div class="timeline-page">
    <h1 class="tl-title">{{ t[lang].title }}</h1>
    <p class="tl-sub">{{ t[lang].sub }}</p>

    <div class="tl-legend">
      <span class="tl-legend-label">{{ t[lang].legend }}</span>
      <span v-for="s in stages" :key="s.id" class="tl-legend-item">
        <i :style="{ background: s.color }"></i>{{ s[lang] }}
      </span>
    </div>

    <p v-if="done.length" class="tl-progress">
      {{ t[lang].progress }}: {{ done.length }} / {{ readyCount }}
    </p>

    <ol class="tl-list">
      <li v-for="l in lessons" :key="l.id" class="tl-item" :class="{ soon: !l.ready }">
        <div class="tl-rail">
          <span class="tl-num" :style="{ background: stageOf(l).color }">
            {{ done.includes(l.id) ? '✓' : lessonNumber(l) }}
          </span>
          <span class="tl-line" :style="{ background: stageOf(l).color }"></span>
        </div>
        <a class="tl-card" :href="withBase(prefix + l.id)">
          <div class="tl-card-top">
            <span class="tl-badge" :style="{ color: stageOf(l).color, background: stageOf(l).color + '1a' }">{{ stageOf(l)[lang] }}</span>
            <span v-if="!l.ready" class="tl-soon">{{ t[lang].soon }}</span>
            <span v-else-if="done.includes(l.id)" class="tl-done">{{ t[lang].done }}</span>
          </div>
          <h3 class="tl-card-title">{{ l[lang].title }}<span>{{ l[lang].subtitle }}</span></h3>
          <div class="tl-meta">
            <span>{{ l.minutes }} {{ t[lang].min }}</span>
            <span>{{ t[lang].level }} {{ l.level }}/5</span>
          </div>
          <div class="tl-bar"><i :style="{ width: l.level * 20 + '%', background: stageOf(l).color }"></i></div>
          <p class="tl-quote">“{{ l[lang].quote }}”</p>
          <span class="tl-go">{{ l.ready ? t[lang].go : t[lang].soon }} →</span>
        </a>
      </li>
    </ol>
  </div>
</template>
