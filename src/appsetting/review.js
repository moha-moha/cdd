const base = require('../common/base');
const page = require('../components/page');
const review = require('./review.art');

const option = {
  title: '知识店铺',
  subtitle: '店铺名称： 哈哥财富',
};

class reviewPage extends base{

  constructor() {
    super();
  }

  init () {
    page(option);
    this.render();
  }

  render(){
    $(this.container).append(review(option));
  }

}

new reviewPage();