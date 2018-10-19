const
  config = require('./config.json'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  glob = require('gulp-sass-glob'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  stylish = require('jshint-stylish'),
  imagemin = require('gulp-imagemin'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();

/*CORE SASS TASK*/
gulp.task('core_sass', () =>
  gulp.src(config.css.core.src)
    .pipe(glob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title: "Gulp",
          subtitle: "Falló!",
          message: "Error: <%= error.message %>",
          sound: "Beep"
        })(error);
        this.emit('end');
      }
    }))
    .pipe(sass({
      sourceComments: false,
      includePaths: config.css.includePaths,
      outputStyle: 'compact'
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(config.css.core.dest))
    .pipe(browserSync.reload({ stream: true, match: config.css.sync }))
);

/*ADMIN SASS TASK*/
gulp.task('admin_sass', () =>
  gulp.src(config.css.admin.src)
    .pipe(glob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title: "Gulp",
          subtitle: "Falló!",
          message: "Error: <%= error.message %>",
          sound: "Beep"
        })(error);
        this.emit('end');
      }
    }))
    .pipe(sass({
      sourceComments: false,
      includePaths: config.css.includePaths,
      outputStyle: 'compact'
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(config.css.admin.dest))
    .pipe(browserSync.reload({ stream: true, match: '**/*.css' }))
);

/* CORE JS TASK */
gulp.task('core_js', () =>
  gulp.src(config.js.core.src)
    .pipe(concat(config.js.core.concat))
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest(config.js.core.dest))
);

/* SASS LINT TASK */
gulp.task('sass_lint', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src(config.css.core.watch)
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

/* ADMIN JS TASK */
gulp.task('admin_js', () =>
  gulp.src(config.js.admin.src)
    .pipe(concat(config.js.admin.concat))
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest(config.js.admin.dest))
);

/* FONTS */
gulp.task('fonts', () =>
  gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
);

/* IMAGES */
gulp.task('images', () =>
  gulp.src(config.images.src)
    .pipe(imagemin({ verbose: false }))
    .pipe(gulp.dest(config.images.dest))
);

gulp.task('default', ['core_sass', 'admin_sass', 'core_js', 'admin_js', 'fonts', 'images'], () => {
  gulp.watch(config.css.core.watch, ['core_sass']);
  gulp.watch(config.css.admin.watch, ['admin_sass']);
  gulp.watch(config.js.core.watch, ['core_js']);
  gulp.watch(config.js.admin.watch, ['admin_js']);
});
