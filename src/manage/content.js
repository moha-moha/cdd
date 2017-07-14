require('./content.css');
const Base = require('../common/base');
const page = require('../components/page');
const content = require('./content.art');
// const { request } = require('../common/util');

const option = {
  title: '商品管理',
  subtitle: '哈哥财富',
};

class Manage extends Base{

  constructor() {
    super();
  }

  init () {
    page(option);
    this.render();
  }
  render(){
    $(this.container).append(content());
    $('.J-fee').on('switch-change', function (e, data) {
      const $amount = $('.J-amount'), value = data.value;
      if (value) {
        $amount.removeClass('hidden');
      }
      else {
        $amount.addClass('hidden');
      }
    });
  }
}

new Manage();