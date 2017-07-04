require('../../mock/appsetting');

module.exports = {
  // TODO 准备二次封装,格式化参数与容错处理
  request: function(url,data,callback){
    $.ajax({
      type: 'POST',
      url: url ,
      data: data ,
      success: callback ,
      dataType: 'json',
    });
  },
};