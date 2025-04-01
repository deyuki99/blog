
'use strict';

hexo.extend.helper.register('filter_posts_by_lang', function(posts) {
  const currentLang = this.page.lang || this.page.language || this.config.language;
  
  // 筛选具有相同语言的文章
  return posts.filter(post => {
    const postLang = post.lang || post.language;
    return postLang === currentLang;
  });
});