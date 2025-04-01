
'use strict';

hexo.extend.helper.register('language_specific_categories', function(options = {}) {
  const currentLang = this.page.lang || this.page.language || this.config.language[0];
  const defaultLang = this.config.language[0];
  
  // 筛选具有相同语言的文章
  const posts = this.site.posts.filter(post => {
    const postLang = post.lang || post.language;
    if (currentLang === defaultLang) {
      return !postLang || postLang === currentLang;
    }
    return postLang === currentLang;
  });

  // 从筛选后的文章中收集类别
  const categories = new Map();
  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(category => {
        if (!categories.has(category.name)) {
          // 构建分类路径
          const categoryPath = `categories/${category.name}`;
          
          categories.set(category.name, {
            name: category.name,
            path: this.custom_url_for(categoryPath),
            posts: [],
            length: 0
          });
        }
        categories.get(category.name).posts.push(post);
        categories.get(category.name).length++;
      });
    }
  });

  // 转换为数组并排序
  const categoryArr = Array.from(categories.values());
  const orderby = options.orderby || 'name';
  const order = options.order || 1;
  
  categoryArr.sort((a, b) => {
    let result = 0;
    if (orderby === 'random') {
      result = Math.random() - 0.5;
    } else if (orderby === 'name') {
      result = a.name.localeCompare(b.name);
    } else if (orderby === 'length') {
      result = a.length - b.length;
    }
    return order * result;
  });

  // 生成HTML
  const className = options.class || 'category-list';
  const showCount = options.show_count !== false;
  let html = `<ul class="${className}">`;
  
  categoryArr.forEach(category => {
    html += `<li class="${className}-item">`;
    html += `<a class="${className}-link" href="${category.path}">`;
    html += category.name;
    if (showCount) {
      html += `<span class="${className}-count">${category.length}</span>`;
    }
    html += '</a></li>';
  });
  
  html += '</ul>';
  return html;
});