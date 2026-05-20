# WORLD AI DIPLOMACY Demo

一个基于 `Vite + React + TypeScript + globe.gl + Three.js` 的全球外交策略游戏主界面原型。

项目目标是展示一个可拖拽、可缩放的 3D 地球，并在地球上叠加阵营区域、外交关系线、代表城市节点、事件涟漪和科幻 HUD 界面。

## 当前效果

- 黑色宇宙科技背景
- 可拖拽旋转、滚轮缩放的 3D 地球
- 真实地球夜景纹理、凹凸纹理、云层
- 自定义地球边缘 Rim Glow 和屏幕空间大气光晕
- 7 个全球阵营的国家区域覆盖
- 每个阵营保留 1 个代表城市节点
- 城市之间的外交关系弧线
- 左右 HUD 面板、顶部阶段栏、底部 AI 战略指令输入框
- 开发环境内置 `Earth Rim Debug` 调参面板

## 技术栈

- Vite
- React
- TypeScript
- globe.gl
- Three.js
- lil-gui

## 安装依赖

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

默认访问：

```text
http://localhost:5173/
```

## 构建

```bash
npm run build
```

## 项目结构

```text
src/
  App.tsx
  main.tsx
  components/
    globe/
      DiplomacyGlobe.tsx
      earthRim.ts
      globeArcStyle.ts
      globeCountryStyle.ts
      globeEffects.ts
    hud/
      TopBar.tsx
      LeftPanels.tsx
      RightPanels.tsx
      BottomCommandPanel.tsx
      FloatingToolBar.tsx
  data/
    capitals.ts
    demoCountryState.ts
    demoDiplomacyArcs.ts
    demoMarkers.ts
    factions.ts
  styles/
    app.css
    globe.css
    hud.css
  types/
    globe-gl.d.ts

public/
  data/
    countries.geojson
  textures/
    earth-night-4k.jpg
    earth-bump-4k.png
    earth-clouds-4k.png
```

## 阵营设定

当前 Demo 使用 7 个阵营：

- 中华联盟
- 北美-西方联盟
- 俄罗斯联盟
- 印度-南亚联盟
- 拉美-南美联盟
- 中东-伊斯兰联盟
- 非洲联盟

阵营国家映射位于：

```text
src/data/demoCountryState.ts
```

阵营颜色配置位于：

```text
src/data/factions.ts
```

## 地球视觉系统

地球渲染核心位于：

```text
src/components/globe/DiplomacyGlobe.tsx
```

额外视觉效果拆分为：

- `earthRim.ts`：地球边缘 Fresnel Rim Shader 和屏幕空间光晕同步
- `globeEffects.ts`：云层和太空灯光
- `globeArcStyle.ts`：外交弧线样式
- `globeCountryStyle.ts`：国家区域颜色、高度、tooltip

## 纹理资源

当前项目已经包含可运行的纹理资源：

```text
public/textures/earth-night-4k.jpg
public/textures/earth-bump-4k.png
public/textures/earth-clouds-4k.png
```

后续可以直接替换为更高质量的 4K 地球纹理，不需要修改代码路径。

## 后续扩展方向

- 接入真实国家/外交数据
- 使用 Zustand 管理游戏状态
- 将 `globe.gl` 封装为 `GlobeEngine`
- 后续迁移到 `three-globe` 或纯 Three.js
- 接入 AI 指令系统，解析玩家自然语言战略命令

