/**
 * Created by zhouyc on 2016/3/9.
 */
var hammer = '';
var currentIndex = 0;
var body_width = 0;
var body_height = 0;

var photoInited = false;

//ͼƬ�ϴ�
function saveImageInfo() {
    var filename = $('#hit').attr('fileName');
    var img_data = $('#hit').attr('src');
    if(img_data==""){alert('null');}

    //render(img_data);

    $.post("/r/image/upload", {image: img_data}, function (data) {
        if (data != '') {
            alert('�ύ�ɹ�');
        }
    });
}

/*��ȡ�ļ���չ��*/
function getFileExt(str) {
    var d = /\.[^\.]+$/.exec(str);
    return d;
}

//ͼƬ�ϴ�����
$(function () {
    $('#upload2').on('touchstart', function () {
        //ͼƬ�ϴ���ť
        $('#file').click();
    });
});


function Close(){$('#plan').hide();}

// ��Ⱦ Image ���ųߴ�
function render(src){
    var MAX_HEIGHT = 256;  //Image ���ųߴ�
    // ����һ�� Image ����
    var image = new Image();

    // �� load �¼���������������ɺ�ִ��
    image.onload = function(){
        // ��ȡ canvas DOM ����
        var canvas = document.getElementById("myCanvas");
        // ����߶ȳ���
        if(image.height > MAX_HEIGHT) {
            // ��ȵȱ������� *=
            image.width *= MAX_HEIGHT / image.height;
            image.height = MAX_HEIGHT;
        }
        // ��ȡ canvas�� 2d ��������,
        // �������Context�ǹ���Ա��canvas�Ƿ���
        var ctx = canvas.getContext("2d");
        // canvas����
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;        // ����canvas���
        canvas.height = image.height;
        // ��ͼ����Ƶ�canvas��
        ctx.drawImage(image, 0, 0, image.width, image.height);
        // !!! ע�⣬image û�м��뵽 dom֮��

        var dataurl = canvas.toDataURL("image/jpeg");
        var imagedata =  encodeURIComponent(dataurl);
        $('#plan').attr('data-src',dataurl);
        $('#plan').show();
    };
    // ����src���ԣ���������Զ����ء�
    // ��ס�����Ȱ�render()�¼�����������src���ԣ�������ͬ�����⡣
    image.src = src;
};