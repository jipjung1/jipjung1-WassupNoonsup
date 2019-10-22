import sys
from PIL import Image
import numpy as np
import cv2


def make_answer():
    file_path = sys.argv[1]
    gender = sys.argv[2]
    source_image = file_path
    img_name = file_path.split('\\')[1]
    img_name_1 = img_name.split('.')[0]
    target_image = './uploads/' + img_name_1 + '/' + img_name_1 + '_to_numpy.np'
    image = Image.open(source_image)
    resize_image = image.resize((32, 32))
    resize_image.save(target_image, 'JPEG', quality=95)

    w = 32
    h = 32
    X = []
    img = cv2.imread(target_image)
    img = cv2.resize(img, None, fx=w/img.shape[0], fy=h/img.shape[1])
    X.append(img/256)

    X = np.array(X)

    categories_female = ["Blackpink Jennie","Blackpink Jisoo","Blackpink Lisa","Blackpink Rose","ChungHa","Gfriend EunHa",
                  "Gfriend SinBi","Gfriend SoWon","Gfriend UmJi","Gfriend YeLin","Gfriend YuJoo","GongSeungYeon","HanGoEun",
                  "JeonDoYeon","JeongChaeYeon","JinSeYeon","JoBoa","JooGyeolGyeong","KimAhJoong","KimGoEun","KimJiWon","KimSeJung",
                  "KimSoHye","KimTaeRi","KimYooJung","LeeBoYoung","LeeMiyeon","LeeYeonHee","LimNaYoung","Mamamoo HwaSa","Mamamoo HwiIn",
                  "Mamamoo MoonByeol","Mamamoo Sola","MinHyoLin","SeoHyunjin","ShinSeKyung","SongYuna","SooAe","Yujin","Chaeyoung","Dahyoen",
                  "ITZY 류진","ITZY 리아","ITZY 신유나","ITZY 황예지","Irene","Jeongyoen","Jessica","Joy","Mina","Momo", "Seohyeon",
                  "Nayeon","Sana","Seulgi","Suyoung","Taeyoen","Tiffany","Wendy","Yeri","ZZeuwi","jihyo","강소라","걸스데이 민아","걸스데이 소진",
                  "걸스데이 유라","걸스데이 혜리","고소영","고아라","고준희","고현정","구혜선","김남주","김사랑","김성령","김소현","김연아","김태희","김하늘","김현주",
                  "김혜수","김희선","김희애","문근영","문채원","박보영","박신혜","설현","손예진","송지효","송혜교","수지","신민아","에이핑크 김남주","에이핑크 박초롱",
                  "에이핑크 손나은","에이핑크 오하영","에이핑크 윤보미","에이핑크 정은지","이나영","이하늬","임윤아","전지현","최지우","하지원","한가인","한예슬","한지민",
                  "한효주","황신혜", '이영애']

    categories_male = ['Btob LeeMinHyuk', 'Btob LimHyunSik', 'Btob Pniel', 'Btob SeoEunGwang', 'Btob YookSungJae',
                                   'ChaEunWoo', 'Chanmin', 'Choisiwon', 'Day6 DoWoon', 'Day6 SungJin',
                                   'Day6 WonPil', 'Day6 YoungK', 'EXO KAI', 'EXO 디오', 'EXO 레이', 'EXO 백현',
                                   'EXO 세훈', 'EXO 수호', 'EXO 찬열', 'EXO 첸', 'Eunhyuk', 'Gangin', 'Gyuhyun',
                                   'Heuicheol', 'Hoya', 'HyunBin', 'JangDongGun', 'JeongWooSung', 'Jhope', 'Jimin',
                                   'JoInSung', 'Jungguk', 'KangDongWon', 'KimSooHyun', 'Kimsunggyu', 'KoSoo',
                                   'L', 'Leekikwang', 'Namwoohyun', 'Nuest Aron', 'Nuest BaekHo',
                                   'Nuest Ren', 'ParkYucheon', 'RM', 'Ryuwook', 'Seventeen DoGyeom',
                                   'Seventeen JeongHan', 'Seventeen MinGyu', 'Seventeen Scoups', 'Shindong', 'Sondongwoon',
                                   'SongJoongGi', 'SongSeungHeon', 'Sugar', 'TOP', 'V', 'WonBin', 'Yesung', 'Yongjunhyeong',
                                   'YooSeungHo',
                                   'Yunho', '갓세븐 jb', '갓세븐 잭슨', '갓세븐 진영', '강하늘', '공유',
                                   '권상우', '김민종', '김우빈', '류준열', '박보검', '박해진', '소지섭',
                                   '송일국', '워너원 강다니엘', '워너원 라이관린', '워너원 박우진',
                                   '워너원 박지훈', '워너원 배진영', '워너원 용성우',
                                   '워너원 하성운', '워너원 황민현', '위너 강승윤', '위너 김진우',
                                   '위너 송민호', '위너 이승훈', '유아인', '이민호', '이병헌', '이서진',
                                   '이승기', '이정재', '이종석', '장근석', '장혁', '정해인', '조승우',
                                   '지창욱', '차승원', '차인표', '최민수', '최수종', '피오', '하정우']

    X_test = X
    xhat_idx = np.random.choice(X_test.shape[0], 5)
    xhat = X_test[xhat_idx]

    from keras.models import load_model
    if gender == 'female':
        model = load_model('./models/female_rotate_111.h5')
    else:
        model = load_model('./models/male_rotate_104.h5')

    yhat = model.predict_classes(xhat)

    if gender == 'female':
        answer = categories_female[yhat[0]]
    else:
        answer = categories_male[yhat[0]]

    print(answer)
    sys.stdout.flush()

make_answer()
