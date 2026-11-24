<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLang } from './useLesson'

const props = withDefaults(defineProps<{
  initial?: number; monthly?: number; rate?: number; years?: number; fee?: number; showFee?: boolean
}>(), { initial: 10000, monthly: 300, rate: 7, years: 30, fee: 0, showFee: false })

const lang = useLang()
const initial = ref(props.initial)
const monthly = ref(props.monthly)
const rate = ref(props.rate)
const years = ref(props.years)
const fee = ref(props.fee)

// Month-by-month simulation; the annual rate (net of fee) is converted to an equivalent monthly rate.
const series = computed(() => {
  const r = Math.pow(1 + (Number(rate.value) - Number(fee.value)) / 100, 1 / 12) - 1
  let bal = Number(initial.value) || 0
  let paid = bal
  const out = [{ year: 0, bal, paid }]
  const n = Math.min(Math.max(Math.round(Number(years.value) || 0), 1), 60)
  for (let y = 1; y <= n; y++) {
    for (let m = 0; m < 12; m++) {
      bal = bal * (1 + r) + (Number(monthly.value) || 0)
      paid += Number(monthly.value) || 0
    }
    out.push({ year: y, bal, paid })
  }
  return out
})
const last = computed(() => series.value[series.value.length - 1])
const max = computed(() => Math.max(...series.value.map((p) => p.bal), 1))
const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US')

const W = 600, H = 200
const bars = computed(() => {
  const pts = series.value.slice(1)
  const bw = W / pts.length
  return pts.map((p, i) => {
    const hp = (Math.min(p.paid, p.bal) / max.value) * H
    const hg = (Math.max(p.bal - p.paid, 0) / max.value) * H
    return { x: i * bw + bw * 0.15, w: bw * 0.7, hp, hg }
  })
})
const L = computed(() => lang.value === 'zh'
  ? { initial: '初始本金 ($)', monthly: '每月投入 ($)', rate: '年化收益率 (%)', years: '年数', fee: '每年费用 (%)', final: '最终金额', paid: '你投入的', growth: '复利赚到的', note: '假设收益率每年固定，仅用于演示。真实市场每年涨跌不一。' }
  : { initial: 'Starting amount ($)', monthly: 'Monthly contribution ($)', rate: 'Annual return (%)', years: 'Years', fee: 'Annual fee (%)', final: 'Ending balance', paid: 'You put in', growth: 'Growth from compounding', note: 'Assumes a fixed return every year, for illustration only. Real markets go up and down.' })
</script>

<template>
  <div class="calc">
    <div class="calc-inputs">
      <label>{{ L.initial }}<input v-model.number="initial" type="number" min="0" step="1000" /></label>
      <label>{{ L.monthly }}<input v-model.number="monthly" type="number" min="0" step="50" /></label>
      <label>{{ L.rate }}<input v-model.number="rate" type="number" min="-20" max="30" step="0.5" /></label>
      <label>{{ L.years }}<input v-model.number="years" type="number" min="1" max="60" step="1" /></label>
      <label v-if="showFee">{{ L.fee }}<input v-model.number="fee" type="number" min="0" max="5" step="0.01" /></label>
    </div>
    <div class="calc-result">
      <div><span>{{ L.final }}</span><strong>{{ fmt(last.bal) }}</strong></div>
      <div><span><i class="sw paid"></i>{{ L.paid }}</span><strong>{{ fmt(last.paid) }}</strong></div>
      <div><span><i class="sw growth"></i>{{ L.growth }}</span><strong>{{ fmt(Math.max(last.bal - last.paid, 0)) }}</strong></div>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="calc-chart" role="img" :aria-label="L.final">
      <g v-for="(b, i) in bars" :key="i">
        <rect class="paid" :x="b.x" :width="b.w" :y="H - b.hp" :height="b.hp" />
        <rect class="growth" :x="b.x" :width="b.w" :y="H - b.hp - b.hg" :height="b.hg" />
      </g>
    </svg>
    <p class="calc-note">{{ L.note }}</p>
  </div>
</template>
