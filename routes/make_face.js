var express = require('express');
var multer = require('multer');
var router = express.Router();
var template = require('../template');
var child_process = require('child_process');
var path = require('path');

//save uploaded file into uploads folder with original name
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req,  file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

//route for request through post method
//process the single file which name is photo
router.post('/', upload.single('photo'), function (req, res) {

    //allocate gender and file path from client
    var gender = req.body['temp1'];
    //if the client uploaded happy.jpg ->  uploadea_file_path = uploads\happy.jpg
    var uploaded_file_path = req.file['path'];
    //local path for provide static files to client
    var local_path = 'http://localhost:3000/static/';
    //create new thread that calls python codes
    var spawnSync = child_process.spawnSync;

    //create new folder with uploaded file name and crop face, rotate it and save
    var align = spawnSync('python',["./facealign.py", uploaded_file_path]);

    //gain result class from uploaded image
    var result = spawnSync('python', ['./return_class.py', uploaded_file_path, gender]);

    //the result will save in buffer and allocate it in celeb_name with toString method
    var celeb_name = result.stdout.toString();
    //the buffer contain '\n', '\r' so delete it
    celeb_name = celeb_name.split('\n')[0];
    celeb_name = celeb_name.split('\r')[0];
    console.log(celeb_name);

    //compose eyebrow and save image file
    var celeb_path = './uploads/best_photos/' + gender + '/' + celeb_name + '/' + celeb_name + '.jpg';
    var compose = spawnSync('python', ["./assemble_eyebrow.py", celeb_path, uploaded_file_path]);

    //모델 두개 더 돌릴거면 돌리기

    var file_name = uploaded_file_path.split('\\')[1];
    var photo_name = file_name.split('.')[0];

    //클라로 사진 전송, 위의 list값 3 개, 눈썹 합성한 거 3개 path지정하면 넘어감
    var html_tem = template.HTML(local_path + photo_name + '.jpg',
        local_path + photo_name + '/' + photo_name + '_eyebrow.jpg',
        local_path + 'sample2.jpg', local_path + 'sample3.jpg',
        local_path + 'best_photos/'+ gender +'/' + celeb_name + '/' + celeb_name + '.jpg',
        local_path + 'sample2.jpg', local_path + 'sample3.jpg');

    res.send(html_tem);
});

module.exports = router;