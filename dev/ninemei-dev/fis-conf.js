fis.match('*.{js,css,png,gif}', {
    useHash: true // 开启 md5 戳
});
//fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
//});
fis.match('::package', {
    postpackager: fis.plugin('loader')
});

fis.match('*.js', {
    packTo: '/js/pkg.js',
    optimizer: fis.plugin('uglify-js'),
    url : '/s/ningmei$0'
});
fis.match('*.mp3', {
    url : '/s/ningmei$0'
});

fis.match('*.css', {
   useSprite: false,
   optimizer: fis.plugin('clean-css'),
    packTo: '/css/pkg.css',
    url : '/s/ningmei$0'
});

fis.match('*.png', {
   optimizer: fis.plugin('png-compressor'),
    url : '/s/ningmei$0'
});
fis.match('*.jpg', {
    url : '/s/ningmei$0'
});
fis.match('*.ttf', {
    url : '/s/ningmei$0'
});