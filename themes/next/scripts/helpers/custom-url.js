
'use strict';

const { parse } = require('url');

hexo.extend.helper.register('custom_url_for', function(path) {
  const { config } = this;
  const { url_for } = require('hexo-util');
  const lang = this.page.lang || '';
  const defaultLang = config.language[0] || 'zh-CN';
  
  // 如果是默认语言，使用原始路径
  if (!lang || lang === defaultLang) {
    return url_for.call(this, path);
  }
  
  // 对于其他语言，在路径前添加语言前缀
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.startsWith('/' + lang + '/')) {
    path = '/' + lang + path;
  }
  
  return url_for.call(this, path);
});