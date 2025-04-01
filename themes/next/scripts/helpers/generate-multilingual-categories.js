
'use strict';

hexo.extend.helper.register('generate_multilingual_categories', function() {
  const { config } = this;
  const { url_for } = require('hexo-util');
  const currentLang = this.page.lang || this.page.language || config.language[0];
  const defaultLang = config.language[0];

  // 获取当前语言的文章
  const posts = this.site.posts.filter(post => {
    const postLang = post.lang || post.language;
    if (currentLang === defaultLang) {
      return !postLang || postLang === currentLang;
    }
    return postLang === currentLang;
  });

  // 收集当前语言的分类
  const categories = new Set();
  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(cat => {
        categories.add(cat.name);
      });
    }
  });

  // 为每个分类生成页面
  const categoryPages = [];
  categories.forEach(categoryName => {
    const categoryPosts = posts.filter(post => {
      return post.categories.some(cat => cat.name === categoryName);
    });

    if (categoryPosts.length > 0) {
      const path = currentLang === defaultLang
        ? `categories/${categoryName}/index.html`
        : `${currentLang}/categories/${categoryName}/index.html`;

      categoryPages.push({
        path: path,
        layout: ['category', 'archive', 'index'],
        data: {
          category: categoryName,
          posts: categoryPosts,
          lang: currentLang,
          __: this.__.bind(this)
        }
      });
    }
  });

  return categoryPages;
});

// 在生成页面之前注册事件处理器
hexo.extend.generator.register('multilingual_categories', function(locals) {
  const helper = hexo.extend.helper.get('generate_multilingual_categories').bind({
    site: locals,
    page: {},
    config: hexo.config,
    __: hexo.theme.i18n.__(hexo.config.language[0])
  });
  
  return helper();
});