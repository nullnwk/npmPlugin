const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');
const tinypng = require('gulp-tinypng-unlimited');   //图片压缩
const connect = require('gulp-connect');    //自动刷新
const revappend = require('gulp-rev-append');  //html后加版本号
const sass = require('gulp-sass');


//循环进行css/js处理,模块名称
// var mobileArr = ['webFrameWork', 'webFrame'];


//html
function setGulpHtml() {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  gulp.src('src/html/**/*.html')   //找到目标文件
    .pipe(revappend())
    .pipe(htmlmin(options))               //压缩文件
    .on('error', swallowError)
    .pipe(gulp.dest('dist/html/'))              //输出文件到本地
    .pipe(connect.reload())
}

//js
function setGulpJs() {
  gulp.src(`src/js/*.js`)   //找到目标文件
    .on('error', swallowError)
    .pipe(babel())                            //es6转es5
    // .pipe(concat(`${fileName}.js`))           //合并临时文件
    .pipe(uglify({ mangle: { toplevel: true } }))   //压缩混淆文件
    // .pipe(rename({ suffix: '.min' }))         //重命名
    .pipe(gulp.dest('dist/js/'))              //输出文件到本地
    .pipe(connect.reload())
}

// sass
function setGulpsass() {
  gulp.src('src/css/*.scss')
    .pipe(sass())     //编译sass文件为css文件
    // .pipe(rename({ suffix: '.min' }))         //重命名
    .on('error', swallowError)
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload())
}

// img
function setGulpImg() {
  return gulp.src('src/images/**/*.@(png|jpg|jpeg)')
    .pipe(tinypng())
    .pipe(gulp.dest('dist/images'))
}

//插件
function setGulpLib() {
  return gulp.src('src/lib/**/*')
    .pipe(gulp.dest('dist/lib'))
}
// 公共文件
function setGulpCommon() {
  return gulp.src('src/common/**/*')
    .pipe(gulp.dest('dist/common'))
}

// 代码写错提示信息
function swallowError(error) {
  // If you want details of the error in the console
  console.error(error.toString())
  this.emit('end')
}


// 模块 
//html
gulp.task('html', async () => {
  await setGulpHtml()
})
// 图片
gulp.task('img', async () => {
  await setGulpImg()
})

//sass
gulp.task('sass', gulp.series('html', async () => {
  await setGulpsass();
}))

gulp.task('js', async () => {
  await setGulpJs();
})


// 插件
gulp.task('lib', async () => {
  await setGulpLib(); setGulpCommon();

})



// // 监视任务
gulp.task('watch', async () => {
  //确定监听的文件
  gulp.watch('src/html/**/*.html', gulp.series('html'))
  gulp.watch('src/css/*.scss', gulp.series('sass'))
  gulp.watch('src/js/*.js', gulp.series('js'))
  gulp.watch('src/lib/**/*', gulp.series('lib'))
  gulp.watch('src/common/**/*', gulp.series('lib'))
})

// 全自动监视
gulp.task('server', () => {
  connect.server({
    root: 'dist/',//根目录
    livereload: true,//自动更新
    port: 9909//端口
  })
})

let mobileArrAll = ['html', 'sass', 'js', 'img', 'lib', 'watch', 'server']

gulp.task('default', gulp.series(gulp.parallel(mobileArrAll)));
