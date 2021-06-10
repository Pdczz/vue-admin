export default{
  getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop
  },
  getClientWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  // 获取元素距离Body的距离
  getPoint(ele) {
    var t = ele.offsetTop;
    let parent = ele.offsetParent
    if (parent.nodeName !== 'BODY') {
      t += this.getPoint(parent)
    }
    return t
  },
  show(ele, distance, action) {
    let scrollTop = this.getScrollTop()
    if (scrollTop >= distance) {
      ele.classList.add('animate__animated', action);
      ele.style.visibility = 'visible'
    }
  },
  text_about: 400 // 滚动条到500距离要动画显示text_about类
};
