require('./preview.css');
const base = require('../common/base');
const page = require('../components/page');
const review = require('./preview.art');
const { request } = require('../common/util');
const QRcode = require('arale-qrcode');
const Clipboard = require('clipboard');

const option = {
  title: '知识店铺',
  subtitle: '哈哥财富',
};

class previewPage extends base{

  constructor() {
    super();
  }

  init () {
    page(option);
    this.render();
    
  }

  copy(){
    $('#copy').on('click', () => {
			//Set theme
      const Messenger = window.Messenger;
      Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top',
        theme: 'flat',
      };
      new Clipboard('#copy');
			//Call
      Messenger().post({
        message: '复制成功，请在微信内打开',
        showCloseButton: true,
      });
      setTimeout(function(){
        Messenger().hideAll();
      }, 3000);
    });
  }

  uploadfile(){

  }

  render(){
    request('preview', {}).then(res =>{
      if(res.success){
        const qrcode = new QRcode({
          text: res.result.storeUrl,
          size: 200,
        });
        $(this.container).append(review(res.result));
        $(this.container).find('#qrcode').append(qrcode);
        this.copy();
        this.uploadfile();
      }
    });   
  }

}

new previewPage();