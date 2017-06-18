
var gulp = require('gulp');
var pandoc = require('gulp-pandoc');

gulp.task('default', ['doc']);

gulp.task('doc', function ()
{
	gulp.src('*.md')
		.pipe(pandoc({
			from: 'markdown_github+implicit_header_references',
			to: 'html',
			ext: '.html',
		  args: ['--standalone']
		}))
		.pipe(gulp.dest('doc/'));
});
