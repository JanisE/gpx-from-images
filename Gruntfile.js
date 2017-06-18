
module.exports = function (grunt)
{
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		jshint: {
			all: [
				'*.js', 'src/*.js', 'test/*.js'
			],
			// http://jshint.com/docs/options/
			options: {
				curly: true,
				esversion: 6,
				funcscope: true,
				latedef: true,
				laxbreak: true,	// TODO In the next JSHint release it will probably possible to get rid of this deprecated option (https://github.com/jshint/jshint/issues/2793).
				node: true,
				nonew: true,
				singleGroups: true,
				undef: true,
				unused: true
			}
		}
	});

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['test']);
};
