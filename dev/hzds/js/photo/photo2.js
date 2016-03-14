window.onload = function () {
    setTimeout(function(){
        clipCanvas = new ImgClip({
            canvas: 'canvas01', // canvas id
            fileObj: 'file', // file id
            cutBtn: 'clipBtn', // cut btn id
            resultObj: 'hit', // result img i
            cutScale: 1, // 1:1¡¢3:4
            rotateR: false
        });
    }, 1000)


};