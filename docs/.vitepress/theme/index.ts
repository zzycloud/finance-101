import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import LessonHeader from './components/LessonHeader.vue'
import LessonFooter from './components/LessonFooter.vue'
import Timeline from './components/Timeline.vue'
import Quiz from './components/Quiz.vue'
import ComingSoon from './components/ComingSoon.vue'
import CompoundCalc from './components/CompoundCalc.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(LessonHeader),
      'doc-after': () => h(LessonFooter),
    })
  },
  enhanceApp({ app }) {
    app.component('Timeline', Timeline)
    app.component('Quiz', Quiz)
    app.component('ComingSoon', ComingSoon)
    app.component('CompoundCalc', CompoundCalc)
  },
} satisfies Theme
