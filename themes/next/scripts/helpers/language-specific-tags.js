
'use strict';

hexo.extend.helper.register('language_specific_tagcloud', function(options = {}) {
  const currentLang = this.page.lang || this.page.language || this.config.language;
  
  // 筛选具有相同语言的文章
  const posts = this.site.posts.filter(post => {
    const postLang = post.lang || post.language;
    return postLang === currentLang;
  });

  // 从筛选后的文章中收集标签
  const tags = new Map();
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        const count = tags.get(tag.name) || 0;
        tags.set(tag.name, count + 1);
      });
    }
  });

  // 转换为标签云需要的格式
  const tagArr = Array.from(tags).map(([name, count]) => ({
    name,
    path: this.url_for(this.config.tag_dir + '/' + name),
    length: count
  }));

  // 排序标签
  const orderby = options.orderby || 'name';
  const order = options.order || 1;
  
  tagArr.sort((a, b) => {
    let result = 0;
    if (orderby === 'random') {
      result = Math.random() - 0.5;
    } else {
      if (orderby === 'name') {
        result = a.name.localeCompare(b.name);
      } else if (orderby === 'length') {
        result = a.length - b.length;
      }
      result = order * result;
    }
    return result;
  });

  // 计算字体大小
  const minSize = options.min_font || 10;
  const maxSize = options.max_font || 20;
  const sizeSpan = maxSize - minSize;
  
  if (tagArr.length > 0) {
    const maxCount = Math.max(...tagArr.map(tag => tag.length));
    const minCount = Math.min(...tagArr.map(tag => tag.length));
    const countSpan = maxCount - minCount;

    tagArr.forEach(tag => {
      const size = countSpan === 0 
        ? minSize 
        : minSize + (tag.length - minCount) * sizeSpan / countSpan;
      tag.size = size;
    });
  }

  // 生成HTML
  const className = options.class || 'tag-cloud';
  let html = `<div class="${className}-tags">`;
  
  tagArr.forEach(tag => {
    html += `<a href="${tag.path}" style="font-size: ${tag.size}px;">${tag.name}</a>`;
  });
  
  html += '</div>';
  return html;
});