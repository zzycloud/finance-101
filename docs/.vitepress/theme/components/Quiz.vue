<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { useLang } from './useLesson'

interface Q { q: string; options: string[]; answer: number; explain: string }
const { frontmatter } = useData()
const lang = useLang()
const questions = computed<Q[]>(() => frontmatter.value.quiz ?? [])
const picked = ref<(number | null)[]>([])
watch(questions, (qs) => { picked.value = qs.map(() => null) }, { immediate: true })
const score = computed(() => picked.value.filter((p, i) => p === questions.value[i]?.answer).length)
const finished = computed(() => picked.value.length > 0 && picked.value.every((p) => p !== null))
function pick(i: number, j: number) {
  if (picked.value[i] === null) picked.value[i] = j
}
function reset() { picked.value = questions.value.map(() => null) }
</script>

<template>
  <div v-if="questions.length" class="quiz">
    <div v-for="(item, i) in questions" :key="i" class="quiz-q">
      <p class="quiz-title"><span class="quiz-n">{{ i + 1 }}</span>{{ item.q }}</p>
      <button
        v-for="(opt, j) in item.options" :key="j"
        class="quiz-opt"
        :class="{
          right: picked[i] !== null && j === item.answer,
          wrong: picked[i] === j && j !== item.answer,
          muted: picked[i] !== null && j !== item.answer && picked[i] !== j,
        }"
        :disabled="picked[i] !== null"
        @click="pick(i, j)"
      >{{ String.fromCharCode(65 + j) }}. {{ opt }}</button>
      <p v-if="picked[i] !== null" class="quiz-explain">
        <strong>{{ picked[i] === item.answer ? (lang === 'zh' ? '答对了！' : 'Correct!') : (lang === 'zh' ? '再想想：' : 'Not quite: ') }}</strong>
        {{ item.explain }}
      </p>
    </div>
    <div v-if="finished" class="quiz-score">
      {{ lang === 'zh' ? `得分 ${score} / ${questions.length}` : `Score: ${score} / ${questions.length}` }}
      <button class="quiz-reset" @click="reset">{{ lang === 'zh' ? '重做' : 'Try again' }}</button>
    </div>
  </div>
</template>
