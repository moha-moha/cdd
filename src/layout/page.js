const render = require('./page.art');
const data = {
  title: 'My Page',
};
const html = render(data);
console.log(html);

module.exports = render;