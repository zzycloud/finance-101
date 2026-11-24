import { computed } from 'vue'
import { useData } from 'vitepress'
import { lessons, stageOf, type Lang } from '../../lessons'

export function useLang() {
  const { lang } = useData()
  return computed<Lang>(() => (lang.value.startsWith('zh') ? 'zh' : 'en'))
}

export function useLesson() {
  const { frontmatter } = useData()
  const lang = useLang()
  const lesson = computed(() => lessons.find((l) => l.id === frontmatter.value.lesson))
  const stage = computed(() => (lesson.value ? stageOf(lesson.value) : undefined))
  return { lesson, stage, lang }
}

const KEY = 'finance101-done'

export function readDone(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function writeDone(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable: progress is a convenience only */
  }
}
