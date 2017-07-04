const Mock = require('mockjs');


Mock.mock('preview', {
  'success|1': 'true',
  result:{
    storeName:'哈哥财富',
    storeUrl: 'https://h5.icaidd.com/app/@string("lower", 5)',
  },
});

Mock.setup({
  timeout: 400,
});
