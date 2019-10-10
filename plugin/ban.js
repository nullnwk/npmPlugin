// 禁用右键
document.oncontextmenu = function () {
  return false;
};
document.onselectstart = function () {
  return false;
};
// 禁用键盘按键
document.onkeydown = function () {
  if (event.ctrlKey) {
    return false;
  }
  if (event.altKey) {
    return false;
  }
  if (event.shiftKey) {
    return false;
  }
  if (event.key == "F12") {
    return false;
  }
};
!(function () {
  if (
    window.outerHeight - window.innerHeight > 200 ||
    window.outerWidth - window.innerWidth > 200
  ) {
    //判断当前窗口内页高度和窗口高度，如果差值大于200，那么呵呵
    alert("请关掉检查");
    window.close(); //关闭当前窗口(防抽)
    window.location = "about:blank"; //将当前窗口跳转置空白页
  }
})();
!(function () {
  const handler = setInterval(() => {
    const before = new Date();
    debugger;
    const after = new Date();
    const cost = after.getTime() - before.getTime();
    if (cost > 100) {
      alert("请关掉检查");
      window.close(); //关闭当前窗口(防抽)
      window.location = "about:blank"; //将当前窗口跳转置空白页
      clearInterval(handler);
    }
  }, 1000);
})();