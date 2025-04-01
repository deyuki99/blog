---
title: Welcome | 欢迎 | ようこそ | 歡迎
date: 2025-03-30
---

<script>
var lang = navigator.language || navigator.userLanguage;
lang = lang.toLowerCase();

var redirectMap = {
  'zh-cn': '/zh-CN/',
  'zh-tw': '/zh-TW/',
  'ja': '/ja/',
  'en': '/en/'
};

var defaultLang = 'zh-CN';
var targetPath = redirectMap[lang] || redirectMap[lang.split('-')[0]] || '/' + defaultLang + '/';
window.location.href = targetPath;
</script>

Redirecting... | 跳转中... | リダイレクト中... | 跳轉中...