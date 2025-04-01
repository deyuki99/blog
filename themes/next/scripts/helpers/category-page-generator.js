
'use strict';

hexo.extend.generator.register('multilingual_category_index', function(locals) {
  const config = this.config;
  const languages = [config.language[0]].concat(config.language.slice(1) || []);
  const pages = [];

  // 为每种语言生成分类索引页
  languages.forEach(lang => {
    // 获取该语言下的所有文章
    const posts = locals.posts.filter(post => {
      const postLang = post.lang || post.language;
      if (lang === config.language[0]) {
        return !postLang || postLang === lang;
      }
      return postLang === lang;
    });

    // 如果该语言下有文章，则生成分类索引页
    if (posts.length > 0) {
      const data = {
        layout: ['category-index', 'archive', 'index'],
        lang: lang,
        posts: posts,
        site: locals,
        path: lang === config.language[0] 
          ? 'categories/index.html'
          : `${lang}/categories/index.html`
      };

      pages.push({
        path: data.path,
        layout: data.layout,
        data: data
      });
    }
  });

  return pages;
});