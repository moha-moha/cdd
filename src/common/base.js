module.exports = class base {
  constructor(...opt) {
    this.container = opt.container || '#cdd-container';
    this.init();
  }
};