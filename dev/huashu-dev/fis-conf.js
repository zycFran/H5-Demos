fis.match('*.{js,css,png,gif}', {
    useHash: false // 开启 md5 戳
});
//fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
//});
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
});


fis.match('*.js', {
    optimizer: fis.plugin('uglify-js'),
    url :  '/s/huashu$0'
});

fis.match('*.css', {
   //useSprite: false,
   optimizer: fis.plugin('clean-css'),
   // packTo: '/css/pkg.css',
    url : '/s/huashu$0'
});

fis.match('*.png', {
   optimizer: fis.plugin('png-compressor'),
    url : '/s/huashu$0'
});
fis.match('*.jpg', {
    url : '/s/huashu$0'
});
fis.match('*.ttf', {
    url : '/s/huashu$0'
});

fis.match('*.m4a', {
    url : '/s/huashu$0'
});
fis.match('*.mp3', {
    url : '/s/huashu$0'
});