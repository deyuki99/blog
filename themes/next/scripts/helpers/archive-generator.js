
'use strict';

const pagination = require('hexo-pagination');

hexo.extend.generator.register('multilingual_archive', function(locals) {
  const config = this.config;
  const perPage = config.archive_generator.per_page;
  const paginationDir = config.pagination_dir || 'page';
  const languages = [config.language[0]].concat(config.language.slice(1) || []);
  const defaultLang = config.language[0];
  let pages = [];

  // 为每种语言生成归档页面
  languages.forEach(lang => {
    // 获取该语言下的文章
    const posts = locals.posts.filter(post => {
      const postLang = post.lang || post.language;
      if (lang === defaultLang) {
        return !postLang || postLang === lang;
      }
      return postLang === lang;
    }).sort('-date');

    // 如果该语言下有文章，则生成对应的归档页面
    if (posts.length > 0) {
      const baseUrl = lang === defaultLang
        ? 'archives/'
        : `${lang}/archives/`;

      const data = {
        posts: posts,
        lang: lang,
        archive: true,
        __: hexo.theme.i18n.__(lang)
      };

      pages = pages.concat(pagination(baseUrl, posts, {
        perPage: perPage,
        layout: ['archive', 'index'],
        format: paginationDir + '/%d/',
        data: data
      }));

      // 生成年份归档页面
      const yearPosts = new Map();
      posts.forEach(post => {
        const year = post.date.year();
        if (!yearPosts.has(year)) {
          yearPosts.set(year, []);
        }
        yearPosts.get(year).push(post);
      });

      yearPosts.forEach((yearPostList, year) => {
        const yearBaseUrl = lang === defaultLang
          ? `archives/${year}/`
          : `${lang}/archives/${year}/`;

        const yearData = {
          posts: yearPostList,
          lang: lang,
          archive: true,
          year: year,
          __: hexo.theme.i18n.__(lang)
        };

        pages = pages.concat(pagination(yearBaseUrl, yearPostList, {
          perPage: perPage,
          layout: ['archive', 'index'],
          format: paginationDir + '/%d/',
          data: yearData
        }));
      });
    }
  });

  return pages;
});