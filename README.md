# Nexdelve

幸存者类（survivor-like）游戏导航站。Next.js App Router + TypeScript + Tailwind CSS v4，`output: "export"` 导出纯 HTML，部署到 GitHub Pages。

- 全站规则：**[SEO.md](./SEO.md)**（新增页面前必读）
- 品牌 / 域名 / 免责声明：`lib/site.ts`
- 页面清单与元数据：`lib/routes.ts`
- 游戏数据：`lib/games.ts`
- 首页 FAQ：`lib/faq.ts`

当前线上地址：`https://nexdelve.github.io`

---

## 目录结构

```
.
├── app/
│   ├── layout.tsx              页头 + 页脚 + metadataBase（全站唯一容器）
│   ├── page.tsx                首页：H1 + 94 词介绍 + 卡片网格 + Coming soon + FAQ
│   ├── globals.css             Tailwind v4 入口 + 品牌色
│   ├── not-found.tsx           404 → out/404.html
│   ├── sitemap.ts              构建期生成 out/sitemap.xml
│   ├── robots.ts               构建期生成 out/robots.txt
│   ├── og.png/route.tsx        构建期生成 1200×630 分享图 → /og.png
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── contact/page.tsx
│   ├── disclaimer/page.tsx
│   ├── games/page.tsx          All Games 索引
│   ├── [slug]/page.tsx         游戏主页面 → /azeroth-survivors
│   └── [slug]/[sub]/page.tsx   5 个子页（tier-list / builds / how-to-play / items / troubleshoot）
├── components/
│   ├── SiteHeader.tsx          Logo + All Games
│   ├── SiteFooter.tsx          About / Privacy / Contact / Disclaimer + 免责声明
│   ├── Breadcrumbs.tsx         可见面包屑 + BreadcrumbList（同一份 trail）
│   ├── JsonLd.tsx              结构化数据输出
│   ├── GameCard.tsx            卡片：封面 / 名称 / 15 词描述 / 标签 / Play + Guides
│   ├── SiblingLinks.tsx        子页之间互链
│   └── Notices.tsx             数据政策提示
├── lib/
│   ├── site.ts                 品牌、域名、免责声明、联系邮箱
│   ├── seo.ts                  buildMetadata() + 字符预算断言 + canonical + OG_IMAGE
│   ├── routes.ts               全部公开页面的单一清单（title/description/面包屑）
│   ├── schema.ts               BreadcrumbList / WebSite / FAQPage
│   ├── games.ts                游戏注册表 + COMING_SOON（唯一的数据入口）
│   ├── faq.ts                  首页 3 条 FAQ（可见 HTML 与 JSON-LD 同源）
│   └── content.ts              每个子页的方法论文案（不含游戏数据）
├── public/
│   ├── .nojekyll               防止 Jekyll 吃掉 _next/
│   └── games/azeroth-survivors/azeroth-survivors-cover-art.png
├── scripts/
│   ├── make-placeholder-images.mjs   生成占位封面（零依赖）
│   ├── postbuild.mjs                 确保 .nojekyll 进入 out/
│   └── audit-seo.mjs                 构建后审计（h1 / canonical / 断链 / 重复 title）
├── .github/workflows/deploy.yml      push main → 构建 → 发布 Pages
├── next.config.ts
└── SEO.md
```

---

## 跑起来

```bash
npm install
npm run dev          # http://localhost:3000
```

生产构建：

```bash
npm run build        # 输出到 ./out
npm run audit        # 审计 out/ 里的 HTML，可单独跑
npm run preview      # 用本地静态服务器托管 ./out
```

`npm run build` 会做两件事：`next build` 生成静态站，然后 `postbuild.mjs` 确认 `.nojekyll` 已进入 `out/`。

---

## 本地预览 sitemap

```bash
# 1. 直接看文件（最快）
npm run build && cat out/sitemap.xml

# 2. 静态服务器托管构建产物
npm run build && npm run preview
# → http://localhost:3000/sitemap.xml
# → http://localhost:3000/robots.txt

# 3. 不装额外依赖
npm run build && python3 -m http.server 4000 --directory out
# → http://localhost:4000/sitemap.xml
```

`npm run dev` 下也能访问 `/sitemap.xml`，但那是动态响应，跟 `out/` 里的产物不是同一份。**核对 sitemap 一定看 `out/`。**

当前 sitemap 共 12 条 URL：首页、`/games`、4 个法务页、`/azeroth-survivors` 及其 5 个子页。

---

## 部署到 GitHub Pages

仓库 `Nexdelve/Nexdelve.github.io` 是用户站点，根路径提供服务，**不需要 basePath**。

