var express = require('express');
var multer = require('multer');
var router = express.Router();
var template = require('../template');
var child_process = require('child_process');

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
    //happy.jpg를 업로드 했다면 uploadea_file_path = uploads\happy.jpg
    var uploaded_file_path = req.file['path'];
    var local_path = 'http://localhost:3000/static/';
    var spawnSync = child_process.spawnSync;

    //이미지 이름 폴더 없으면 생성, 이미지에서 얼굴 추출, 돌리기 -> 이미지 이름 폴더 저장

    var result = spawnSync('python', ['./return_class.py', uploaded_file_path, gender]);
    //도출된 class값 출력
    var celeb_name = result.stdout.toString();
    celeb_name = celeb_name.split('\n')[0];
    console.log(celeb_name);

    //return_class에 위 이미지 패스 바꿔주고, 변환된거 저장하는 패스도 변경,
    //모델 두개 더 돌릴거면 돌리기
    //각 class 이름 넘어오는거 까지 했음 / list에 있는 값과 폴더명 맞추기

    //best 이미지 받아온 거랑 처음 업로드한 이미지 합성하는거 python 모듈로 만들고 파일 생성

    //클라로 사진 전송, 위의 list값 3 개, 눈썹 합성한 거 3개 path지정하면 넘어감
    var html_tem = template.HTML(local_path + 'sideimg.jpg', local_path + '11.png',
        local_path + '111.jpg', local_path + '123.png', local_path + '456.jpg',
        local_path + 'ff.png', local_path + 'taeheui.jpg');

    res.send(html_tem);
});

module.exports = router;