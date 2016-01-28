var gulp = require('gulp');

/**
 * use in browser
 */
var browserSync = require('browser-sync'),
    reload      = browserSync.reload;

gulp.task('browser-sync', function() {

    browserSync.init({
        // 服务开启地址
        server: './',
        index: "index.html",
        directory: true,
        // Linux
        browser: ["google-chrome"]
        // Mac
        // browser: ["Google Chrome", "firefox"]
        // browser: ["Google Chrome"]
    });

});

gulp.task('watchFile', function(){

    gulp.watch([
			'lesson01/*.*',
      ])
      .on('change', reload);
});

gulp.task('serve', ['watchFile','browser-sync'], function(){
});
