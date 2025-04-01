
'use strict';

hexo.extend.helper.register('count_posts_by_lang', function() {
  const currentLang = this.page.lang || this.page.language || this.config.language[0];
  const defaultLang = this.config.language[0];
  
  // 计算特定语言的文章数量
  const count = this.site.posts.filter(post => {
    const postLang = post.lang || post.language;
    if (currentLang === defaultLang) {
      // 对于默认语言，计算未指定语言的文章和默认语言的文章
      return !postLang || postLang === currentLang;
    }
    // 对于其他语言，只计算该语言的文章
    return postLang === currentLang;
  }).length;

  return count;
});