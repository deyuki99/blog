
'use strict';

const { parse } = require('url');

hexo.extend.helper.register('custom_url_for', function(path) {
  const { config } = this;
  const { url_for } = require('hexo-util');
  const lang = this.page.lang || '';
  const defaultLang = config.language[0] || 'zh-CN';
  
  // 如果路径为空或是外部链接，直接返回
  if (!path || /^(http|https|ftp|\/\/)/.test(path)) {
    return url_for.call(this, path);
  }

  // 确保路径以/开头
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // 如果是默认语言，使用原始路径
  if (!lang || lang === defaultLang) {
    return url_for.call(this, path);
  }

  // 检查路径是否已经包含语言前缀
  if (path.startsWith('/' + lang + '/')) {
    return url_for.call(this, path);
  }

  // 确保路径以/开头
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // 如果是默认语言或没有指定语言，直接返回原始路径
  if (!lang || lang === defaultLang) {
    return url_for.call(this, path);
  }

  // 处理归档路径
  if (path.startsWith('/archives/')) {
    const archivePath = path.substring('/archives/'.length);
    return url_for.call(this, `/${lang}/archives/${archivePath}`);
  }

  // 处理其他特殊路径（恢复原始顺序）
  const specialPaths = ['categories', 'tags', 'about'];
  for (const specialPath of specialPaths) {
    if (path.startsWith('/' + specialPath + '/')) {
      return url_for.call(this, '/' + lang + path);
    }
  }

  // 对于其他路径，添加语言前缀
  return url_for.call(this, '/' + lang + path);
});