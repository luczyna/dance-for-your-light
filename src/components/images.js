let BG = {
  A1: new Image(),
  B1: new Image(),
  A2: new Image(),
  B2: new Image(),
  A3: new Image(),
  B3: new Image(),
  A4: new Image(),
  B4: new Image(),
  A5: new Image(),
  B5: new Image(),
  A6: new Image(),
  B6: new Image(),
  A7: new Image(),
  B7: new Image()
};

let CHAR = {
  still1: new Image(),
  still2: new Image(),
  movea: new Image(),
  moveb: new Image(),
  movec: new Image(),
  moved: new Image(),
  shimee1: new Image(),
  shimee2: new Image(),
  shake1: new Image(),
  shake2: new Image(),
  yolo1: new Image(),
  yolo2: new Image(),
  stun1: new Image(),
  stun2: new Image()
};

// D'OH need to switch the levels (7 is 1...)
BG.A1.src = '/img/bg/bg7a.JPG';
BG.B1.src = '/img/bg/bg7b.JPG';
BG.A2.src = '/img/bg/bg6a.JPG';
BG.B2.src = '/img/bg/bg6b.JPG';
BG.A3.src = '/img/bg/bg5a.JPG';
BG.B3.src = '/img/bg/bg5b.JPG';
BG.A4.src = '/img/bg/bg4a.JPG';
BG.B4.src = '/img/bg/bg4b.JPG';
BG.A5.src = '/img/bg/bg3a.JPG';
BG.B5.src = '/img/bg/bg3b.JPG';
BG.A6.src = '/img/bg/bg2a.JPG';
BG.B6.src = '/img/bg/bg2b.JPG';
BG.A7.src = '/img/bg/bg1a.JPG';
BG.B7.src = '/img/bg/bg1b.JPG';

CHAR.still1.src = '/img/character/still-a.PNG';
CHAR.still2.src = '/img/character/still-b.PNG';
CHAR.movea.src = '/img/character/move-a.PNG';
CHAR.moveb.src = '/img/character/move-b.PNG';
CHAR.movec.src = '/img/character/move-c.PNG';
CHAR.moved.src = '/img/character/move-d.PNG';
CHAR.shimee1.src = '/img/character/shimee-a.PNG';
CHAR.shimee2.src = '/img/character/shimee-b.PNG';
CHAR.shake1.src = '/img/character/shake-a.PNG';
CHAR.shake2.src = '/img/character/shake-b.PNG';
CHAR.yolo1.src = '/img/character/yolo-a.PNG';
CHAR.yolo2.src = '/img/character/yolo-b.PNG';
CHAR.stun1.src = '/img/character/stun-a.PNG';
CHAR.stun2.src = '/img/character/stun-b.PNG';

module.exports = {
 BG: BG,
 CHARACTER: CHAR
};