1. 仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
2. push 到 `main`，`.github/workflows/deploy.yml` 自动构建并发布。
3. 首次跑完后访问 `https://nexdelve.github.io`。

### 以后切自定义域名

顺序不能颠倒：

1. 域名 DNS 先解析到 GitHub Pages（根域 4 条 A 记录，或 `www` 的 CNAME 指向 `nexdelve.github.io`）。
2. 加 `public/CNAME`，内容 `nexdelve.com`。
3. 改 `lib/site.ts` 的 `url` 与 `domain`。
4. 改 `scripts/audit-seo.mjs` 的 `ORIGIN`。
5. Settings → Pages → Custom domain 填同一个域名，勾选 Enforce HTTPS。

**先加 CNAME 再解析 DNS，`github.io` 会被重定向到一个还打不开的域名。** 这就是当前不放 `public/CNAME` 的原因。

---

## 加一个游戏

1. 在 `lib/games.ts` 的 `GAMES` 里加对象：`slug` / `name` / `publisher` / `tagline` / `tag` / `playUrl` / `summary` / `cover` / `hub` / `subpages`。
2. 手写 6 条 description（主页面 + 5 个子页），每条 120–155 字符。重复或超限会让构建失败，这是故意的。
3. 封面图放 `public/games/{slug}/`，文件名和 alt 都用英文关键词。
4. `npm run build`。

路由、sitemap、面包屑、内链、`generateStaticParams` 全部自动派生，不需要动任何页面文件。

`tagline` 有 12–18 词的硬约束（卡片用），`tag` 固定写成 `Genre · Genre · Free Browser` 形状。

---

## 以后放可直接玩的游戏

静态游戏产物（HTML5 / WebGL / WASM）放进 `public/play/{slug}/` 就是一个静态目录，访问路径 `https://nexdelve.github.io/play/{slug}/`。

| 方式 | 做法 | 代价 |
| --- | --- | --- |
| 直链 | 卡片的 Play 直接指向 `/play/{slug}/` | 最简单，离开站点框架 |
| iframe 嵌入 | 新建 `app/[slug]/play/page.tsx`，`<iframe>` 指向上面的静态目录 | 保留页头页脚与 SEO，需要给该页补 title/description |

`public/` 里的产物不经过 Next 的 metadata，不会自动进 sitemap，也没有 canonical。要收录就包一层 Next 页面。

只要游戏是纯前端的，整站就仍然是纯静态，GitHub Pages 够用。需要存档、排行榜、联机时才引入后端。

### 为什么 Azeroth Survivors 没有内嵌播放

游戏实际跑在 `https://play.azerothsurvivors.org/`，它返回：

```
content-security-policy: frame-ancestors 'self' https://azerothsurvivors.org
  https://aevoriasurvivors.com https://arenaofchampions.io
  https://www.arenaofchampions.io http://localhost:*
```

`nexdelve.github.io` 不在白名单里，浏览器会直接拒绝渲染这个 iframe。Play 按钮因此走外链新标签打开。

要真正做到「进页面就能玩」，只有两条路：

1. **让对方放行**：请站点运营方把 `https://nexdelve.github.io`（或 `nexdelve.com`）加进 `frame-ancestors`，然后在 `app/[slug]/play/page.tsx` 里 iframe `play.azerothsurvivors.org`。这是唯一干净的做法。
2. **框他们的整页**：`https://azerothsurvivors.org/` 本身没有 CSP，也没有 frame-busting 脚本，技术上可以框。但那等于把别人的整个站（含他们的导航和 FAQ）嵌进我们页面，内容重复且观感差，不建议。

外链方案下 `playUrl` 已经是真实地址，功能可用。

---

## 决策记录

| 项 | 取值 | 原因 |
| --- | --- | --- |
| `output` | `export` | GitHub Pages 没有 Node 运行时 |
| `trailingSlash` | `true` | Pages 只对 `/about/` 直接返回 `about/index.html`，不带斜杠会多一次跳转 |
| 游戏路由 | 根级 `/{slug}` | 目标 URL 是 `/azeroth-survivors`；`/games` 仅作索引 |
| `images.unoptimized` | `true` | 静态导出没有 Image Optimization API |
| OG 图路径 | `/og.png`（Route Handler） | Pages 对无扩展名文件返回 octet-stream，社交爬虫会拒收 |
| canonical 尾斜杠 | 有 | 与 `trailingSlash` 一致，避免自指 canonical 指向一个 301 |
| `title.template` | 不用 | 自动追加品牌会把 title 顶过 60 字符 |
| 首页面包屑 | 只有 JSON-LD，无可见 UI | 根节点没有上级，可见面包屑无意义，但结构化数据按规则仍输出 |
