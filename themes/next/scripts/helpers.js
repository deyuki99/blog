
'use strict';

hexo.extend.helper.register('language_name', function(lang) {
  const languages = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'ja': '日本語'
  };
  return languages[lang] || lang;
});

hexo.extend.helper.register('i18n_path', function(lang) {
  const { path } = this.page;
  const { config } = this;
  const base = config.root || '/';
  const defaultLang = config.language[0] || 'zh-CN';
  
  if (lang === defaultLang) return base + path;
  return base + lang + '/' + path;
});