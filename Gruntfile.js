module.exports = function(grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		webfont: {
			icons: {
				src: 'svg/*.svg',
				dest: 'font',
				destCss: 'css',
				options: {
					htmlDemo: true,
					htmlDemoTemplate: '_template/preview.html',
					destHtml: './',
					font: 'cc-icons',
					types: 'eot,woff2,woff,ttf,svg',
					templateOptions: {
						baseClass: 'cc-icons',
						classPrefix: 'cc-icons-',
						mixinPrefix: 'cc-icons-'
					}
				}
			}
		},
		rename: {
			moveDemoHtml: {
				src: 'cc-icons.html',
				dest: 'index.html'
			}
		},
		update_json: {
			// update bower.json with data from package.json
			bower: {
				src: 'package.json', // where to read from
				dest: 'bower.json', // where to write to
				// the fields to update, as a String Grouping
				fields: {
					'name': null,
					'version': null,
					'description': null,
					'main': null
				}
			},
			// update component.json with data from package.json
			// component.json fields are a named a bit differently from
			// package.json, so let's tell update_json how to map names
			component: {
				src: 'package.json',
				// reuse the task-level `src`
				dest: 'component.json', // where to write to
				fields: {
					'name': null,
					'author': null,
					'description': null,
					'version': null,
					'keywords': null,
					'main': null,
					'development': 'devDependencies',
					'license': null
				}
			},
			// `composer` has the same data as `package`, but has some tricky
			// semantics
			composer: {
				src: 'package.json',
				// again, reuse the task-level `src`
				dest: 'composer.json',
				// the fields in an Array Grouping with some embedded Object Groupings
				fields: {
					'description': null,
					'keywords': null,
					'license': null
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-update-json');

	// Default task(s).
	grunt.registerTask('default', ['webfont', 'rename', 'update_json']);
};
