
'use strict';

hexo.extend.helper.register('custom_post_url', function(post) {
  const { config } = this;
  const { url_for } = require('hexo-util');
  
  // 获取文章路径
  let path = post.path;
  
  // 如果路径已经包含语言标识（如 .en, .ja 等），则不需要添加语言前缀
  const langPattern = /\.(zh-CN|zh-TW|en|ja)$/;
  if (langPattern.test(post.slug)) {
    // 移除可能存在的语言前缀
    path = path.replace(/^(zh-CN|zh-TW|en|ja)\//, '');
  }
  
  return url_for.call(this, path);
});