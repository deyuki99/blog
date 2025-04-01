
'use strict';

hexo.extend.helper.register('i18n_path', function(language) {
  const { config } = this;
  const { url_for } = require('hexo-util');
  const defaultLang = config.language[0] || 'zh-CN';
  const currentPath = this.path;
  
  // 如果当前路径已经包含语言前缀，移除它
  const langPrefixPattern = new RegExp(`^(${config.language.join('|')})/`);
  const pathWithoutLang = currentPath.replace(langPrefixPattern, '');
  
  // 如果是默认语言，直接返回无语言前缀的路径
  if (language === defaultLang) {
    return url_for.call(this, pathWithoutLang);
  }
  
  // 对于其他语言，添加语言前缀
  return url_for.call(this, `/${language}/${pathWithoutLang}`);
});