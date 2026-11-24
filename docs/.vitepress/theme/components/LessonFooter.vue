<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLesson, readDone, writeDone } from './useLesson'
const { lesson, lang } = useLesson()
const done = ref(false)
function sync() {
  done.value = !!lesson.value && readDone().includes(lesson.value.id)
}
onMounted(sync)
watch(lesson, sync)
function toggle() {
  if (!lesson.value) return
  const ids = new Set(readDone())
  if (ids.has(lesson.value.id)) ids.delete(lesson.value.id)
  else ids.add(lesson.value.id)
  writeDone([...ids])
  sync()
}
</script>

<template>
  <div v-if="lesson" class="lesson-footer">
    <button v-if="lesson.ready" class="done-btn" :class="{ done }" @click="toggle">
      <template v-if="lang === 'zh'">{{ done ? '✓ 已学完（点击取消）' : '我学完这一课了' }}</template>
      <template v-else>{{ done ? '✓ Completed (click to undo)' : 'Mark this lesson as done' }}</template>
    </button>
    <p class="disclaimer">
      <template v-if="lang === 'zh'">
        本课内容仅用于学习，不构成投资、税务或法律建议。文中的产品和代码只是举例，不是推荐。数据和规则会变化，请以官方来源为准。
      </template>
      <template v-else>
        This lesson is for education only and is not investment, tax or legal advice. Products and tickers are examples, not recommendations. Rules and figures change; check official sources.
      </template>
    </p>
  </div>
</template>
