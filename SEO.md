# SEO.md — Nexdelve 全站规则

> 本文件是全站不可协商的约定。新增或修改任何页面前先读这里，交付前用 §10 的命令自检。
> 规则不是建议：违反第 1、3、4 条的页面会在 `npm run build` 阶段直接失败。

站点：**Nexdelve**（https://nexdelve.github.io，后续切 nexdelve.com）
技术栈：Next.js App Router + TypeScript + Tailwind CSS v4，`output: "export"` 纯静态导出。
部署：GitHub Pages（Actions 构建 `out/` 后发布，无 Node 运行时）。
目标市场：美国英文用户。

---

## 0. 三条底线

1. **一页一意图。** 每个 URL 只服务一个搜索意图，对应一个 `<h1>`、一个 canonical、一组子页。
2. **元数据是构建期产物，不是人肉记忆。** title / description / canonical 全部来自 `lib/routes.ts` 的路由清单，由 `lib/seo.ts` 校验；不在页面里手写字符串。
3. **不确定就不写。** 任何来源不可核实的数值、技能名、职业名，要么标注 `Community-reported`，要么删掉。见 §8。

---

## 1. 每页元数据

### 1.1 必填字段

| 字段 | 规则 | 实现位置 |
| --- | --- | --- |
| `<title>` | 全站唯一，**1–60 字符**（含空格）。品牌名计入长度 | `lib/routes.ts` → `buildMetadata()` |
| `meta description` | 全站唯一，**120–155 字符** | 同上 |
| `<h1>` | **每页恰好一个**，与页面主关键词一致 | 各 `page.tsx` |
| `canonical` | **自指**，由 `path` 推导，带尾斜杠 | `buildMetadata()` |
| `og:title` | 等于 `<title>` | 同上 |
| `og:description` | 等于 description | 同上 |
| `og:image` | 1200×630，构建期由 `app/og.png/route.tsx` 生成，路径 `/og.png` | `lib/seo.ts` 的 `OG_IMAGE` |
| `twitter:card` | `summary_large_image` | `buildMetadata()` |

### 1.2 字符预算怎么算

- 用 `String.length` 计，英文场景下与显示宽度基本一致，不要用字节数。
- **60 字符是硬上限，不是目标值。** Google 按像素宽度截断（约 580px），实操中把 title 控制在 **50 字符以内**更稳。本仓库现有 title 最长 52 字符。
- description 低于 120 会被判定为内容过薄，高于 155 会被截断成半句话。**宁可写 130，不要写到 154 贴着上限。**

### 1.3 构建期强制

`lib/seo.ts` 的 `assertSeo()` 在每次 `buildMetadata()` 调用时执行，超限直接抛错中断构建：

```
[seo] /games/foo: title is 67 chars (max 60): "..."
[seo] /about: description is 96 chars (must be 120–155): "..."
```

`lib/routes.ts` 的 `validate()` 额外拦截**重复**的 title 与 description（规则 1 要求唯一）：

```
[routes] duplicate title on "/privacy" and "/disclaimer": "Legal — Nexdelve"
```

### 1.4 正确写法

```ts
// app/about/page.tsx
import { requireRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const route = requireRoute("/about");

export const metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});
```

**不要**在 `app/layout.tsx` 里设 `title.template`。模板会自动追加品牌后缀，把刚好 55 字符的 title 顶到 70，构建期才报错，排查成本高。品牌名一律在 `lib/routes.ts` 里手工写进 title。

---

## 2. 标题层级

- 每页一个 `<h1>`，内容 = 页面主关键词的自然语言形式（`Example Game tier list`，不是 `Tier List`）。
- `<h2>` 用于正文分节，`<h3>` 用于卡片/列表项标题，不跳级。
- 导航、页脚、面包屑里**不出现** heading 标签（用 `<nav aria-label>`），否则会污染文档大纲。

---

## 3. 面包屑 + BreadcrumbList

### 3.1 规则

