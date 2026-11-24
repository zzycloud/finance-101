import { defineConfig, type DefaultTheme } from 'vitepress'
import { lessons, stages, lessonNumber, type Lang } from './lessons'

const REPO = 'https://github.com/zzycloud/finance-101'

function sidebar(lang: Lang): DefaultTheme.SidebarItem[] {
  const prefix = lang === 'zh' ? '/' : '/en/'
  const extra = lang === 'zh'
    ? [{ text: '术语表', link: '/glossary' }, { text: '关于本教程', link: '/about' }]
    : [{ text: 'Glossary', link: '/en/glossary' }, { text: 'About', link: '/en/about' }]
  return [
    ...stages.map((stage) => ({
      text: `<span class="stage-dot" style="background:${stage.color}"></span>${stage[lang]}`,
      collapsed: false,
      items: lessons
        .filter((l) => l.stage === stage.id)
        .map((l) => ({
          text: `<span class="lesson-num">${lessonNumber(l)}</span>${l[lang].title}${l.ready ? '' : '<span class="soon-dot" title="soon"></span>'}`,
          link: `${prefix}${l.id}`,
        })),
    })),
    { text: lang === 'zh' ? '更多' : 'More', items: extra },
  ]
}

const zhTheme: DefaultTheme.Config = {
  nav: [
    { text: '学习路线', link: '/' },
    { text: '术语表', link: '/glossary' },
    { text: '关于', link: '/about' },
  ],
  sidebar: sidebar('zh'),
  outline: { label: '本页目录', level: [2, 3] },
  docFooter: { prev: '上一课', next: '下一课' },
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  sidebarMenuLabel: '目录',
  returnToTopLabel: '回到顶部',
  langMenuLabel: '切换语言',
  editLink: { pattern: `${REPO}/edit/main/docs/:path`, text: '发现错误？在 GitHub 上修改此页' },
  footer: {
    message: '本站内容仅供学习，不构成任何投资建议。投资有风险，入市需谨慎。',
    copyright: '内容以 CC BY-NC-SA 4.0 授权',
  },
}

const enTheme: DefaultTheme.Config = {
  nav: [
    { text: 'Learning Path', link: '/en/' },
    { text: 'Glossary', link: '/en/glossary' },
    { text: 'About', link: '/en/about' },
  ],
  sidebar: sidebar('en'),
  outline: { label: 'On this page', level: [2, 3] },
  editLink: { pattern: `${REPO}/edit/main/docs/:path`, text: 'Spot a mistake? Edit this page on GitHub' },
  footer: {
    message: 'For education only. Nothing here is investment advice. Investing involves risk, including loss of principal.',
    copyright: 'Content licensed under CC BY-NC-SA 4.0',
  },
}

export default defineConfig({
  base: '/finance-101/',
  cleanUrls: true,
  lastUpdated: true,
  title: 'Finance 101',
  description: 'A plain-language, bilingual beginner guide to investing in US markets.',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/finance-101/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
  ],
  transformPageData(pageData) {
    const id = pageData.frontmatter.lesson
    const l = lessons.find((x) => x.id === id)
    if (!l) return
    const lang: Lang = pageData.relativePath.startsWith('en/') ? 'en' : 'zh'
    pageData.title = `${lessonNumber(l)} ${l[lang].title}`
    pageData.description = `${l[lang].subtitle}. ${l[lang].quote}`
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: '理财 101',
      description: '写给完全新手的美股理财入门课：从复利到期权期货，通俗易懂，由浅入深。',
      themeConfig: zhTheme,
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Finance 101',
      description: 'A plain-language beginner course on investing in US markets, from compounding to options and futures.',
      themeConfig: enTheme,
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: REPO }],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
  },
})
