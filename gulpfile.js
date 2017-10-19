var gulp = require('gulp')
var run = require('gulp-run')
var eslint = require('gulp-eslint')

gulp.task('lint', function () {
  return gulp.src([
    '**/*.js',
    '!node_modules/**'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('build', [ 'lint' ], function () {
  return run('web-ext build --overwrite-dest').exec()
})

/* create a gulp watch task */
function addWatchTask (task, filter) {
  gulp.task(task + ':watch', function () {
    gulp.start(task)
    return gulp.watch(filter, [ task ])
  })
}

addWatchTask('lint', [
  '**/*.js',
  '!node_modules/**'
])

addWatchTask('build', 'src/**')
