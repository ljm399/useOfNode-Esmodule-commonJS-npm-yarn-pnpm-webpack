# momorepo 工程管理

### 一. mutirepo vs monorepo

#### 对比

- **[mutirepo]**

  - **[结构]** 每个包一个独立仓库
  - **[优点]** 权限边界清晰、CI 更独立、仓库更轻
  - **[缺点]** 跨包改动需要多仓库同步、版本联动与依赖管理复杂

- **[monorepo]**
  - **[结构]** 多个包/应用在同一个仓库（统一依赖与工具链）
  - **[优点]** 跨包联调/重构方便、依赖一致性更好、可以统一 lint/test/build
  - **[缺点]** 仓库可能变大；需要工作区/任务编排/缓存等基础设施
- 上面两个仓库使用那个：看子包之间的关联性
  - 比如要是h5 和 移动端 用到的utils和hooks重复，就可以使用monorepo


### menorepo缺陷

- 难以控制使用者的权限

#### 常见目录结构示例

```
repo/
  package.json
  packages/
    utils/
    ui/
  apps/
    frontend/ --》前端的代码
    backend/  --> 后端代码
 
```

##### npm monorepo

#### 1) 开启 npm workspaces

根目录 `package.json`：

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "dev": "npm -ws run dev",
    "build": "npm -ws run build",
    "lint": "npm -ws run lint",
    "test": "npm -ws run test"
  }
}
```

#### 2) 常用命令

- **[安装依赖（根目录一次装全）]**

```bash
npm install
```

- **[在所有 workspace 里跑脚本]**

```bash
npm -ws run build
```

- **[只在某个包里跑脚本]**（`--workspace` 可简写 `-w`）

```bash
npm -w @my/utils run build
```

- **[给某个 workspace 安装依赖]**

```bash
npm -w @my/web install react
```

- **[在根目录安装开发依赖]**

```bash
npm install -D eslint prettier
```

#### 3) 子包 `package.json` 示例

`packages/utils/package.json`：

```json
{
  "name": "@my/utils",
  "version": "0.0.0",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "lint": "eslint ."
  }
}
```

#### 4) （可选）pnpm / yarn 的等价写法

- **[pnpm]**

```bash
pnpm -r run build
pnpm --filter @my/web dev
```

- **[yarn berry]**

```bash
yarn workspaces foreach -pt run build
yarn workspace @my/web dev
```





### 二。环境版本锁定

目标：避免“我这能跑你那不能跑”，锁定 Node 与包管理器版本。

#### 1.Node 版本

- **[.nvmrc]**

```text
18.20.4
```

- **[package.json engines]**

```json
{
  "engines": {
    "node": ">=18 <21"
  }
}
```

- **[Volta（推荐给团队统一）]** 根目录 `package.json`

```json
{
  "volta": {
    "node": "18.20.4",
    "npm": "10.8.2"
  }
}
```

#### 2.包管理器版本

- **[Corepack + packageManager 字段]**（Node 16.10+）

```json
{
  "packageManager": "pnpm@9.12.3"
}
```

启用 corepack：

```bash
corepack enable
```

### 三。typeScript

#### 推荐做法（根 tsconfig + 各包继承）

根目录 `tsconfig.base.json`：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

子包 `packages/utils/tsconfig.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

#### （可选）项目引用（Project References）

适合需要 `tsc -b` 增量构建的仓库：

根目录 `tsconfig.json`：

```json
{
  "files": [],
  "references": [{ "path": "packages/utils" }, { "path": "packages/ui" }]
}
```

### 四。代码风格和质量检查

建议把配置放到根目录，统一规则，子包只跑同一套工具。

##### 1.prettier

###### 安装

```bash
npm install -D prettier
```

根目录 `.prettierrc`：

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100
}
```

根目录 `package.json scripts`：

```json
{
  "scripts": {
    "format": "prettier . --write",
    "format:check": "prettier . --check"
  }
}
```

##### 2.Eslint

###### 安装（TS + 常见组合）

```bash
npm install -D eslint @eslint/js typescript typescript-eslint
```

根目录 `eslint.config.js`（扁平化配置示例）：

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["**/dist/**", "**/.turbo/**", "**/node_modules/**"],
  },
];
```

根目录 `package.json scripts`：

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

##### 3.拼写检查

- 作用防止你打错字，比如main 打成 mian
- 你要自己设置好词库，然后项目定义时用到的变量名必须存在于词库中

###### cspell

```bash
npm install -D cspell
```

根目录 `cspell.json`：

```json
{
  "version": "0.2",
  "language": "en,zh",
  "ignorePaths": ["**/node_modules/**", "**/dist/**", "**/coverage/**"]
}
```

根目录 `package.json scripts`：

