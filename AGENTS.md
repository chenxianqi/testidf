# 站点项目规范(IDF Sites)

这份文件是这个项目的「标准」。平台内置的 AI、你自己用的 AI 编程工具(Cursor、Claude Code、Copilot…)、
以及人工开发,都按这一份来 —— 这样平台里改、GitHub 上改、本地改,三边可以随时切换。

## 技术栈(固定)

- React 19 + TypeScript,Vite 构建,Tailwind CSS v4(没有 tailwind.config.js,主题写在 `src/index.css` 的 `@theme` 里)
- 路由:`react-router-dom`(`BrowserRouter`,basename 由 `src/lib/idf.ts` 的 `basename()` 给出,**不要改**)
- 可用的第三方包**只有**:`react`、`react-dom`、`react-router-dom`、`lucide-react`(图标)、`framer-motion`(动画)、`clsx`。
  平台构建时不会安装别的包;import 了别的包会构建失败。
- 平台构建**不读** `vite.config.ts` 和 `package.json`(只用于本地开发),配置等价于:react 插件 + tailwind 插件 + `base: './'`。

## 目录

```
index.html            入口(标题、description 写这里)
idf.json              平台配置:站点名、API 地址、forms(表单名 → 表单地址段)
src/main.tsx          挂载 + 路由(一般不用改)
src/App.tsx           路由表:多页面在这里加 <Route>
src/pages/            一个页面一个文件
src/components/       复用组件
src/lib/idf.ts        平台 SDK(不要改,平台会整份更新)
src/index.css         Tailwind 入口 + 品牌色
public/               原样拷贝的静态文件(favicon.ico、robots.txt)
```

## 表单(连 CRM)—— 必须走平台

留资、报名、咨询一律用平台表单,提交才会进客户列表、触发流程:

- 最省事:`<LeadForm form="main" />`(字段在平台「表单」里编辑)
- 自定义样式:自己画输入框,提交时 `await submitForm('main', { name, phone })`;
  失败会抛 `Error`,`message` 可以直接给访客看。字段 key 要和平台表单里的一致(`getForm('main')` 能拿到)。
- 新的表单:在平台建好,把地址段写进 `idf.json` 的 `forms`(如 `"signup": "abcd1234"`),代码里用 `'signup'`。
- **不要**自己写 fetch 到别的接口去收集联系方式,也不要把联系方式存 localStorage。

## 图片

- 用平台素材库上传,拿到 `/m/xxxx.jpg` 这种地址直接用(`<img src="/m/xxxx.jpg">`)。
- 也可以用任意 `https://` 图片。不要把大图放进代码仓库。

## 写代码的约定

- 手机优先:先保证 375px 宽度好看,再用 `md:` / `lg:` 加大屏样式。
- 每个页面要有清楚的行动按钮(滚到表单或去报名页)。
- 中文文案用简体,语气直接;不要留 Lorem ipsum。
- 链接站内页面用 `<Link to="/about">`,不要写死 `/s/...` 前缀。
- 不要在代码里放任何密钥、token、密码(平台推送 GitHub 前会扫描,发现会拒绝)。
- 保持能直接 `npm run build` 通过:没有 TypeScript 报错、没有找不到的 import。

## 本地开发

```bash
npm install
npm run dev      # 表单提交会代理到 idf.json 里的 api,能真的交
```
