#### 使用
- npm i web_niu_monitor
- import 'web_niu_monitor'
- Vue.use(web_niu_monitor);
---
* js报错、静态资源错误、网站加载（针对性能优化）、用户信息进入页面自动监听

* 监听请求接口报错
  ```
  1.在axios中引入：import * as monitor from "web_niu_monitor";
  2.在响应拦截器error中调用：monitor.NetworkInfo(error, config_url.url);
  ```

* 监听用户点击事件
  ```
  1.在需要监听的按钮上添加自定义属性：data-click="true";
  2.在mounted中调用：this.$monitor.userClickInfo();
  ```