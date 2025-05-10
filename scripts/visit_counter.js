const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('before_generate', function() {
  const countFile = path.join(hexo.source_dir, '_data/visit_count.json');
  
  // 确保文件存在
  if (!fs.existsSync(countFile)) {
    fs.writeFileSync(countFile, JSON.stringify({count: 0}, null, 2));
  }
  
  // 读取当前计数
  const data = JSON.parse(fs.readFileSync(countFile));
  
  // 在生成前注入全局变量
  hexo.locals.set('visit_count', data.count);
});