---
name: chinese-translator
description: 当用户发送中文消息时，自动将其翻译成英文，用英文回复。可以选择将回复再翻译回中文。
---

# Chinese Translator

## Overview

This skill automatically translates Chinese messages to English, responds in English, and optionally translates the response back to Chinese.

## Behavior Rules

- When user sends a message in Chinese (contains Chinese characters), automatically translate to English first
- Process and answer the question in English
- Optionally translate the response back to Chinese for the user
- If the message is already in English, respond normally in English

## Translation Flow

```
用户中文 → 翻译成英文 → 用英文思考/回答 → (可选)翻译回中文 → 返回给用户
```

## Implementation

This skill uses the following translation approach:

1. **Detect Chinese**: Check if the message contains Chinese characters (Unicode range \u4e00-\u9fff)
2. **Translate to English**: Use translation to convert Chinese to English
3. **Process in English**: Think and respond in English
4. **Optional Chinese Response**: Translate the final response back to Chinese

## Example

**User (Chinese)**: "你好，我想学习编程"
↓
**Translated (English)**: "Hello, I want to learn programming"
↓
**Response (English)**: "Great! What programming language would you like to start with? I recommend Python for beginners because..."
↓
**Final Response (Chinese)**: "太好了！你想从哪种编程语言开始？我推荐 Python，因为它是初学者的最佳选择..."

## When to Use

Use this skill when:
- User sends messages in Chinese
- User wants to practice English while getting help in Chinese
- User explicitly requests translation

## Notes

- If user explicitly asks for Chinese response (说中文), respect their preference
- Keep the original intent and nuance of the user's message
- Be helpful in both languages
