
'use strict';

hexo.extend.helper.register('custom_lang_url', function(lang) {
  const { config } = this;
  const { url_for } = require('hexo-util');
  const currentPath = this.path;
  const defaultLang = config.language[0] || 'zh-CN';
  const currentLang = this.page.lang || defaultLang;
  
  // 如果当前在默认语言页面
  if (currentLang === defaultLang) {
    if (lang === defaultLang) {
      return url_for.call(this, currentPath);
    }
    return url_for.call(this, `/${lang}/${currentPath}`);
  }
  
  // 如果当前在其他语言页面
  const pathWithoutLang = currentPath.replace(new RegExp(`^${currentLang}/`), '');
  if (lang === defaultLang) {
    return url_for.call(this, pathWithoutLang);
  }
  return url_for.call(this, `/${lang}/${pathWithoutLang}`);
});