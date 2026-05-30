export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  date: string
  category: string
  tags: string[]
  coverImage?: string
  excerpt: string
  content: string
  readingTime: number
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'openclaw-auto-recruitment-case',
    title: '用 openclaw 搭建全自动招聘系统，3 天帮客户节省 80% 人力成本',
    subtitle: 'AI装机部落真实案例 #001',
    date: '2026-05-28',
    category: '客户案例',
    tags: ['openclaw', '企业招聘', '自动化', 'AI工具'],
    excerpt:
      '这是一家 50 人规模的互联网公司，HR 团队每天需要处理 200+ 份简历，安排 30+ 场面试。通过 openclaw + Hermes 的多智能体协作方案，我们在 3 天内搭建了一套全自动招聘运营系统。',
    readingTime: 8,
    content: `
## 客户背景

这是一家位于深圳的互联网创业公司，团队约 50 人，正在快速扩张阶段。他们的 HR 经理每天面临这些痛点：

- 每天收到 200+ 份简历，筛选耗时 4 小时以上
- 需要手动在 3 个招聘平台（Boss直聘、智联、猎聘）同步发布职位
- 面试安排依赖微信沟通，经常改时间、漏通知
- 没有任何数据追踪，不知道哪个渠道效果好

## 我们的方案

### 第一阶段：工具部署（第 1 天）

**部署清单：**
- openclaw 主控台（处理核心工作流）
- Hermes Agent 引擎（多智能体协作）
- Codex AI 助手（自然语言交互界面）
- 关联企业微信（通知推送）

**关键配置：**
- 接入 3 个招聘平台的 API
- 设置简历自动筛选规则（根据 JD 关键词匹配度）
- 配置面试自动排期算法（考虑面试官和候选人的时间）

### 第二阶段：流程定制（第 2 天）

**搭建的自动化工作流：**

1. **简历自动筛选 Agent**
   - 读取各平台投递的简历
   - AI 分析匹配度（技能、经验、薪资期望）
   - 自动分类：高匹配 / 中匹配 / 低匹配
   - 高匹配简历即时推送给 HR

2. **面试安排 Agent**
   - 自动读取面试官日历
   - 给候选人发送可选时间段
   - 确认后自动发送面试邀请（含 Zoom 链接）
   - 面试前 1 小时自动提醒双方

3. **数据报表 Agent**
   - 每日自动生成招聘数据看板
   - 各渠道转化率对比
   - 面试通过率追踪
   - 自动推送给管理层

### 第三阶段：测试调优（第 3 天）

- 模拟 50 份真实简历测试筛选准确率
- 调整匹配算法阈值
- HR 团队培训（30 分钟上手）
- 正式上线运行

## 效果数据

| 指标 | 之前 | 之后 | 提升 |
|------|------|------|------|
| 简历筛选时间 | 4 小时/天 | 15 分钟/天 | **93%** |
| 职位发布操作 | 3 平台各操作 1 次 | 1 次自动同步 | **90%** |
| 面试安排沟通 | 平均 6 轮消息 | 自动完成 | **100%** |
| 数据报表制作 | 2 小时/周 | 实时自动生成 | **100%** |
| 整体人力成本 | 1.5 个 HR 全职 | 0.3 个 HR 兼职 | **80%** |

## 客户反馈

> "之前我们最头疼的就是简历筛选，每天 200 多份根本看不过来。现在系统每天自动帮我筛选出最匹配的 20 份，准确率比我自己筛还高。最惊喜的是面试安排，以前改个时间要在微信上来回沟通十几条消息，现在全部自动化了。"
> 
> —— HR 经理王女士

## 技术细节

**核心工具栈：**
- **openclaw**：工作流编排引擎，串联所有 Agent
- **Hermes**：多智能体调度，3 个 Agent 并行协作
- **Codex**：自然语言接口，HR 用微信就能操作
- **企业微信**：通知推送和交互入口

**自定义开发点：**
- 简历解析模板（针对不同行业定制）
- 面试评分卡（结构化面试问题库）
- 数据看板（管理层关注的 6 个核心指标）

## 下一步计划

客户正在考虑扩展系统能力：
- 接入更多招聘平台（前程无忧、拉勾）
- 添加 AI 视频面试初筛功能
- 员工入职流程自动化衔接

## 关于这个案例

这是 AI装机部落的第 001 号真实案例。我们用 openclaw + Hermes + Codex 三款工具，在 3 天内为客户搭建了一套完整的 AI 招聘运营系统。

如果你也有类似的需求——无论是招聘、电商、内容创作还是数据分析——欢迎联系我们。

**联系方式：**
- 邮箱：zhou82118@gmail.com
- 微信/手机：18898682118
- 公众号：疗愈师阿Q

**你给想法，我给方案。**
    `.trim(),
  },
  {
    slug: 'openclaw-beginner-guide',
    title: 'openclaw 新手入门：7 步搭建你的第一个 AI 工作流',
    subtitle: '零基础也能上手的 AI 自动化教程',
    date: '2026-05-25',
    category: '教程指南',
    tags: ['openclaw', '入门教程', 'AI工作流', '自动化'],
    excerpt:
      'openclaw 是目前最强大的 AI 工作流编排工具之一。本文将带你从零开始，用 7 个简单步骤搭建一个自动化的内容分发工作流。不需要编程基础，跟着做就行。',
    readingTime: 12,
    content: '教程内容即将上线...',
  },
  {
    slug: 'ai-ecommerce-auto-operation',
    title: 'AI 工具如何帮助电商卖家实现 24 小时自动运营',
    subtitle: '从选品到发货，AI 全流程赋能',
    date: '2026-05-20',
    category: '行业应用',
    tags: ['AI电商', '自动化运营', 'openclaw', '店铺管理'],
    excerpt:
      '电商运营涉及选品、上架、客服、发货、数据分析等多个环节。本文介绍如何用 AI 工具串联这些环节，实现真正的 24 小时无人化运营。',
    readingTime: 10,
    content: '文章内容即将上线...',
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return Array.from(tags)
}
