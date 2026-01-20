import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Ken Notes",
  description: "SF6 Ken Guide",
  srcDir: '../Ken_Obsidian_Project',
  
  // REWRITES: Map Source Path -> Target URL Path
  rewrites: {
    '00 - 首页与索引/首页与索引.md': 'index.md',
    '01 - 立回与中距离/立回基础.md': 'neutral.md',
    '02 - 起手与确认/基础确认.md': 'confirm.md',
    '03 - 连段后的压制/压制速查.md': 'oki.md',
    '04 - 确反连段/确反指南.md': 'punish.md',
    '05 - 连段大全/版中连段.md': 'combos-midscreen.md',
    '05 - 连段大全/版边连段.md': 'combos-corner.md',
    '05 - 连段大全/All_In_斩杀.md': 'combos-all-in.md',
    '05 - 连段大全/打康与特殊连段.md': 'combos-pc.md',
    '06 - 角色与情景对策/特定角色对策.md': 'matchups-char.md',
    '06 - 角色与情景对策/距离陷阱.md': 'matchups-spacing.md',
    '06 - 角色与情景对策/迸发与打灰对策.md': 'matchups-di.md',
    '99 - 模板与术语资源/基础术语.md': 'terminology.md'
  },

  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: '首页', link: '/' },
      { text: '基础确认', link: '/confirm' }
    ],
    sidebar: [
      {
        text: '核心攻略',
        items: [
          { text: '立回基础', link: '/neutral' },
          { text: '基础确认', link: '/confirm' },
          { text: '压制速查', link: '/oki' },
          { text: '确反指南', link: '/punish' },
          { 
            text: '连段大全',
            items: [
                { text: '版中连段', link: '/combos-midscreen' },
                { text: '版边连段', link: '/combos-corner' },
                { text: '斩杀连段', link: '/combos-all-in' },
                { text: '打康与特殊', link: '/combos-pc' }
            ]
          },
          { 
            text: '角色与情景对策',
            items: [
                { text: '特定角色对策', link: '/matchups-char' },
                { text: '距离陷阱', link: '/matchups-spacing' },
                { text: '迸发与打灰', link: '/matchups-di' }
            ]
          },
          { text: '基础术语', link: '/terminology' }
        ]
      }
    ]
  }
})
