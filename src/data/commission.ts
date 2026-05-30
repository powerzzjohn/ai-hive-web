export interface CommissionItem {
  id: string
  category: string
  name: string
  subtitle: string
  price: string
  commission: string
  commissionNote?: string
  description: string
  deliveryTime?: string
}

export const commissionData: CommissionItem[] = [
  {
    id: 'AIZJ-YL-2026001',
    category: '学习资料',
    name: 'openclaw 橙皮书',
    subtitle: '从入门到精通',
    price: '¥3.9',
    commission: '/',
    commissionNote: '用作门店经营费用',
    description: '一本不需要技术背景的实操手册。7天时间，从安装到产出第一个自动化工作流。',
  },
  {
    id: 'AIZJ-YL-2026002',
    category: '学习资料',
    name: 'openclaw 全场景指南',
    subtitle: '全球用户 10 大场景 50 个用法',
    price: '¥11.9',
    commission: '/',
    commissionNote: '用作门店经营费用',
    description: '整理了全球 openclaw 社区中最高频的 50 个实战场景。覆盖内容创作、数据分析、客服自动化。',
  },
  {
    id: 'AIZJ-YL-2026003',
    category: '学习资料',
    name: 'openclaw 盈利实录',
    subtitle: '14 天自动化盈利实录',
    price: '¥11.9',
    commission: '/',
    commissionNote: '用作门店经营费用',
    description: '真实的 14 天案例拆解：如何用 openclaw 搭建一个全自动的内容分发管道，从 0 到首笔收入。',
  },
  {
    id: 'AIZJ-YL-2026004',
    category: '学习资料',
    name: 'Hermes agent 指南',
    subtitle: '从入门到精通',
    price: '¥11.9',
    commission: '/',
    commissionNote: '用作门店经营费用',
    description: '多智能体协作系统的完整指南。教会你如何指挥多个 AI Agent 分工合作，处理复杂任务。',
  },
  {
    id: 'AIZJ-RM-2026001',
    category: '基础入门版安装',
    name: 'Openclaw + Codex 装机包',
    subtitle: '基础入门版',
    price: '¥299',
    commission: '¥200',
    commissionNote: '余款用作门店经营费用',
    description: '原始版安装，附赠 AI 保姆 Codex，保证可用。关联微信或飞书任一渠道，即装即用。',
    deliveryTime: '2 天',
  },
  {
    id: 'AIZJ-RM-2026002',
    category: '基础入门版安装',
    name: 'Hermes + Codex 装机包',
    subtitle: '基础入门版',
    price: '¥299',
    commission: '¥200',
    commissionNote: '余款用作门店经营费用',
    description: '多智能体协作入门方案。安装 Hermes 引擎 + Codex 助手，打通你的第一个 AI 协作链路。',
    deliveryTime: '2 天',
  },
  {
    id: 'AIZJ-SJ-2026001',
    category: '升级版基础安装',
    name: '全栈装机包',
    subtitle: 'Openclaw + Hermes + Codex + AI 模型接入',
    price: '¥425',
    commission: '¥200',
    commissionNote: '余款用作门店经营费用',
    description: '升级版基础安装。三大核心工具一次性部署完毕，额外接入 AI 模型 + 图文/视频类自媒体运营流程贯通及指导。',
    deliveryTime: '3-5 天',
  },
  {
    id: 'AIZJ-SJ-2026002',
    category: '总助类 AI 角色定制',
    name: 'AI 角色定制',
    subtitle: '总助类方案',
    price: '¥799',
    commission: '¥200',
    commissionNote: '预收定金 30%',
    description: '不只是安装，而是为你量身定制。前期深度沟通，理解你的业务场景，定制专属的 AI 工作角色与落地流程。',
    deliveryTime: '5-7 天',
  },
  {
    id: 'AIZJ-WYYY-2026001',
    category: '企业半自动无忧运营',
    name: '企业员工招聘',
    subtitle: '半自动无忧运营方案',
    price: '¥799',
    commission: '¥500',
    commissionNote: '预收定金 30%',
    description: '通过 AI 实现主流招聘网站的数字化运营。一次性设定，含数据分析、警告提示，人工+AI 结合的半自动无忧运营。附赠 AI 保姆 Codex，接受后期免费 3 次更换电脑主机。',
    deliveryTime: '3 天',
  },
  {
    id: 'AIZJ-WYYY-2026002',
    category: '企业半自动无忧运营',
    name: '电商店铺运营',
    subtitle: '半自动无忧运营方案',
    price: '¥1,799',
    commission: '¥900',
    commissionNote: '预收定金 30%',
    description: '通过 AI 实现国内外主要电商平台的数字化运营。含数据分析、无库存货源上架、自动发货、群消息沟通、警告提示。附赠 AI 保姆 Codex，接受后期免费 10 次更换电脑主机。',
    deliveryTime: '5-7 天',
  },
  {
    id: 'AIZJ-WYYY-2026003',
    category: '企业半自动无忧运营',
    name: '金融/理财运营',
    subtitle: '半自动无忧运营方案',
    price: '¥2,688+',
    commission: '¥1,500',
    commissionNote: '预收定金 50%',
    description: '通过 AI 实现金融理财产品的数字化运营。含数据分析、模拟盘、警告提示，人工+AI 结合的半自动运营。附赠 AI 保姆 Codex，接受后期免费 20 次更换电脑主机。',
    deliveryTime: '10 天',
  },
  {
    id: 'AIZJ-WYYY-2026004',
    category: '企业半自动无忧运营',
    name: '企业 GEO 优化',
    subtitle: 'AI 推荐引擎优化',
    price: '¥4,888',
    commission: '¥2,500',
    commissionNote: '预收定金 50%',
    description: '通过多种工具实现企业信息、主推业务、权威品牌力的 AI 平台咨询结果优化。主要针对豆包 AI 优化，30 天上榜，全年有效，每月提供月报。',
    deliveryTime: '365 天',
  },
]

export function getCommissionByCategory(): Record<string, CommissionItem[]> {
  const grouped: Record<string, CommissionItem[]> = {}
  commissionData.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = []
    grouped[item.category].push(item)
  })
  return grouped
}