- 每个非根页面都必须有可见面包屑，且**同时**输出 `BreadcrumbList` 结构化数据。
- 两者由同一个 `trail` 数组驱动（`lib/routes.ts` 里定义），不可能不一致。
- 末级节点渲染为纯文本 + `aria-current="page"`，不加链接。
- **例外（唯一）：** 首页是面包屑的根，`trail` 长度为 1，不输出面包屑。这不是遗漏，是根节点的定义。

### 3.2 层级深度

| 页面 | 面包屑 |
| --- | --- |
| `/` | 无（根） |
| `/about` 等法务页 | Home / About |
| `/games` | Home / All Games |
| `/{slug}` | Home / {Game} |
| `/{slug}/{sub}` | Home / {Game} / {Tier List} |

游戏页在站点根级（`/azeroth-survivors`），不在 `/games/` 下面。`/games` 只作为索引页存在。

规则原文写的是「首页 > 当前页」。当页面存在中间层级时，完整祖先链才是正确的 `BreadcrumbList` 结构，Google 也按这个结构做 SERP 路径展示，所以子页一律输出完整链而不是压成两级。

### 3.3 输出形态

```tsx
<Breadcrumbs trail={route.trail} />
```

组件同时产出：

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexdelve.github.io/" },
    { "@type": "ListItem", "position": 2, "name": "Azeroth Survivors", "item": "https://nexdelve.github.io/azeroth-survivors/" },
    { "@type": "ListItem", "position": 3, "name": "Tier List", "item": "https://nexdelve.github.io/azeroth-survivors/tier-list/" }
  ]
}
```

首页是根节点，`trail` 只有一项：**不渲染可见面包屑，但仍输出只含 Home 一条的 `BreadcrumbList`**，保证「每页都有面包屑结构化数据」这条规则在首页也成立。

`item` 必须是绝对 URL 且带尾斜杠（与 canonical 一致）。

---

## 4. sitemap.xml 与 robots.txt

- 两者都由 Next 在构建期生成，产物在 `out/sitemap.xml` 与 `out/robots.txt`。
- sitemap 的数据源是 `lib/routes.ts` 的 `ALL_ROUTES`，**不是**手写数组。新增页面只改路由清单，sitemap 自动包含。
- 只收录 `indexable: true` 的页面。`404.html` 不进 sitemap（它由托管商以 404 状态返回）。
- 每条含 `lastModified` / `changeFrequency` / `priority`：
  - 首页 1.0，All Games 0.9，游戏 hub 0.8，子页 0.7，法务页 0.3–0.5。
- robots.txt 允许全站抓取，屏蔽 `/_next/`（构建产物），并声明 sitemap 绝对地址。

新增页面时**不要**手改 sitemap，改 `lib/routes.ts`。

---

## 5. 页面骨架与固定免责声明

全站统一结构，由 `app/layout.tsx` 提供，页面只负责 `<main>` 内容：

```
<a href="#main">Skip to content</a>
<SiteHeader />    Logo + All Games
<main id="main">{children}</main>
<SiteFooter />    About / Privacy / Contact / Disclaimer + 免责声明 + 版权
```

**免责声明文案是固定字符串，逐字不得改动**，唯一变量是品牌名（从 `SITE.brand` 插值）：

> {BRAND} is an unofficial fan site. We are not affiliated with, endorsed by, or sponsored by Blizzard Entertainment or Nintendo. All game names and trademarks belong to their respective owners.

当前渲染结果：

> Nexdelve is an unofficial fan site. We are not affiliated with, endorsed by, or sponsored by Blizzard Entertainment or Nintendo. All game names and trademarks belong to their respective owners.

代码位置：`lib/site.ts` 的 `DISCLAIMER`。`components/SiteFooter.tsx` 与 `/disclaimer` 页共用同一个常量——**不允许在页面里复制粘贴这段文字**，改一处必须全站生效。

---

## 6. 全站内链

### 6.1 必须存在的链接

| 来源 | 目标 | 锚文本 | 位置 | 代码 |
| --- | --- | --- | --- | --- |
| 首页 | 每个游戏 hub | `{Game} guides` | 游戏卡标题 | `components/GameCard.tsx` |
| 首页 | `/games`、`/about` | `Browse all games` / `How we source data` | hero | `app/page.tsx` |
| All Games | 每个游戏 hub | `{Game} guides` | 游戏卡 | `components/GameCard.tsx` |
| 游戏 hub | 它的 5 个子页 | `{Game} {keyword}` | 子页列表 | `app/games/[slug]/page.tsx` |
| 子页 | 所属游戏 hub | `{Game} guides` | 正文首段下方 | `app/games/[slug]/[sub]/page.tsx` |
| 子页 | 其余 4 个兄弟子页 | `{Game} {keyword}` | 正文底部 | `components/SiblingLinks.tsx` |
| 所有非根页 | 上级 | 节点名 | 页面顶部 | `components/Breadcrumbs.tsx` |
| 全站 | About / Privacy / Contact / Disclaimer | 页脚标签 | 页脚 | `components/SiteFooter.tsx` |

### 6.2 锚文本规则

- 锚文本 = **目标页面的主关键词本身**，与目标页 `<h1>` 保持同一措辞。
- 禁止：`click here`、`read more`、`learn more`、`this page`、`here`、裸 URL、以及只包一张图的空锚文本。
- 同一页内指向同一目标的链接只出现一次，不做堆叠。
- **唯一例外：** 游戏卡片同时有标题链接（锚文本 `{Game} guides`）和 CTA 按钮（`Guides & Tier List`），两者指向同一个游戏页。标题承担关键词锚文本，按钮承担可点击性，这是卡片式目录的通行做法。
- 卡片式链接用 `after:absolute after:inset-0` 扩展点击区域，**链接文字仍然是关键词**，不许换成 "View" 之类的空词。

### 6.3 校验

`scripts/audit-seo.mjs` 会遍历所有产出的 HTML，检查 `href` 指向的文件是否真实存在，断链会让审计失败。

---

## 7. 图片

- 一律用 `next/image`，禁止裸 `<img>`（Logo 是内联 SVG，不在此列——它不产生请求，也不能延迟加载）。
- **文件名 = 内容关键词**，kebab-case，带游戏名：`diablo-4-necromancer-build-guide.png`。禁止 `img001.png`、`image-1.jpg`、`cover.png`、`screenshot.png`。
- **alt 用英文关键词描述画面**，同样带游戏名与主题：`Diablo 4 necromancer build guide showing skill tree layout`。不写 `image`、`banner`、`picture` 这类零信息词，也不堆关键词。
- 装饰性图片 alt 留空（`alt=""`），但本规则下内容图不允许留空。
- 必填 `width` / `height`，防 CLS；列表图给 `sizes`。
- 首屏主图加 `priority`，其余保持默认懒加载。
- 目录约定：`public/games/{slug}/{slug}-{subject}.png`。
- 尺寸：封面 ≥ 1200×630。**不要**上传你无权使用的发行商美术资源。

> `next.config.ts` 设了 `output: "export"` + `images.unoptimized: true`。GitHub Pages 没有 Node 运行时，也就没有 Next 的 Image Optimization API，这里的 `unoptimized` 不是可选项。换来的好处是图片源文件必须自己压到合理尺寸——上传前把封面控制在 100–200 KB。

---

## 8. 数据真实性红线

这是本站和普通攻略站唯一的差异点，不许为了「页面看起来饱满」破例。

### 8.1 三档标注

| 档位 | 定义 | 呈现 |
| --- | --- | --- |
| **Confirmed** | 可追溯到官方补丁说明、游戏内界面、发行商声明 | 正常展示，附来源链接 |
| **Community-reported** | 社区广泛流传，但官方从未公布 | 展示，但必须带 `Community-reported` 标签 |
| **Omitted** | 完全无法核实 | **不写**。不留占位符，不写「约」「大概」「据传」 |

### 8.2 禁止项

- 编造技能名、职业名、装备名、地图名——哪怕听起来很合理。
- 编造数值：伤害、掉率、冷却、倍率、经验曲线。没有来源就一个数字都不写。
- 用 `T0 / T1 / T2` 排位来暗示存在权威数据源，实际只是主观判断。
- 为了 SEO 长度把同一句话换个说法重复三遍。
- 用「2026 最新」「更新至最新版本」这类无法验证的时效声明。

### 8.3 代码层约束

- `Community-reported` 字符串只在 `lib/site.ts` 的 `COMMUNITY_REPORTED` 常量里定义一次，页面通过 `components/Notices.tsx` 的 `<DataPolicyNote />` 或行内 badge 引用。
- 每个可能承载数值的页面（tier list / builds / items）必须渲染 `<DataPolicyNote />`，让读者看到判定标准。
- 数据未就绪时，页面显示「No verified entries published yet」空状态，**而不是**假数据。空状态页仍然 indexable——等数据到了再补，不要在正文里写「Coming soon」凑字数。

### 8.4 新增一条游戏数据前的自问

1. 这个值的一手来源是什么？能给出来源 URL 吗？
2. 给不出来源，它在社区里是否被反复引用？（→ 标 `Community-reported`）
3. 两条都不满足？（→ 删掉）
4. 这条数据会随补丁失效吗？会的话，页面上有没有写「最后核对于哪个版本」？

---

## 9. 新增一个游戏页的完整步骤

1. 在 `lib/games.ts` 的 `GAMES` 里加一个对象：`slug` / `name` / `publisher` / `summary` / `cover` / `hub` / `subpages`。
2. 手写 6 条 description（hub + 5 个子页），每条 120–155 字符。**不要自动生成**——生成出来的描述会彼此雷同，触发 §1 的唯一性校验。
3. 准备封面图，按 §7 命名，放 `public/games/{slug}/`。
4. `npm run build`。路由、sitemap、面包屑、内链、`generateStaticParams` 全部自动生成，不需要改任何页面文件。
5. `node scripts/audit-seo.mjs` 通过后再提交。

上线前删除 `GAMES` 里 `isPlaceholder: true` 的占位条目。

### 部署形态

固定为 GitHub Pages + `output: "export"`，没有第二套配置可选。这条约束会一直成立，直到引入需要服务端的功能（存档、排行榜、联机）；在那之前不要动 `next.config.ts` 的 `output`、`trailingSlash`、`images` 三项。

`public/.nojekyll` 保证 `_next/` 目录不被 Jekyll 过滤，`scripts/postbuild.mjs` 在构建后确认它进入了 `out/`。

**自定义域名当前未启用。** `public/CNAME` 已移除，站点跑在 `https://nexdelve.github.io`，canonical / sitemap / og 全部指向这个 host。切换域名时按顺序：DNS 解析好 → 加回 `public/CNAME`（内容 `nexdelve.com`）→ 改 `lib/site.ts` 的 `url` 与 `domain` → 改 `scripts/audit-seo.mjs` 的 `ORIGIN` → 重新构建。**不要先加 CNAME**，否则 github.io 会被重定向到尚不存在的域名。

