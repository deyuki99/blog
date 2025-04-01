
'use strict';

hexo.extend.helper.register('count_posts_by_lang', function() {
  const currentLang = this.page.lang || this.page.language || this.config.language;
  
  // 计算特定语言的文章数量
  const count = this.site.posts.filter(post => {
    const postLang = post.lang || post.language;
    return postLang === currentLang;
  }).length;

  return count;
});