```json
{
  "scripts": {
    "spellcheck": "cspell ."
  }
}
```

### 五。git 提交规范

目标：统一 commit message，配合 CI 做 changelog / 发版。

#### commitizen

##### 安装（conventional commits）

```bash
npm install -D commitizen cz-conventional-changelog
```

##### 这个还需要配置个文件，作用就是更好的辅助你commit所用到的message，比如本来是英文的 变为了中文

- 文件路径导入就是下面path的值

根目录 `package.json`：

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

使用：

```bash
npm run commit
```

#### husky

##### 安装与初始化

```bash
npm install -D husky
npx husky init
```

（初始化后会生成 `.husky/pre-commit`，你可以在里面调用 `lint-staged`）

示例：`.husky/pre-commit`

```sh
npx lint-staged
```

（可选）commit-msg 校验 conventional commits：

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

`commitlint.config.cjs`：

```js
module.exports = { extends: ["@commitlint/config-conventional"] };
```

添加 hook：

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

##### lint-staged

- 作用是 js,ts,tsx后缀文件用 prettier ，否则就是 eslint 

##### 安装与配置

```bash
npm install -D lint-staged
```

根目录 `package.json`：

```json
{
  "lint-staged": {
    "**/*.{js,ts,tsx,jsx,json,css,md}": ["prettier --write"],
    "**/*.{js,ts,tsx,jsx}": ["eslint --fix"]
  }
}
```





#### 公共库打包

常见诉求：把 `packages/*` 里的库打成 `cjs+esm+dts`，供 `apps/*` 使用。

##### 使用 tsup（简单好用）

```bash
npm install -D tsup
```

子包 `packages/utils/package.json`（与上面保持一致）：

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  }
}
```

##### 发布前的入口字段（建议）

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "require": "./dist/index.cjs",
      "import": "./dist/index.js"
    }
  }
}
```





#### 子包间依赖

#### workspace 依赖引用（monorepo 内推荐）

在 `apps/web/package.json` 里依赖内部包：

```json
{
  "dependencies": {
    "@my/utils": "workspace:*"
  }
}
```

#### 安装/添加依赖命令

- **[npm workspace]**

```bash
npm -w @my/web install @my/utils
```

- **[pnpm workspace（更常用）]**

```bash
pnpm --filter @my/web add @my/utils
pnpm --filter @my/web add lodash
```

#### 跨包执行脚本

- **[npm]**

```bash
npm -ws run build
```

- **[pnpm]**

```bash
pnpm -r run build
pnpm --filter @my/web... run build
```

- **[turbo（可选：任务编排 + 缓存）]**

```bash
npm install -D turbo
```

根目录 `turbo.json`：

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {},
    "test": {}
  }
}
```

根目录脚本：

```json
{
  "scripts": {
    "build": "turbo run build",
    "lint": "turbo run lint"
  }
}
```





# tailwallcss -- 运行在编译阶段

### 历史困难：

- css的编写都会出现大量重复，然后之后想修改都不是直接修改源码因为这是别人的代码，所以不断垒代码上去故成为坨屎山
- vue的开发，css、html是分开的，查看代码需要css、html来回滚动甚至开发时还需要切换另一个文件，影响开发心流
  - 故不符合 共置（colocation） 解释就是 css和html应该想注释和对应代码一样应该放在一起，方便阅读
- 同一套css导入到react和vue，需要下载新的样式工具才能展示，甚至可能出现导入不成功
- css的名字都需要自己想，而tailwallcss固定好了对应名称

### 而tailwallcss可以解决上面的问题

### tailwallcss的局限

- 由于样式名都在标签的className中，故影响对html阅读--- 当你不想看css时
- 合并在一起，观看不友好



#### 安装（以某个 app 为例）

```bash
npm -w @my/web install -D tailwindcss postcss autoprefixer
```

初始化（在对应 workspace 目录下执行更直观）：

```bash
npx tailwindcss init -p
```



#### 记得要安装个插件，自己去找

作用：更好的提示，便捷实用





#### `tailwind.config.js` 示例

monorepo 关键点：`content` 要包含依赖的内部包源码路径。

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### 引入 Tailwind 指令

在 app 的入口 CSS（如 `src/index.css`）：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 使用简介

- 使用一：
  - 标签中使用，然后找到对应css名称比如 <div className="absoult"   
- 使用二：自定义样式
  1. index.css -----》或其他放置全局的样式的文件中
  2. @theme{ 里面放主题样式如 --theme-color-1：xx，--theme-color-2：xx}
  3. @utility{ 自己定义名称-*：background-color：--value（--theme-color- *）} 这里的 * 作用是占位符的作用，他是1还是2看你导入的是什么，作用类似泛型或参数传参