静态游戏产物放在 `public/play/{slug}/`，公开路径 `https://nexdelve.github.io/play/{slug}/`，不需要改架构；要让它可被收录并有 canonical，用 `app/[slug]/play/page.tsx` 包一层 iframe。

---

## 10. 验收清单

交付任何页面之前，以下全部为「是」才算完成：

- [ ] `<title>` 唯一、≤60 字符（目标 ≤50）
- [ ] description 唯一、120–155 字符
- [ ] 页面恰好一个 `<h1>`
- [ ] canonical 自指、绝对 URL、带尾斜杠
- [ ] `og:title` / `og:description` / `og:image` / `twitter:card` 齐全
- [ ] 面包屑可见 + `BreadcrumbList` 有效（根页除外）
- [ ] 出现在 `out/sitemap.xml` 中
- [ ] 页头页脚完整，免责声明逐字一致
- [ ] 上行链接（父级）与兄弟链接各存在且锚文本为关键词
- [ ] 所有图片走 `next/image`，文件名与 alt 为英文关键词
- [ ] 无来源数据已删除或已标 `Community-reported`

命令：

```bash
npm run build          # 元数据超限/重复会在这里失败
node scripts/audit-seo.mjs   # 检查产出 HTML 的 h1/canonical/og/断链/免责声明
```

审计输出 `out/` 下每个页面的实际字符数；有任何 `FAIL` 行则退出码非 0。
