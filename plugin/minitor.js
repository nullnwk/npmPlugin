import Vue from "vue";
var color = "font-size:14px;color:red;";
var color1 = "font-size:16px;color:red;background:#ef7070";

// 错误信息打印
Vue.config.errorHandler = function (err, vm, info) {
  // console.log(err, "------", vm, "------", info);

  let path = vm.$route.path;
  let msg = err; //错误内容
  let errCycle = info; //出错的生命周期

  console.log("%c---------------------------------------------", color1);
  console.log("%c文件路径：" + path, color);
  console.log("%c错误生命周期：" + errCycle, color);
  console.log("%c错误详情：" + msg, color);
  console.log(err);
  userInfo();
  console.log("%c---------------------------------------------", color1);

  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
};
window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault();
  console.log("%c---------------------------------------------", color1);
  console.log("%cpromise报错", color);
  console.log("%c文件路径：" + location.hash, color);
  console.log("%c错误详情：" + e.reason, color);
  userInfo();
  monitor.userClickInfo(e);
  console.log("%c---------------------------------------------", color1);
  return true;
});
// 静态资源错误
window.addEventListener(
  "error",
  error => {
    let obj = {
      path: location.hash,
      resource: error.path[0]
    };
    console.log(error, "error");

    console.log("%c---------------------------------------------", color1);
    console.log("%c静态文件报错", color);
    console.log("%c错误路径：" + location.hash, color);
    console.log("%c错误资源：", color, error.path[0]);
    userInfo();
    console.log("%c---------------------------------------------", color1);
  },
  true
);

// 网站加载
(function () {
  window.onload = function () {
    var t = performance.timing;
    var times = {};
    var timer = setInterval(() => {
      if (performance.timing.loadEventEnd > 0) {
        clearInterval(timer);
        //【重要】页面加载完成的时间
        //【原因】这几乎代表了用户等待页面可用的时间
        times.loadPage = t.loadEventEnd - t.navigationStart;
        //【重要】解析 DOM 树结构的时间
        //【原因】反省下你的 DOM 树嵌套是不是太多了！
        times.domReady = t.domComplete - t.domInteractive;
        // 白屏时间
        times.loadWrite = t.responseStart - t.navigationStart;

        console.log(times, "网站加载信息");
      }
    }, 50);
  };
})();

