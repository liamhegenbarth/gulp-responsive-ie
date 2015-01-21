var through 	= require('through2'),
	gutil		= require('gulp-util'),
	PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-responsive-ie';

var transform = function(file, opts) {

	opts 	= opts || {};

	var query	= file.toString('utf8'),
		regex 	= /\}\@\media\s\only.{10,}?\{/g,
		single 	= /\@\media\s\only.{10,}?\{/,
		
		temp	= query.replace(single, '');
		temp	= temp.replace(regex, '');
		temp	= temp.slice(0,-1);
		temp 	= new Buffer(temp);

	return temp;

}


var responsiveIE = function(opts) {

	var stream = through.obj(function(file, enc, cb) {
		
		if (file.isStream()) {

			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
			return cb();

		}

		if (file.isBuffer()) {
			
			file.contents = transform(file.contents, opts);

		}

		this.push(file);

		cb();

	});

	return stream;

}

module.exports = responsiveIE;
