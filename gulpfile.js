/**
* The gulp file is used to compile SASS.
*
* @link       http://www.dustinrea.com
* @since      1.0.0
*
* @package    Gulp SASS Compiler
* @author     Dustin Rea <me@dustinrea.com>
* --------------------------------------------------------------------
*/

// Gulp is the CLI Task Runner. 
var gulp = require('gulp');

/**
* Gulp-Load-Plugins will automatically require other
* Gulp Modules that are installed in node_modules.
* You can view the current modules there or in 
* package.json.
* 
* The Extra () is to require and init on the same var.
* SOURCE: https://www.npmjs.com/package/gulp-load-plugins
* --------------------------------------------------------------------
*/
var gulpPlugins = require('gulp-load-plugins')(); 
var path = require('path');

    
// Asset Files to be watched.    
var defaultAssets = {
    scss: './assets/sass/style.scss',
    css: './assets/css/'
};

/**
* SASS:COMPILE
* 
* @description: Watches style.scss and Compiles to CSS on change. 
*   Outputs one CSS file to style.css in library/css. 
*   Imported .SCSS files in the main style.scss will be compiled
*   correctly into one file to reduce http requests in production.
*   All sub-brand .scss files can be found in sass/brand/*.scss
* --------------------------------------------------------------------
* TODO: Add CSS Minify
* --------------------------------------------------------------------
*/ 
gulp.task('sass:compile', function() {
    gulp.src(defaultAssets.scss)
        // Autoprefixer requires at least precision 7. 
        .pipe(gulpPlugins.sass({outputStyle: 'compressed', precision: 7}).on('error', gulpPlugins.sass.logError))
        // Automatically adds Browser Vendor Prefixes
        .pipe(gulpPlugins.autoprefixer()) 
        // Pipe to gulpPlugins.rename() in order to overwrite current stylesheet. 
        .pipe(gulpPlugins.rename(function (file) {
            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
        }))
        .pipe(gulp.dest(defaultAssets.css));
});

/**
* SASS:WATCH 
* 
* @description: Default event listener for style.scss changes. 
*   Triggers the SASS:COMPILE function on change. 
* --------------------------------------------------------------------
*/ 
gulp.task('sass:watch', function () {
  gulp.watch(defaultAssets.scss, ['sass:compile']);
});

/**
* Default task when gulp is ran from CLI.
* 
* @param - Name of task runner
* @param - @Array[] - list tasks to execute.
* 
* @usage: In terminal at ~/workspace/wp-content/themes/tavel3 
*   Type 'gulp' and hit enter to stat the gulp task runner. 
*   It will continue to run in the terminal until you exit the
*   Task with CTRL + C
* --------------------------------------------------------------------
*/ 
gulp.task('default', ['sass:watch']);    