// 用户信息
function userInfo() {
  let ua = navigator.userAgent.toLowerCase();
  let strStart = ""; //截取浏览器和版本号
  let strStop = ""; //截取浏览器和版本号
  let temp = ""; //截取浏览器和版本号
  let browser = {
    name: "", //浏览器
    os: "", //iPhone版本号
    version: "", //版本号
    clientWidth: "", //浏览器宽度
    clientHeight: "", //浏览器高度
    ip: returnCitySN["cip"],
    address: returnCitySN["cname"]
  };

  let osStart = ""; //获取手机版本
  let osStop = ""; //获取手机版本
  let temp1 = ""; //获取手机版本

  // 判断打开的设备
  if (/android|webos|iphone|ipad|blackberry|micromessenger/i.test(ua)) {
    // alert("手机端");
    if (
      ua.indexOf("android") > -1 ||
      ua.indexOf("linux") > -1 ||
      ua.indexOf("adr") > -1
    ) {
      temp = ["android", "未知"];
      // 手机版本获取
      osStart = ua.indexOf("android") + 8;
      osStop = ua.indexOf(")");
      temp1 = ua.substring(osStart, osStop).split(";")[0];
      browser.os = temp1; //系统版本
    } else if (ua.indexOf("iphone") > -1) {
      //根据尺寸进行判断 苹果的型号
      if (screen.height == 812 && screen.width == 375) {
        strStart = ua.indexOf("version");
        strStop = ua.indexOf(" mobile");
        temp = ua.substring(strStart, strStop).split("/");
        temp[0] = "iphoneX";
        // 手机版本获取
        osStart = ua.indexOf("os") + 3;
        osStop = ua.indexOf(" like");
        temp1 = ua.substring(osStart, osStop);
      } else if (screen.height == 736 && screen.width == 414) {
        strStart = ua.indexOf("version");
        strStop = ua.indexOf(" mobile");
        temp = ua.substring(strStart, strStop).split("/");
        temp[0] = "iPhone6P-iPhone7P-iPhone8P";
        // 手机版本获取
        osStart = ua.indexOf("os") + 3;
        osStop = ua.indexOf(" like");
        temp1 = ua.substring(osStart, osStop);
      } else if (screen.height == 667 && screen.width == 375) {
        strStart = ua.indexOf("version");
        strStop = ua.indexOf(" mobile");
        temp = ua.substring(strStart, strStop).split("/");
        temp[0] = "iPhone6-iPhone7-iPhone8";
        // 手机版本获取
        osStart = ua.indexOf("os") + 3;
        osStop = ua.indexOf(" like");
        temp1 = ua.substring(osStart, osStop);
      } else if (screen.height == 568 && screen.width == 320) {
        strStart = ua.indexOf("version");
        strStop = ua.indexOf(" mobile");
        temp = ua.substring(strStart, strStop).split("/");
        temp[0] = "iPhone5";
        // 手机版本获取
        osStart = ua.indexOf("os") + 3;
        osStop = ua.indexOf(" like");
        temp1 = ua.substring(osStart, osStop);
      }
      browser.os = temp1; //系统版本
    } else if (ua.indexOf("ipad") > -1) {
      strStart = ua.indexOf("version");
      strStop = ua.indexOf(" mobile");
      temp = ua.substring(strStart, strStop).split("/");
      temp[0] = "平板";
      // 手机版本获取
      osStart = ua.indexOf("os") + 3;
      osStop = ua.indexOf(" like");
      temp1 = ua.substring(osStart, osStop);
      browser.os = temp1; //系统版本
    } else if (ua.indexOf("windows phone") > -1) {
      console.log("诺基亚手机");
    }
  } else {
    // alert("电脑端");
    //Chrome浏览器
    if (ua.indexOf("chrome") > -1) {
      /*broName = 'Chrome浏览器';*/
      strStart = ua.indexOf("chrome");
      strStop = ua.indexOf(" safari");
      temp = ua.substring(strStart, strStop).split("/");
    } else if (ua.indexOf("firefox") > -1) {
      strStart = ua.indexOf("firefox");
      temp = ua.substring(strStart).split("/");
    } else if (ua.indexOf("edge") > -1) {
      strStart = ua.indexOf("edge");
      temp = ua.substring(strStart).split("/");
    } else if (ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0) {
      strStart = ua.indexOf("version");
      strStop = ua.indexOf(" safari");
      temp = ua.substring(strStart, strStop).split("/");
      temp[0] = "safari";
      // 版本获取
      osStart = ua.indexOf("os ") + 3;
      osStop = ua.indexOf(")");
      browser.os = ua.substring(osStart, osStop);
    }
  }
  browser.name = temp[0]; //浏览器
  browser.version = temp[1]; //版本号
  browser.clientHeight = document.documentElement.clientHeight;
  browser.clientWidth = document.documentElement.clientWidth;

  console.log(browser, "浏览器信息");
}

const monitor = {
  // 请求接口报错
  NetworkInfo: NetworkInfo,
  // 用户点击事件
  userClickInfo: () => {
    document.onclick = function (e) {
      if (e.target.dataset.c) {
        console.log("用户点击了：", e.target.innerText, "1111111111");
      }
    };
  }
};

/**请求接口报错
 * @param {错误信息} error
 * @param {*错误接口} interF
 */
export function NetworkInfo(error, interF) {
  console.log("%c---------------------------------------------", color1);
  console.log(
    "%c接口报错：" +
    error.toString().substring(error.toString().indexOf("at ")),
    color
  );
  console.log("%c错误接口：" + interF, color);
  userInfo();
  console.log("%c---------------------------------------------", color1);
}

export default {
  install: function (Vue) {
    Vue.prototype.$monitor = monitor;
  }
};
