---
name: chinese-translator
description: 当用户发送中文消息时，先将中文翻译成英文显示，然后用英文回复。
---

# Chinese Translator

## Overview

This skill translates Chinese messages to English and responds in English.

## Behavior Rules

当用户发送中文消息时：

1. **先显示翻译**：在回复中先展示中文翻译成英文的结果
2. **用英文回复**：基于翻译后的英文内容，用英文回答用户问题

## Response Format

```
中文原文：我想要学习编程

English Translation: I want to learn programming

[用英文回复...]
```

## How It Works

1. **检测中文**：检查消息是否包含中文字符 (Unicode \u4e00-\u9fff)
2. **翻译显示**：将中文翻译成英文并显示给用户
3. **英文回复**：用英文回答用户的问题

## Example

**User**: 你好，我想学习编程

**Response**:
```
中文原文：你好，我想学习编程

English Translation: Hello, I want to learn programming

Hello! That's great to hear. Programming is a valuable skill. What would you like to build? I recommend starting with Python as it's beginner-friendly...
```

## Notes

- 如果用户明确要求用中文回复（说中文），则尊重用户选择
- 保持原文的核心意思和语气
- 翻译结果用斜体或引用格式显示，与正文区分
