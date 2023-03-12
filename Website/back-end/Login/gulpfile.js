const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('start', gulp.series( () => {
  nodemon({
    script: './daemon'
  })
})
)

gulp.task('default', gulp.series('start'))