---
name: chinese-translator
description: 当用户发送中文消息时，先将中文翻译成英文，然后用中英文双语回复。
---

# Chinese Translator

## Overview

This skill translates Chinese messages to English and responds in both Chinese and English (bilingual).

## Behavior Rules

当用户发送中文消息时：

1. **先显示翻译**：在回复最前面展示中文翻译成英文的结果
2. **双语回复**：下面的回复同时用中文和英文显示

## Response Format

```
中文原文：<用户的中文消息>

English Translation: <翻译成英文的消息>

<中文回复>

<English reply>
```

## How It Works

1. **检测中文**：检查消息是否包含中文字符 (Unicode \u4e00-\u9fff)
2. **翻译显示**：将中文翻译成英文并显示在最前面
3. **双语回复**：后续回复同时用中文和英文显示

## Example

**User**: 你好，今天天气怎么样

**Response**:
```
中文原文：你好，今天天气怎么样

English Translation: Hello, how is the weather today?

你好！这取决于你所在的位置。你能告诉我你在哪个城市吗？我可以帮你查询当前的天气情况！

Hello! The weather depends on your location. Could you tell me which city you're in? I can help you check the current weather conditions!
```

## Notes

- 如果用户明确要求只用一种语言回复，则尊重用户选择
- 保持原文的核心意思和语气
- 中文回复和英文回复之间用空行分隔
