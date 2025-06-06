
'use strict';

hexo.extend.helper.register('filter_posts_by_lang', function(posts) {
  const currentLang = this.page.lang || this.page.language || this.config.language[0];
  const defaultLang = this.config.language[0];
  
  // 筛选具有相同语言的文章
  return posts.filter(post => {
    const postLang = post.lang || post.language;
    if (currentLang === defaultLang) {
      // 对于默认语言，显示未指定语言的文章和默认语言的文章
      return !postLang || postLang === currentLang;
    }
    // 对于其他语言，只显示该语言的文章
    return postLang === currentLang;
  }).sort('-date');
});