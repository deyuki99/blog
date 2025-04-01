
'use strict';

const pagination = require('hexo-pagination');

hexo.extend.generator.register('multilingual_category', function(locals) {
  const config = this.config;
  const perPage = config.category_generator.per_page;
  const paginationDir = config.pagination_dir || 'page';
  const languages = [config.language[0]].concat(config.language.slice(1) || []);
  const defaultLang = config.language[0];
  let pages = [];

  // 为每个分类生成对应语言的页面
  locals.categories.forEach(category => {
    languages.forEach(lang => {
      // 获取该语言下的文章
      const posts = category.posts.filter(post => {
        const postLang = post.lang || post.language;
        if (lang === defaultLang) {
          return !postLang || postLang === lang;
        }
        return postLang === lang;
      }).sort('-date');

      // 如果该语言下有文章，则生成对应的分类页面
      if (posts.length > 0) {
        const baseUrl = lang === defaultLang
          ? `categories/${category.name}/`
          : `${lang}/categories/${category.name}/`;

        const data = {
          category: category.name,
          posts: posts,
          lang: lang,
          __: hexo.theme.i18n.__(lang)
        };

        pages = pages.concat(pagination(baseUrl, posts, {
          perPage: perPage,
          layout: ['category', 'archive', 'index'],
          format: paginationDir + '/%d/',
          data: data
        }));
      }
    });
  });

  return pages;
});