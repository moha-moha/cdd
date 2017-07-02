const header = require('./header.art');
const nav = require('./leftnav.art');

module.exports = function(setting) {
  let $html = $('<div class="cdd-main">');
  $html.append(header(setting)).append(nav(setting));
  $('body').append($html);
};