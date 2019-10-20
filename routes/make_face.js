var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');

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
    fs.readFile(uploaded_file_path, function(err, data){
        //여기서 data가 이미지 데이터
        console.log(data);
    });
    //이미지에서 얼굴 추출, 돌리기
    //모델 20번 호출해서 결과값 어레이 받기
    //상위 3개만큼 DB에서 뽑기
    //각 사진 눈썹 합성
    //클라로 사진 여섯 개 전송
    res.send("hello");
});

module.exports = router;