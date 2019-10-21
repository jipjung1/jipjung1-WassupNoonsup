var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var template = require('../template');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req,  file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

router.post('/', upload.single('photo'), function (req, res) {

    //여기서 이미지랑 성별 받고 변수에 할당
    var gender = req.body['temp1'];
    var uploaded_file_path = req.file['path'];
    var local_path = 'http://localhost:3000/static/'

    //이미지에서 얼굴 추출, 돌리기
    //numpy 어레이로 변환 -> 이미지 이름으로 폴더 생성해서 그곳에 저장
    //각기 다른 모델 3개 호출하여 결과값 도출
    //상위 3개클래스 폴더에서 뽑기
    //각 사진 눈썹 합성

    //클라로 사진 전송
    var html_tem = template.HTML(local_path + 'sideimg.jpg', local_path + '11.png',
        local_path + '111.jpg', local_path + '123.png', local_path + '456.jpg',
        local_path + 'ff.png', local_path + 'taeheui.jpg');

    res.send(html_tem);
});

module.exports = router;