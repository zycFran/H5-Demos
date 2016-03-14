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
    url :  '/s/lfx3$0'
});

fis.match('*.css', {
    optimizer: fis.plugin('clean-css'),
    url : '/s/lfx3$0'
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor'),
    url : '/s/lfx3$0'
});
fis.match('*.jpg', {
    url : '/s/lfx3$0'
});
fis.match('*.ttf', {
    url : '/s/lfx3$0'
});

fis.match('*.m4a', {
    url : '/s/lfx3$0'
});
fis.match('*.mp3', {
    url : '/s/lfx3$0'
});
fis.match('*.wav', {
    url : '/s/lfx3$0'
});