import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';

(async () => {
	await imagemin(['public/assets/images/*.jpg'], {
		destination: 'temp/public/assets/images',
		plugins: [
			imageminMozjpeg({quality: 50}),
            imageminWebp({quality: 50})
		]
	});

	console.log('Images optimized');
})();