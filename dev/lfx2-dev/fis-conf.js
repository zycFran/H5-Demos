fis.match('*.{js,css}', {
    useHash: true // 开启 md5 戳
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
    url :  '/s/lfx2$0'
});

fis.match('*.css', {
    optimizer: fis.plugin('clean-css'),
    url : '/s/lfx2$0'
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor'),
    url : '/s/lfx2$0'
});
fis.match('*.jpg', {
    url : '/s/lfx2$0'
});
fis.match('*.ttf', {
    url : '/s/lfx2$0'
});
fis.match('*.TTF', {
    url : '/s/lfx2$0'
});

fis.match('*.m4a', {
    url : '/s/lfx2$0'
});
fis.match('*.mp3', {
    url : '/s/lfx2$0'
});