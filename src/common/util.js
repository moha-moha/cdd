require('../../mock/appsetting');
/**
 * promise 风格的请求方式
 * @param {string} url - 获取远程调用ajax接口url
 * @param {object|array} param - 请求接口入参
 * @param {boolean} isShowLoading - 是否展现小菊花
 * @param {boolean} isDefaultErrorHandler - 是否开启默认错误展现机制
 * @return {promise} 返回请求状态机
 */
const getData = function(url, param, fetchSuccess, fetchError, isShowLoading = true) {
  return $.ajax({
    url,
    type:'POST',
    data: param || {},
    success: function(res){
      fetchSuccess(parseJSON(res));
    },
    error: fetchError,
    beforeSend: () => {
      if (isShowLoading) {
        showLoading();
      }
    },
    complete: () => {
      if (isShowLoading) {
        hideLoading();
      }
    },
    // 手动终止后的回调处理
    abortHandler: () => {
      if (isShowLoading) {
        hideLoading();
      }
    },
  });
};

function fetch(url, param, isShowLoading, isDefaultErrorHandler) {
  return new Promise(function(resolve, reject) {
    getData(url, param, resolve, function(err) {
      if (err.followAction) {
        // 专门处理 followAction 逻辑
        const followAction = parseJSON(err.followAction);
        handleFollowAction(followAction);
      }
      err.url = url;
      // 如果默认处理方式，需要添加 button 参数
      err.button = '再试一次';
      reject(err);
      return isDefaultErrorHandler;
    }, isShowLoading);
    
  });
}

function handleFollowAction({ extInfo, triggerType, type }) {
  if (triggerType === 'auto' && type === 'link') {
    extInfo && window.location.href(extInfo.url);
  }

  if (type === 'alert' && extInfo) {
    if (extInfo.subBtnText) {
     // TODO confirm
    } else {
     // TODO alert 
    }
  }
}

// 解析服务端下发 json 数据处理模式
function parseJSON(metaData) {
  try {
    metaData = JSON.parse(metaData);
  } catch (err) {
    console.error('parse component data fail.', err, metaData);
    metaData = {};
  }
  return metaData;
}

function showLoading (el) {
  el = el || 'body';
  $(el).block({
    message: '<img src="../lib/img/loaders/12.gif" align="absmiddle">',
    css: {
      border: 'none',
      padding: '2px',
      backgroundColor: 'none',
    },
    overlayCSS: {
      backgroundColor: '#000',
      opacity: 0.05,
      cursor: 'wait',
    },
  });
}
function hideLoading(el) {
  el = el || 'body';
  $(el).unblock({
    onUnblock: function () {
      $(el).removeAttr('style');
    },
  });
}


module.exports = {
  // 标准数据返回接口
  request: fetch,
  // 非标准接口，不建议使用
  getData,
};