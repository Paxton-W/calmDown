const grid_pixel = 10;
const pi_ma = 4; //pixel magnification
const grid_size = grid_pixel * pi_ma; // 10X20  200 but canvas 40X20 800
const ww = 800;
const hh = 800;
const cvs_pix = 200;
const anxious_event = [];
const fr = 60; //frame rate
let main_p5canvas;
//layers
let cv_inte; //canvas for interface
let cv_plpop; // canvas for players head pop up
let font1;
let font2;

let img_bg;
let img_bgn;
let img_player;
let img_bg_an;
let img_obj;
let img_page;
let img_dialogue;
let sound_task = {};
let sound_event = {};

let sound_event_playing_list = []; //assign from play_event_sound_tp()
let obj_player;

let gameStatus = "standby";
let userClickNewPosition = false;
let gameAnxiousValue = 150;
let gameAnxiousValue_post = 150;
let gameAnxiousValue_change = ![];
let gameAnxiousValue_change_diaplay_timer = 0;
let gameAnxiousValueMax = 400;
let gameTimeDuration = 0;
let gameTimeStart = 0;
let gameTimeResult = 0;
let gameTaskTimeGap = fr * 30;
let gameTaskTimeNext = fr * 30;
// let gameTaskTimeNext = fr * 30;
let gameTaskLevel = 1;
let gameTaskCurrent = "";
let gameTaskDialogue = "";
let gamePlayerPanelDisplay = false;
let gameEventActive = false;
let gameEventCurrent = "";
let gameEventCurrentTimeLeft = null;

// let player_moving = false;

////for dev/////////////
let grids = [];
////////////////////////
function preload() {
  // img_bg = loadImage("assets/bg/bg7.png");
  img_bgn = loadImage("assets/bg/bg2n.png");
  img_player = {
    boy: {
      calm: {
        img: loadImage("assets/player_boy/calm/calm.png"),
        json: loadJSON("assets/player_boy/calm/calm.json"),
      },
      anger: {
        img: loadImage("assets/player_boy/anger/anger.png"),
        json: loadJSON("assets/player_boy/anger/anger.json"),
      },
      anxious: {
        img: loadImage("assets/player_boy/anxious/anxious.png"),
        json: loadJSON("assets/player_boy/anxious/anxious.json"),
      },
      sad: {
        img: loadImage("assets/player_boy/sad/sad.png"),
        json: loadJSON("assets/player_boy/sad/sad.json"),
      },
    },
    girl: {
      calm: {
        img: loadImage("assets/player_girl/calm/calm.png"),
        json: loadJSON("assets/player_girl/calm/calm.json"),
      },
      anger: {
        img: loadImage("assets/player_girl/anger/anger.png"),
        json: loadJSON("assets/player_girl/anger/anger.json"),
      },
      anxious: {
        img: loadImage("assets/player_girl/anxious/anxious.png"),
        json: loadJSON("assets/player_girl/anxious/anxious.json"),
      },
      sad: {
        img: loadImage("assets/player_girl/sad/sad.png"),
        json: loadJSON("assets/player_girl/sad/sad.json"),
      },
    },
  };
  img_bg_an = {
    fire_alarm: {
      img: loadImage("assets/event_an/fire_alarm/fire_alarm.png"),
      json: loadJSON("assets/event_an/fire_alarm/fire_alarm.json"),
      sprite: {},
      animation: [],
    },
    thunder: {
      img: loadImage("assets/event_an/thunder/thunder.png"),
      json: loadJSON("assets/event_an/thunder/thunder.json"),
      sprite: {},
      animation: [],
    },
    winds: {
      img: loadImage("assets/event_an/winds/winds.png"),
      json: loadJSON("assets/event_an/winds/winds.json"),
      sprite: {},
      animation: [],
    },
  };
  img_obj = {
    book: loadImage("assets/objects/book.png"),
    bug: loadImage("assets/objects/bug.png"),
    console: loadImage("assets/objects/console.png"),
    cookie: loadImage("assets/objects/cookie.png"),
    headphones: loadImage("assets/objects/earphones.png"),
    kitchen: loadImage("assets/objects/kitchen.png"),
    mic: loadImage("assets/objects/micro.png"),
    phone: loadImage("assets/objects/phone.png"),
    spray: loadImage("assets/objects/spray.png"),
    tea: loadImage("assets/objects/tea.png"),
    watering: loadImage("assets/objects/water.png"),
    arrow: loadImage("assets/arrrow.png"),
  };
  img_dialogue = {
    ambulance_siren: loadImage("assets/dial/ambulance_siren.png"),
    bugs: loadImage("assets/dial/bugs.png"),
    cold_weather: loadImage("assets/dial/cold_weather.png"),
    fire_alarm: loadImage("assets/dial/fire_alarm.png"),
    headache: loadImage("assets/dial/headache.png"),
    hungry: loadImage("assets/dial/hungry.png"),
    neighbour_noise: loadImage("assets/dial/neighbour_noise.png"),
    no_internet: loadImage("assets/dial/no_internet.png"),
    thirsty: loadImage("assets/dial/thirsty.png"),
    thundering: loadImage("assets/dial/thundering.png"),
    tired: loadImage("assets/dial/tired.png"),
    windy: loadImage("assets/dial/windy.png"),
  };
  img_page = {
    gameover: loadImage("assets/pages/gameover2.png"),
    pause: loadImage("assets/pages/paused.png"),
    rules: loadImage("assets/pages/rule.png"),
    start: loadImage("assets/pages/play2.png"),
  };
  soundFormats("mp3", "wav");
  sound_task = {
    footStep: loadSound("assets/sound/footStep/footstep3.mp3"),
    bookPageTurn: loadSound("assets/sound/bookPageTurn.wav"),
    cooking: loadSound("assets/sound/cooking.wav"),
    beepSound: loadSound("assets/sound/beepSound.wav"),
    cry: loadSound("assets/sound/cry.wav"),
    drink: loadSound("assets/sound/drink.mp3"),
    eatBiscuits: loadSound("assets/sound/eatBiscuits.wav"),
    hungry: loadSound("assets/sound/hungry.wav"),
    // neighbourNoise: loadSound("assets/sound/neighbourNoise.mp3"),
    pesticideSpray: loadSound("assets/sound/pesticideSpray.mp3"),
    phoneNotification: loadSound("assets/sound/phoneNotification.wav"),
    playMusic: loadSound("assets/sound/playMusic.wav"),
    rat: loadSound("assets/sound/rat.wav"),
    sleep: loadSound("assets/sound/sleep.wav"),
    smokeAlarm: loadSound("assets/sound/smokeAlarm.wav"),
    thunder: loadSound("assets/sound/thunder.wav"),
    wateringPlant: loadSound("assets/sound/wateringPlant.wav"),
    wind: loadSound("assets/sound/wind.wav"),
    ambulance: loadSound("assets/sound/ambulance.mp3"),
    walk: loadSound("assets/sound/walk.mp3"),
    bug: loadSound("assets/sound/bug.mp3"),
    game: loadSound("assets/sound/game.mp3"),
    headphone: loadSound("assets/sound/headphone.wav"),
    boySing: loadSound("assets/sound/boy_sing.mp3"),
    girlSing: loadSound("assets/sound/girl_sing.mp3"),
    score: loadSound("assets/sound/score.wav"),
    tv: loadSound("assets/sound/watchTV.wav"),
    lose: loadSound("assets/sound/lose.wav"),
    gameover: loadSound("assets/sound/gameOver.mp3"),
    heater: loadSound("assets/sound/turnOnHeater.wav"),
    neightbour: loadSound("assets/sound/neightbour.mp3"),
    bell: loadSound("assets/sound/relif_bell.wav"),
  };
  font1 = loadFont("assets/pixelfont.ttf");
  font2 = loadFont("assets/SHPinscher.otf");
}
let bugs_pos; //for bugs position
function setup() {
  //main canvas
  main_p5canvas = createCanvas(ww, hh);
  main_p5canvas.parent("p5-c");
  //layercanvas
  cv_inte = createGraphics(cvs_pix, cvs_pix);
  // cv_plpop = createGraphics(cvs_pix * 4, cvs_pix * 4);
  //push grid line 20x20s 10x10px
  for (let w = 0; w < width / grid_size; w++) {
    for (let h = 0; h < height / grid_size; h++) {
      grids.push(new Grid(w, h));
    }
  }
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  textFont(font2);
  // cv_inte.textFont(font1);
  angleMode(DEGREES);
  frameRate(fr);
  gameStatus = "welcome";

  ////
  cv_inte.rectMode(CENTER);
  cv_inte.textAlign(CENTER, CENTER);

  //set sprite for background animation
  const setSprite = (src, speed) => {
    let w = src.json.frames;
    for (let i = 0; i < w.length; i++) {
      let pos = w[i].frame;
      // console.log(pos);
      let img = src.img.get(pos.x, pos.y, pos.w, pos.h);
      src.animation.push(img);
    }
    // console.log(thisplayerLoc);
    src.sprite = new Sprite(src.animation, 0, 0, speed);
    // above constructor(animation, x, y, speed)
  };
  setSprite(img_bg_an.fire_alarm, 0.3);
  setSprite(img_bg_an.thunder, 0.08);
  setSprite(img_bg_an.winds, 0.1);
  //for bugs position
  bugs_pos = createVector(550, 484);
}

function draw() {
  gameAnxiousValue_post = gameAnxiousValue;
  // image(img_bg, ww / 2, hh / 2, width, height);
  image(img_bgn, ww / 2, hh / 2, width, height);
  //objs
  gameEventCurrent !== "read_a_book" && image(img_obj.book, 300, 237);
  gameEventCurrent !== "eat_biscuit" && image(img_obj.cookie, 140, 536);
  gameEventCurrent !== "put_on_headphone" && image(img_obj.headphones, 339, 222);
  gameEventCurrent !== "use_pesticides" && image(img_obj.spray, 739, 459);
  gameEventCurrent !== "drink_tea" && image(img_obj.tea, 60, 543);
  gameEventCurrent !== "water_plants" && image(img_obj.watering, 740, 655);
  push();
  translate(140, 379);
  rotate(30);
  gameEventCurrent !== "use_datingApp" && image(img_obj.phone, 0, 0);
  pop();
  push();
  translate(102, 583);
  rotate(70);
  gameEventCurrent !== "singing" && image(img_obj.mic, 0, 0);
  pop();

  let ci = cv_inte;
  switch (gameStatus) {
    case "standby":
      alert("Unexpected error, please reload the page.");
      break;
    case "welcome":
      image(img_page.start, ww / 2, hh / 2);
      break;
    case "instruction":
      image(img_page.rules, ww / 2, hh / 2);
      break;
    case "play":
      //detect game over
      if (gameAnxiousValue > gameAnxiousValueMax) {
        gameStatus = "over";
        sound_task.footStep.stop();
        sound_task.gameover.play();
      }
      //show any task animate
      if (event_tasks_active.fire_alarm) {
        push();
        translate(460, 53);
        img_bg_an.fire_alarm.sprite.show();
        pop();
      } else if (event_tasks_active.thundering) {
        push();
        translate(221, 102);
        scale(0.96);
        img_bg_an.thunder.sprite.show();
        pop();
      } else if (event_tasks_active.windy) {
        push();
        translate(220, 100);
        scale(0.96);
        img_bg_an.winds.sprite.show();
        pop();
      } else if (event_tasks_active.bugs) {
        push();
        translate(bugs_pos.x, bugs_pos.y);
        let bp = createVector(noise(500 + frameCount / 80) * 4 - 2, noise(frameCount / 80) * 4 - 2);
        scale(0.6);
        bugs_pos.add(bp);
        rotate(bp.heading() + 90);
        image(img_obj.bug, 0, 0);
        pop();
      }

      //player display
      obj_player.update();
      obj_player.display();
      //game time
      gameTimeDuration = millis() - gameTimeStart;
      //task timer
      gameTaskTimeNext--;
      if (gameTaskTimeNext <= 0) {
        newTask();
        gameTaskTimeGap = gameTaskLevelTimeArray[gameTaskLevel] * fr;
        gameTaskTimeNext = gameTaskTimeGap;
        if (gameTaskLevel < 8) {
          gameTaskLevel++;
        }
      }
      //event detect any of them active and set timer and run
      for (let aev in gameEventDoing) {
        let obj = gameEventDoing[aev];
        if (obj.active && !gameEventActive) {
          // console.log(aev, "starts");
          gameEventCurrent = aev;
          gameEventActive = true;
          //play sound
          //start timer
          obj.timeleft = obj.tdu;
          gameEventCurrentTimeLeft = obj.timeleft / obj.tdu;
          //
          event_finish_count_score(gameTaskCurrent, aev);
          obj.active = false;
        } else if (obj.timeleft > 0) {
          obj.timeleft--;
          gameEventCurrentTimeLeft = obj.timeleft / obj.tdu;
          // console.log(obj.timeleft);
        } else if (obj.timeleft == 0) {
          obj.timeleft = -1;
          // console.log(aev, "ends");
          gameEventActive = false;
          gameEventCurrent = "";

          obj.cdtL = obj.cdT;
        } else if (obj.cdtL > 0) {
          obj.cdtL--;
          let pp = obj.cdtL / obj.cdT;
          push();
          fill(40, 200);
          // stroke(30, 235, 40);
          stroke(230);
          switch (aev) {
            case "use_datingApp":
              arc(140, 379, 35, 35, 0, 360 * pp, PIE);
              break;
            case "put_on_headphone":
              arc(341, 225, 35, 35, 0, 360 * pp, PIE);
              break;
            case "use_pesticides":
              arc(739, 462, 35, 35, 0, 360 * pp, PIE);
              break;
            case "play_music":
              arc(530, 155, 35, 35, 0, 360 * pp, PIE);
              break;
            case "singing":
              arc(101, 584, 35, 35, 0, 360 * pp, PIE);
              break;
            case "eat_biscuit":
              arc(135, 539, 35, 35, 0, 360 * pp, PIE);
              break;
            case "go_for_a_walk":
              arc(770, 539, 35, 35, 0, 360 * pp, PIE);
              break;
            case "sleep":
              arc(140, 270, 35, 35, 0, 360 * pp, PIE);
              break;
            case "cry":
              arc(35, 720, 35, 35, 0, 360 * pp, PIE);
              break;
            case "drink_tea":
              arc(60, 536, 35, 35, 0, 360 * pp, PIE);
              break;
            case "cook":
              arc(721, 321, 35, 35, 0, 360 * pp, PIE);
              break;
            case "read_a_book":
              arc(300, 243, 35, 35, 0, 360 * pp, PIE);
              break;
            case "play_video_game":
              arc(362, 436, 35, 35, 0, 360 * pp, PIE);
              break;
            case "watch_tv":
              arc(399, 221, 35, 35, 0, 360 * pp, PIE);
              break;
            case "water_plants":
              arc(735, 640, 35, 35, 0, 360 * pp, PIE);
              break;
            case "turn_on_heater":
              arc(560, 640, 35, 35, 0, 360 * pp, PIE);
              break;
          }
          pop();
        } else if (obj.cdtL == 0) {
          obj.cdtL = -1;
          // console.log(aev, "cd ends");
        }
      }
      if (frameCount % 160 < 140) {
        push();
        fill(255);
        text("Click here to cry!", 35, 770, 40);
        pop();
      }

      // console.log({ gameTaskTimeGap, gameTaskTimeNext });
      break;
    case "pause":
      sound_task.footStep.stop();
      //draw instrouction popup window
      image(img_page.pause, ww / 2, hh / 2);
      // ci.textSize(7);
      // ci.rect(ci.width / 2, ci.height / 2, ci.width / 2, ci.width / 2, ci.width * 0.02);
      // ci.rect(ci.width / 2, ci.height / 2 + ci.height * 0.15, ci.width * 0.2, ci.height * 0.06);
      // ci.text("RESUME", ci.width / 2, ci.height / 2 + ci.height * 0.15, ci.width * 0.2, ci.height * 0.06);
      // image(cv_inte, ww / 2, hh / 2, ww, hh); //interface
      break;
    case "over":
      play_event_sound_tp("reset");
      sound_task.footStep.stop();
      //draw instrouction popup window
      image(img_page.gameover, ww / 2, hh / 2);
      fill(0);
      textSize(30);
      if (gameTimeDuration < 120000) {
        text("25", ww * 0.48, hh * 0.62);
      } else if (gameTimeDuration < 150000) {
        text("50", ww * 0.48, hh * 0.62);
      } else if (gameTimeDuration < 180000) {
        text("75", ww * 0.48, hh * 0.62);
      } else if (gameTimeDuration < 200000) {
        text("85", ww * 0.48, hh * 0.62);
      } else if (gameTimeDuration < 220000) {
        text("90", ww * 0.48, hh * 0.62);
      } else if (gameTimeDuration < 300000) {
        text("95", ww * 0.48, hh * 0.62);
      } else {
        text("99", ww * 0.48, hh * 0.62);
      }
      if (frameCount % 30 < 15) {
        text("Click to restart!", 392, 568);
      }

      // ci.textSize(7);
      // ci.rect(ci.width / 2, ci.height / 2, ci.width / 2, ci.width / 2, ci.width * 0.02);
      // //  ci.rect(ci.width / 2, ci.height / 2 + ci.height * 0.15, ci.width * 0.2, ci.height * 0.06);
      // ci.text("GAME OVER", ci.width / 2, ci.height / 2 + ci.height * 0.15, ci.width * 0.2, ci.height * 0.06);
      // image(cv_inte, ww / 2, hh / 2, ww, hh); //interface
      break;
    default:
      alert("Unexpected error, please reload the page.");
      break;
  }
  //game time display
  push();
  fill(255);
  const gp_min = floor(gameTimeDuration / 60000);
  const gp_sec = floor((gameTimeDuration % 60000) / 1000);
  let gp_sec_f = gp_sec < 10 ? "0" + gp_sec : gp_sec;
  textSize(65);
  //game time
  text(gp_min + " : " + gp_sec_f, ww * 0.2, hh * 0.92);
  textSize(20);
  //next task seconds text
  text(floor(gameTaskTimeNext / fr) + " sec", ww * 0.86, hh * 0.94);
  text("Next Task in", ww * 0.72, hh * 0.94);
  //
  textSize(20);
  textAlign(LEFT);
  //current task text
  text("cur:" + gameTaskCurrent, ww * 0.1, hh * 0.88);
  //arrow
  push();
  translate(404, 771);
  rotate(-90 + (gameAnxiousValue / gameAnxiousValueMax) * 180);
  translate(0, -img_obj.arrow.height / 2);
  image(img_obj.arrow, 0, 0);
  pop();
  //anxious value text
  push();
  if (gameAnxiousValue > 300) {
    if (frameCount % 20 < 10) {
      fill(255, 120, 120);
      text(gameAnxiousValue, ww * 0.493, hh * 0.95);
    }
  } else {
    text(gameAnxiousValue, ww * 0.493, hh * 0.95);
  }

  pop();
  //next task time process
  push();
  rectMode(CORNER);
  fill(25, 230, 70);
  noStroke();
  rect(510, 711, 203 * (gameTaskTimeNext / gameTaskTimeGap), 19);
  pop();
  pop();
  //dev stuff////////////////////////////////////////
  //draw grids
  // grids.forEach((g) => {
  //   g.display();
  // });
  // text(int(mouseX) + "," + int(mouseY), 50, 50);
  //////////////////////////////////////////////////
  //show the value change ani
  if (gameAnxiousValue_post != gameAnxiousValue) {
    let re = gameAnxiousValue - gameAnxiousValue_post;
    if (re > 0) {
      gameAnxiousValue_change = "+" + String(re);
    } else {
      gameAnxiousValue_change = String(re);
    }
    gameAnxiousValue_change_diaplay_timer = millis();
  }
  push();

  if (gameAnxiousValue_change) {
    let timer = millis() - gameAnxiousValue_change_diaplay_timer;
    let timerM = map(timer, 0, 1000, 0, 1);
    fill(220, 20, 20);
    stroke(255);
    textSize(70);
    textAlign(CENTER);
    if (timer < 1000) {
      text(gameAnxiousValue_change, width / 2, height * 0.9 - easeInQuart(timerM) * 50);
    } else {
      gameAnxiousValue_change = ![];
    }
  }
  pop();
}
function easeInQuart(x) {
  return x * x * x * x;
}
class Grid {
  constructor(x, y) {
    this.coor = createVector(x, y);
    this.p = createVector(this.coor.x * grid_size, this.coor.y * grid_size);
    this.size = grid_size;
    this.clr = color(255, 0);
  }
  display() {
    push();
    rectMode(CORNER);
    translate(this.p.x, this.p.y);
    fill(this.clr);
    stroke(0, 20);
    strokeWeight(2);
    rect(0, 0, this.size, this.size);
    noStroke();
    fill(0, 50);
    text(this.coor.x + "," + this.coor.y, 15, 10);
    pop();
  }
}

function mousePressed() {
  //game start button
  switch (gameStatus) {
    case "standby":
      break;
    case "welcome":
      //click the play button
      // if (mouseX < 480 && mouseX > 320 && mouseY < 540 && mouseY > 498) {
      //   gameStatus = "instruction";
      // }
      if (mouseX < 371 && mouseX > 264 && mouseY < 543 && mouseY > 517) {
        //set a player
        obj_player = new Player("boy");
        obj_player.moving = false;
        gameStatus = "instruction";
      } else if (mouseX < 540 && mouseX > 429 && mouseY < 543 && mouseY > 517) {
        obj_player = new Player("girl");
        obj_player.moving = false;
        gameStatus = "instruction";
      }
      break;
    case "instruction":
      //click the start button
      if (mouseX < 480 && mouseX > 320 && mouseY < 540 && mouseY > 498) {
        gameStatus = "play";
        gameTimeStart = millis();
      }
      break;
    case "play":
      //game area click
      if (mouseY < 680 && mouseX > 40 && mouseX < 800 && mouseY > 160) {
        if (gameEventCurrent !== "sleep") {
          userClickNewPosition = true;
          obj_player.mousePressed(mouseX, mouseY);
        }
      } else if (mouseX > 20 && mouseX < 80 && mouseY > 700 && mouseY < 760) {
        // gamePlayerPanelDisplay = !gamePlayerPanelDisplay;
      } else if (mouseX > 740 && mouseY > 720) {
        gameStatus = "pause";
      }
      //click on doable items activate it
      function clickDoableItems(event, x1, x2, y1, y2) {
        //check if it is doable
        if (gameEventDoable[event]) {
          //check the click is on right position
          if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
            //check if the event is not happenning, not active event timeleft is set to -1
            if (gameEventDoing[event].timeleft == -1 && gameEventDoing[event].cdtL == -1 && !gameEventActive) {
              //if condition met, activate the event
              gameEventDoing[event].active = true;
              // console.log(event, "activate");
            }
          }
        }
      }
      clickDoableItems("use_datingApp", 120, 156, 365, 398);
      clickDoableItems("put_on_headphone", 321, 359, 199, 238);
      clickDoableItems("use_pesticides", 720, 760, 440, 480);
      clickDoableItems("play_music", 479, 562, 120, 167);
      clickDoableItems("eat_biscuit", 120, 160, 520, 560);
      clickDoableItems("go_for_a_walk", 760, 800, 480, 600);
      clickDoableItems("sleep", 40, 240, 222, 352);
      clickDoableItems("drink_tea", 40, 80, 520, 560);
      clickDoableItems("cook", 680, 760, 280, 373);
      clickDoableItems("read_a_book", 283, 313, 219, 254);
      clickDoableItems("play_video_game", 326, 390, 402, 473);
      clickDoableItems("watch_tv", 373, 426, 187, 229);
      clickDoableItems("water_plants", 721, 754, 600, 676);
      clickDoableItems("turn_on_heater", 489, 631, 641, 676);
      clickDoableItems("singing", 80, 120, 560, 600);
      //cry
      if (mouseX > 18 && mouseX < 51 && mouseY > 702 && mouseY < 740) {
        //check if the event is not happenning, not active event timeleft is set to -1
        if (gameEventDoing.cry.timeleft == -1 && gameEventDoing.cry.cdtL == -1 && !gameEventActive) {
          //if condition met, activate the event
          gameEventDoing.cry.active = true;
          // console.log("cry", "activate");
        }
      }
      break;
    case "pause":
      if (mouseX < 496 && mouseX > 312 && mouseY < 465 && mouseY > 419) {
        gameStatus = "play";
        // console.log(gameStatus);
      }
      break;
    case "over":
      if (mouseX < 193 && mouseX > 600 && mouseY < 193 && mouseY > 688) {
        location.reload();
      }
      break;
    default:
      break;
  }

  //grid line truns red

  // grids.forEach((g) => {
  //   if (dist(mouseX, mouseY, g.p.x, g.p.y) < grid_size / 2) {
  //     g.clr = color(255, 0, 0);
  //   }
  // });

  // console.table({ mouseX, mouseY });
  // prevent default
  return false;
}

class Player {
  constructor(type) {
    // this.pIm = player_img; //player image
    this.coor = { x: 10, y: 10 };
    this.targetCoor = { x: 10, y: 10 };
    this.pos = createVector(10 * grid_size, 10 * grid_size);
    this.posCenter = 0; //this.pos.copy().add(0.5 * grid_size, 0.5 * grid_size);
    this.speed = 3;
    this.event = "";
    this.heading = 0;
    this.targetPoint = this.pos.copy();
    this.moving = false;
    this.position = "";
    this.position_move = "";
    this.obstructs = false;
    this.ahead_pos = [];
    this.ahead_coor = {};
    this.type = type;
    this.emo = "calm";
    this.dialogue = "";
    this.player = {
      calm: {
        front: {
          hand: {
            sleep: { sprite: {}, animation: [] },
            tea: { sprite: {}, animation: [] },
            water: { sprite: {}, animation: [] },
            headphone: { sprite: {}, animation: [] },
            music: { sprite: {}, animation: [] },
            phone: { sprite: {}, animation: [] },
            sing: { sprite: {}, animation: [] },
            cookie: { sprite: {}, animation: [] },
            book: { sprite: {}, animation: [] },
            bugs: { sprite: {}, animation: [] },
            cook: { sprite: {}, animation: [] },
          },
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
        back: {
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
        right: {
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
        left: {
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
      },
      anger: {
        front: {
          hand: {
            sleep: { sprite: {}, animation: [] },
            tea: { sprite: {}, animation: [] },
            water: { sprite: {}, animation: [] },
            headphone: { sprite: {}, animation: [] },
            music: { sprite: {}, animation: [] },
            phone: { sprite: {}, animation: [] },
            sing: { sprite: {}, animation: [] },
            cookie: { sprite: {}, animation: [] },
            book: { sprite: {}, animation: [] },
            bugs: { sprite: {}, animation: [] },
            cook: { sprite: {}, animation: [] },
          },
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
        right: {
          walk: { sprite: {}, animation: [] },
        },
        left: {
          walk: { sprite: {}, animation: [] },
        },
      },
      sad: {
        front: {
          hand: {
            sleep: { sprite: {}, animation: [] },
            tea: { sprite: {}, animation: [] },
            water: { sprite: {}, animation: [] },
            headphone: { sprite: {}, animation: [] },
            music: { sprite: {}, animation: [] },
            phone: { sprite: {}, animation: [] },
            sing: { sprite: {}, animation: [] },
            cookie: { sprite: {}, animation: [] },
            book: { sprite: {}, animation: [] },
            bugs: { sprite: {}, animation: [] },
            cook: { sprite: {}, animation: [] },
          },
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
        right: {
          walk: { sprite: {}, animation: [] },
        },
        left: {
          walk: { sprite: {}, animation: [] },
        },
      },
      anxious: {
        front: {
          hand: {
            sleep: { sprite: {}, animation: [] },
            tea: { sprite: {}, animation: [] },
            water: { sprite: {}, animation: [] },
            headphone: { sprite: {}, animation: [] },
            music: { sprite: {}, animation: [] },
            phone: { sprite: {}, animation: [] },
            sing: { sprite: {}, animation: [] },
            cookie: { sprite: {}, animation: [] },
            book: { sprite: {}, animation: [] },
            bugs: { sprite: {}, animation: [] },
            cook: { sprite: {}, animation: [] },
          },
          normal: { sprite: {}, animation: [] },
          walk: { sprite: {}, animation: [] },
        },
        right: {
          walk: { sprite: {}, animation: [] },
        },
        left: {
          walk: { sprite: {}, animation: [] },
        },
      },
    };

    this.doableEvent = doableEvent(this.coor.x, this.coor.y);

    function setSprite(JSONsrc, IMGsrc, cat, thisplayerLoc, speed) {
      let w = Object.entries(JSONsrc).filter(([key]) => key.includes(cat));
      // console.log(w.length);
      for (let i = 0; i < w.length; i++) {
        let pos = w[i][1].frame;
        // console.log(pos);
        let img = IMGsrc.get(pos.x, pos.y, pos.w, pos.h);
        thisplayerLoc.animation.push(img);
      }
      // console.log(thisplayerLoc);
      thisplayerLoc.sprite = new Sprite(thisplayerLoc.animation, 0, 0, speed);
      // above constructor(animation, x, y, speed)
    }
    let an_calm = img_player[this.type].calm;
    let an_anger = img_player[this.type].anger;
    let an_sad = img_player[this.type].sad;
    let an_a = img_player[this.type].anxious;

    setSprite(an_calm.json.frames, an_calm.img, "front/normal", this.player.calm.front.normal, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/walk", this.player.calm.front.walk, 0.3);
    setSprite(an_calm.json.frames, an_calm.img, "back/walk", this.player.calm.back.walk, 0.3);
    // setSprite(an_calm.json.frames, an_calm.img, "right/normal", this.player.calm.right.normal, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "right/walk", this.player.calm.right.walk, 0.3);
    // setSprite(an_calm.json.frames, an_calm.img, "left/normal", this.player.calm.left.normal, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "left/walk", this.player.calm.left.walk, 0.3);
    //hand
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/sleep", this.player.calm.front.hand.sleep, 0.04);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/tea", this.player.calm.front.hand.tea, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/water", this.player.calm.front.hand.water, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/headphone", this.player.calm.front.hand.headphone, 0.06);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/music", this.player.calm.front.hand.music, 0.03);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/phone", this.player.calm.front.hand.phone, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/sing", this.player.calm.front.hand.sing, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/cookie", this.player.calm.front.hand.cookie, 0.15);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/book", this.player.calm.front.hand.book, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/bugs", this.player.calm.front.hand.bugs, 0.1);
    setSprite(an_calm.json.frames, an_calm.img, "front/hand/cookk", this.player.calm.front.hand.cook, 0.1);

    setSprite(an_anger.json.frames, an_anger.img, "front/normal", this.player.anger.front.normal, 0.1);
    setSprite(an_anger.json.frames, an_anger.img, "front/walk", this.player.anger.front.walk, 0.1);
    // setSprite(an_anger.json.frames, an_anger.img, "right/normal", this.player.anger.right.normal, 0.1);
    setSprite(an_anger.json.frames, an_anger.img, "right/walk", this.player.anger.right.walk, 0.1);
    // setSprite(an_anger.json.frames, an_anger.img, "left/normal", this.player.anger.left.normal, 0.1);
    setSprite(an_anger.json.frames, an_anger.img, "left/walk", this.player.anger.left.walk, 0.1);
    //hand
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/sleep", this.player.anger.front.hand.sleep, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/tea", this.player.anger.front.hand.tea, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/water", this.player.anger.front.hand.water, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/headphone", this.player.anger.front.hand.headphone, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/music", this.player.anger.front.hand.music, 0.05);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/phone", this.player.anger.front.hand.phone, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/sing", this.player.anger.front.hand.sing, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/cookie", this.player.anger.front.hand.cookie, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/book", this.player.anger.front.hand.book, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/bugs", this.player.anger.front.hand.bugs, 0.3);
    setSprite(an_anger.json.frames, an_anger.img, "front/hand/cookk", this.player.anger.front.hand.cook, 0.1);

    setSprite(an_sad.json.frames, an_sad.img, "front/normal", this.player.sad.front.normal, 0.1);
    setSprite(an_sad.json.frames, an_sad.img, "front/walk", this.player.sad.front.walk, 0.1);
    // setSprite(an_sad.json.frames, an_sad.img, "right/normal", this.player.sad.right.normal, 0.1);
    setSprite(an_sad.json.frames, an_sad.img, "right/walk", this.player.sad.right.walk, 0.1);
    // setSprite(an_sad.json.frames, an_sad.img, "left/normal", this.player.sad.left.normal, 0.1);
    setSprite(an_sad.json.frames, an_sad.img, "left/walk", this.player.sad.left.walk, 0.1);
    //hand
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/sleep", this.player.sad.front.hand.sleep, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/tea", this.player.sad.front.hand.tea, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/water", this.player.sad.front.hand.water, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/headphone", this.player.sad.front.hand.headphone, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/music", this.player.sad.front.hand.music, 0.05);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/phone", this.player.sad.front.hand.phone, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/sing", this.player.sad.front.hand.sing, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/cookie", this.player.sad.front.hand.cookie, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/book", this.player.sad.front.hand.book, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/bugs", this.player.sad.front.hand.bugs, 0.3);
    setSprite(an_sad.json.frames, an_sad.img, "front/hand/cookk", this.player.sad.front.hand.cook, 0.1);

    setSprite(an_a.json.frames, an_a.img, "front/normal", this.player.anxious.front.normal, 0.1);
    setSprite(an_a.json.frames, an_a.img, "front/walk", this.player.anxious.front.walk, 0.1);
    // setSprite(an_a.json.frames, an_a.img, "right/normal", this.player.anxious.right.normal, 0.1);
    setSprite(an_a.json.frames, an_a.img, "right/walk", this.player.anxious.right.walk, 0.1);
    // setSprite(an_a.json.frames, an_a.img, "left/normal", this.player.anxious.left.normal, 0.1);
    setSprite(an_a.json.frames, an_a.img, "left/walk", this.player.anxious.left.walk, 0.1);
    //hand
    setSprite(an_a.json.frames, an_a.img, "front/hand/sleep", this.player.anxious.front.hand.sleep, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/tea", this.player.anxious.front.hand.tea, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/water", this.player.anxious.front.hand.water, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/headphone", this.player.anxious.front.hand.headphone, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/music", this.player.anxious.front.hand.music, 0.03);
    setSprite(an_a.json.frames, an_a.img, "front/hand/phone", this.player.anxious.front.hand.phone, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/sing", this.player.anxious.front.hand.sing, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/cookie", this.player.anxious.front.hand.cookie, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/book", this.player.anxious.front.hand.book, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/bugs", this.player.anxious.front.hand.bugs, 0.3);
    setSprite(an_a.json.frames, an_a.img, "front/hand/cookk", this.player.anxious.front.hand.cook, 0.1);
  }
  display() {
    //sound///
    if (this.moving && !sound_task.footStep.isLooping()) {
      sound_task.footStep.loop();
    } else if (!this.moving) {
      sound_task.footStep.pause();
    }
    ///// /////
    push();
    if (this.position !== "sleep") {
      translate(this.pos.x, this.pos.y); //to grid 0,0
      translate(grid_size / 2, grid_size); // to grid center bottom
    } else {
      translate(142, 345);
    }

    if (gamePlayerPanelDisplay) {
      push();
      fill(255);
      rect(0, 50, 60, 100);
      fill(0, 255, 0);
      // ellipse(0, 0, 10);
      fill(0, 20, 255);
      text(this.position, 0, 20);
      text(this.position_move, 0, 30);
      text(this.coor.x + "," + this.coor.y, 0, 40);
      text(int(this.heading), 0, 50);
      text(this.obstructs, 0, 60);
      text(this.ahead_coor.x + "," + this.ahead_coor.y, 0, 70);
      text(this.doableEvent, 0, 80);
      text(this.moving, 0, 90);
      pop();
    }

    push();
    translate(0, -124 * 0.5);

    if (this.emo == "calm") {
      if (this.position_move) {
        switch (this.position_move) {
          case "up":
            this.player.calm.back.walk.sprite.show();
            break;
          case "down":
            this.player.calm.front.walk.sprite.show();
            break;
          case "left":
            this.player.calm.left.walk.sprite.show();
            break;
          case "right":
            this.player.calm.right.walk.sprite.show();
            break;
          default:
            this.player.calm.front.normal.sprite.show();
            break;
        }
      } else {
        switch (this.position) {
          case "turn_on_heater":
            this.player.calm.front.normal.sprite.show();
            play_event_sound_tp("heater");
            break;
          case "watch_tv":
            this.player.calm.front.normal.sprite.show();
            play_event_sound_tp("tv");
            break;
          case "cry":
            this.player.sad.front.normal.sprite.show();
            play_event_sound_tp("cry");
            break;
          case "cook":
            this.player.calm.front.hand.cook.sprite.show();
            play_event_sound_tp("cooking");
            break;
          case "play_video_game":
            this.player.calm.front.hand.music.sprite.show();
            play_event_sound_tp("game");
            break;
          case "play_music":
            this.player.calm.front.hand.music.sprite.show();
            play_event_sound_tp("playMusic");
            break;
          case "use_datingApp":
            this.player.calm.front.hand.phone.sprite.show();
            play_event_sound_tp("phoneNotification");
            break;
          case "eat_biscuit":
            this.player.calm.front.hand.cookie.sprite.show();
            play_event_sound_tp("eatBiscuits");
            break;
          case "put_on_headphone":
            this.player.calm.front.hand.headphone.sprite.show();
            play_event_sound_tp("headphone");
            break;
          case "use_pesticides":
            this.player.calm.front.hand.bugs.sprite.show();
            play_event_sound_tp("pesticideSpray");
            break;
          case "sleep":
            this.player.calm.front.hand.sleep.sprite.show();
            play_event_sound_tp("sleep");
            break;
          case "drink_tea":
            this.player.calm.front.hand.tea.sprite.show();
            play_event_sound_tp("drink");
            break;
          case "read_a_book":
            this.player.calm.front.hand.book.sprite.show();
            play_event_sound_tp("bookPageTurn");
            break;
          case "water_plants":
            this.player.calm.front.hand.water.sprite.show();
            play_event_sound_tp("wateringPlant");
            break;
          case "singing":
            this.player.calm.front.hand.sing.sprite.show();
            if (this.type == "girl") {
              play_event_sound_tp("girlSing");
            } else {
              play_event_sound_tp("boySing");
            }
            break;

          case "go_for_a_walk":
            // this.player.calm.front.hand.sing.sprite.show();
            play_event_sound_tp("walk");
            break;
          case "":
            this.player.calm.front.normal.sprite.show();
            play_event_sound_tp("reset");
            break;
          default:
            this.player.calm.front.normal.sprite.show();
            play_event_sound_tp("reset");
            break;
        }
      }
    } else if (this.emo == "anxious") {
      if (this.position_move) {
        switch (this.position_move) {
          case "up":
            this.player.calm.back.walk.sprite.show();
            break;
          case "down":
            this.player.anxious.front.walk.sprite.show();
            break;
          case "left":
            this.player.anxious.left.walk.sprite.show();
            break;
          case "right":
            this.player.anxious.right.walk.sprite.show();
            break;
          default:
            this.player.anxious.front.normal.sprite.show();
            break;
        }
      } else {
        switch (this.position) {
          case "turn_on_heater":
            this.player.anxious.front.normal.sprite.show();
            play_event_sound_tp("heater");
            break;
          case "watch_tv":
            this.player.anxious.front.normal.sprite.show();
            play_event_sound_tp("tv");
            break;
          case "cry":
            this.player.sad.front.normal.sprite.show();
            play_event_sound_tp("cry");
            break;
          case "cook":
            this.player.anxious.front.hand.cook.sprite.show();
            play_event_sound_tp("cooking");
            break;
          case "play_video_game":
            this.player.anxious.front.hand.music.sprite.show();
            play_event_sound_tp("game");
            break;
          case "play_music":
            this.player.anxious.front.hand.music.sprite.show();
            play_event_sound_tp("playMusic");
            break;
          case "use_datingApp":
            this.player.anxious.front.hand.phone.sprite.show();
            play_event_sound_tp("phoneNotification");
            break;
          case "eat_biscuit":
            this.player.anxious.front.hand.cookie.sprite.show();
            play_event_sound_tp("eatBiscuits");
            break;
          case "put_on_headphone":
            this.player.anxious.front.hand.headphone.sprite.show();
            play_event_sound_tp("headphone");
            break;
          case "use_pesticides":
            this.player.anxious.front.hand.bugs.sprite.show();
            play_event_sound_tp("pesticideSpray");
            break;
          case "sleep":
            this.player.anxious.front.hand.sleep.sprite.show();
            play_event_sound_tp("sleep");
            break;
          case "drink_tea":
            this.player.anxious.front.hand.tea.sprite.show();
            play_event_sound_tp("drink");
            break;
          case "read_a_book":
            this.player.anxious.front.hand.book.sprite.show();
            play_event_sound_tp("bookPageTurn");
            break;
          case "water_plants":
            this.player.anxious.front.hand.water.sprite.show();
            play_event_sound_tp("wateringPlant");
            break;
          case "singing":
            this.player.anxious.front.hand.sing.sprite.show();
            if (this.type == "girl") {
              play_event_sound_tp("girlSing");
            } else {
              play_event_sound_tp("boySing");
            }
            break;
          case "go_for_a_walk":
            // this.player.anxious.front.hand.sing.sprite.show();
            play_event_sound_tp("walk");
            break;
          case "":
            this.player.anxious.front.normal.sprite.show();
            play_event_sound_tp("reset");
            break;
          default:
            this.player.anxious.front.normal.sprite.show();
            play_event_sound_tp("reset");
            break;
        }
      }
    } else if (this.emo == "anger") {
      if (this.position_move) {
        switch (this.position_move) {
          case "up":
            this.player.calm.back.walk.sprite.show();
            break;
          case "down":
            this.player.anger.front.walk.sprite.show();
            break;
          case "left":
            this.player.anger.left.walk.sprite.show();
            break;
          case "right":
            this.player.anger.right.walk.sprite.show();
            break;
          default:
            this.player.anger.front.normal.sprite.show();
            break;
        }
      } else {
        switch (this.position) {
          case "turn_on_heater":
            this.player.anger.front.normal.sprite.show();
            play_event_sound_tp("heater");
            break;
          case "watch_tv":
            this.player.anger.front.normal.sprite.show();
            play_event_sound_tp("tv");
            break;
          case "cry":
            this.player.sad.front.normal.sprite.show();
            play_event_sound_tp("cry");
            break;
          case "cook":
            this.player.anger.front.hand.cook.sprite.show();
            play_event_sound_tp("cooking");
            break;
          case "play_video_game":
            this.player.anger.front.hand.music.sprite.show();
            play_event_sound_tp("game");
            break;
          case "play_music":
            this.player.anger.front.hand.music.sprite.show();
            play_event_sound_tp("playMusic");
            break;
          case "use_datingApp":
            this.player.anger.front.hand.phone.sprite.show();
            play_event_sound_tp("phoneNotification");
            break;
          case "eat_biscuit":
            this.player.anger.front.hand.cookie.sprite.show();
            play_event_sound_tp("eatBiscuits");
            break;
          case "put_on_headphone":
            this.player.anger.front.hand.headphone.sprite.show();
            play_event_sound_tp("headphone");
            break;
          case "use_pesticides":
            this.player.anger.front.hand.bugs.sprite.show();
            play_event_sound_tp("pesticideSpray");
            break;
          case "sleep":
            this.player.anger.front.hand.sleep.sprite.show();
            play_event_sound_tp("sleep");
            break;
          case "drink_tea":
            this.player.anger.front.hand.tea.sprite.show();
            play_event_sound_tp("drink");
            break;
          case "read_a_book":
            this.player.anger.front.hand.book.sprite.show();
            play_event_sound_tp("bookPageTurn");
            break;
          case "water_plants":
            this.player.anger.front.hand.water.sprite.show();
            play_event_sound_tp("wateringPlant");
            break;
          case "singing":
            this.player.anger.front.hand.sing.sprite.show();
            if (this.type == "girl") {
              play_event_sound_tp("girlSing");
            } else {
              play_event_sound_tp("boySing");
            }
            break;
          case "go_for_a_walk":
            // this.player.anger.front.hand.sing.sprite.show();
            play_event_sound_tp("walk");
            break;
          case "":
            this.player.anger.front.normal.sprite.show();
            play_event_sound_tp("reset");
            break;
          default:
            this.player.anger.front.normal.sprite.show();
            play_event_sound_tp("reset");
            break;
        }
      }
    }
    if (gameTaskDialogue) {
      image(img_dialogue[gameTaskDialogue], 0, -80);
    }
    if (gameEventActive) {
      let arcd = gameEventCurrentTimeLeft;
      // cv_plpop.clear();
      // cv_plpop.push();
      // cv_plpop.translate(this.pos.x, this.pos.y); //to grid 0,0
      // cv_plpop.translate(grid_size / 2, grid_size); // to grid center bottom
      // cv_plpop.translate(0, -124 * 1.2);
      // cv_plpop.stroke(255);
      // cv_plpop.fill(0, 100);
      // cv_plpop.arc(0, 0, 35, 35, 0, 360 * arcd, PIE);
      // cv_plpop.pop();
      // image(cv_plpop, ww / 3, hh / 2, ww, hh);
      translate(0, -124 * 0.6);
      stroke(255);
      fill(0, 100);
      arc(0, 0, 35, 35, 0, 360 * arcd, PIE);
    }

    pop();
    pop();
    // ellipse(this.posCenter.x, this.posCenter.y, 10);
  }
  update() {
    //update pos centerpoint
    this.posCenter = this.pos.copy().add(0.5 * grid_size, 0.5 * grid_size);
    //convert target coor to target pos
    this.targetPoint.x = this.targetCoor.x * grid_size;
    this.targetPoint.y = this.targetCoor.y * grid_size;

    //create a direction movement
    let direction = p5.Vector.sub(this.targetPoint, this.pos);
    direction.normalize();
    direction.mult(this.speed);

    //update the coor using current pos
    this.coor.x = round(this.pos.x / grid_size);
    this.coor.y = round(this.pos.y / grid_size);

    //detecting the next possible character location
    this.ahead_pos = this.posCenter.copy().add(direction.copy().mult((grid_size * 0.6) / this.speed));
    this.ahead_coor.x = floor(this.ahead_pos.x / grid_size);
    this.ahead_coor.y = floor(this.ahead_pos.y / grid_size);

    //check doable event on standing position
    if (!this.moving) {
      this.doableEvent = doableEvent(this.coor.x, this.coor.y);
    } else {
      this.doableEvent = false;
    }
    //active events
    if (gameEventActive) {
      this.position = gameEventCurrent;
    } else {
      this.position = "";
    }
    // text(this.emo, 300, 300);
    //emotion display
    if (gameAnxiousValue < 200) {
      this.emo = "calm";
    } else if (gameAnxiousValue < 300) {
      this.emo = "anxious";
    } else {
      //if more than 400 to 600
      this.emo = "anger";
    }
    //moving function
    if (!this.obstructs) {
      this.obstructs = hitObstructs(this.ahead_coor.x, this.ahead_coor.y);
      // user click new position
      if (this.pos.dist(this.targetPoint) > this.speed) {
        this.pos.add(direction);
        this.moving = true;
      } else {
        this.moving = false;
      }
      //update heading to control the facing
      this.heading = direction.heading();
    } else {
      if (userClickNewPosition) {
        this.obstructs = false;
        userClickNewPosition = false;
      } else {
        //if there is an obstruct forward
        this.pos.x = this.coor.x * grid_size;
        this.pos.y = this.coor.y * grid_size;
        this.heading = null;
        this.moving = false;
        // console.log("bumped");
      }
    }
    //updating the this.position_move moving direction
    if (this.moving) {
      if (this.heading == null) {
        this.position_move = "";
      } else if (abs(this.heading) < 60) {
        //go right
        this.position_move = "right";
      } else if (abs(this.heading) > 120) {
        //go left
        this.position_move = "left";
      } else if (this.heading > 0) {
        //go down
        this.position_move = "down";
      } else if (this.heading < 0) {
        //go up
        this.position_move = "up";
      }
    } else {
      this.position_move = "";
    }
  }
  //end of player update

  mousePressed(moX, moY) {
    this.targetCoor.x = floor(moX / grid_size);
    this.targetCoor.y = floor(moY / grid_size);
    // console.table(this.targetCoor);
  }
}
//end of player class
// function activeEvent(coorx, coory, moving) {
//   if (!moving) {
//     for (let e of event_trigger_location) {
//       if (e.x == coorx && e.y == coory) {
//         return e;
//       }
//     }
//     return false;
//   }
// }

function hitObstructs(coorx, coory) {
  let cr = obstructs[coory][coorx];
  if (cr !== 2) {
    //if it is not 2, it not a avilible walking space
    return true;
  } else {
    return false;
  }
}

function newTask() {
  // let cTask = random(event_tasks);
  let cTask = random(event_tasks);
  // gameTaskCurrent = "neighbour_noise";
  gameTaskCurrent = cTask.anx_event;
  gameAnxiousValue += cTask.anx_value;
  gameTaskDialogue = gameTaskCurrent;
  setTimeout(() => {
    gameTaskDialogue = "";
  }, 5000);
  switch (gameTaskCurrent) {
    case "fire_alarm":
      sound_task.smokeAlarm.loop();
      event_tasks_active.fire_alarm = true;
      setTimeout(() => {
        sound_task.smokeAlarm.stop();
        event_tasks_active.fire_alarm = false;
      }, 5000);
      break;
    case "ambulance_siren":
      sound_task.ambulance.loop();
      event_tasks_active.ambulance_siren = true;
      setTimeout(() => {
        sound_task.ambulance.stop();
        event_tasks_active.ambulance_siren = false;
      }, 10000);
      break;
    case "bugs":
      sound_task.bug.loop();
      event_tasks_active.bugs = true;
      setTimeout(() => {
        sound_task.bug.stop();
        event_tasks_active.bugs = false;
      }, 5000);
      break;
    case "neighbour_noise":
      sound_task.neightbour.loop();
      event_tasks_active.neighbour_noise = true;
      setTimeout(() => {
        sound_task.neightbour.stop();
        event_tasks_active.neighbour_noise = false;
      }, 7000);
      break;
    case "hungry":
      sound_task.hungry.loop();
      event_tasks_active.hungry = true;
      setTimeout(() => {
        sound_task.hungry.stop();
        event_tasks_active.hungry = false;
      }, 4000);
      break;
    case "thundering":
      sound_task.thunder.loop();
      event_tasks_active.thundering = true;
      setTimeout(() => {
        sound_task.thunder.stop();
        event_tasks_active.thundering = false;
      }, 9000);
      break;
    case "windy":
      sound_task.wind.loop();
      event_tasks_active.windy = true;
      setTimeout(() => {
        sound_task.wind.stop();
        event_tasks_active.windy = false;
      }, 7500);
      break;
    case "no_internet":
      break;
    case "headache":
      break;
    case "cold_weather":
      break;
    case "tired":
      break;
    case "thirsty":
      break;
  }
  // console.log({ gameTaskCurrent });
}

function doableEvent(coorx, coory) {
  let ep = eventPositionMap[coory][coorx];
  if (ep !== 0 && ep !== 2) {
    let epd = eventPosition[ep];
    chooseAnEvent(epd);
    return epd;
  } else {
    return false;
  }
}

function chooseAnEvent(eventAvalible) {
  for (let event in gameEventDoable) {
    gameEventDoable[event] = false;
  }
  let eva = eventAvalible;
  if (eva[0]) {
    for (let e of eva) {
      gameEventDoable[e] = true;
    }
  }
}

//ex only once
// function startAnEvent(event) {
//   switch (event) {
//     case "use_datingApp":
//       //play sound
//       //count time
//       //substract anxious value
//       break;
//     case "sleep":
//       break;
//     case "play_video_game":
//       break;
//     case "read_a_book":
//       break;
//     case "put_on_headphone":
//       break;
//     case "watch_tv":
//       break;
//     case "use_pesticides":
//       break;
//     case "play_music":
//       break;
//     case "singing":
//       break;
//     case "eat_biscuit":
//       break;
//     case "go_for_a_walk":
//       break;
//     case "cry":
//       break;
//     case "drink_tea":
//       break;
//     case "cook":
//       break;
//     case "water_plants":
//       break;
//     case "turn_on_heater":
//       break;
//     default:
//       console.log("something worng");
//       break;
//   }
// }
//

function event_finish_count_score(curTask, curevent) {
  let score;
  // console.log({ curTask, curevent });
  sound_task.bell.play();
  if (curTask) {
    score = relifScore[curTask][curevent];
  } else {
    score = -25;
  }
  if (gameAnxiousValue >= -score) {
    gameAnxiousValue += score;
  } else {
    gameAnxiousValue = 0;
  }
}

//play_event_sound_from_this.position
function play_event_sound_tp(sound) {
  if (sound !== "reset") {
    let s = sound_task[sound];
    if (!s.isLooping()) {
      s.loop();
      // console.log("playing", sound);
      sound_event_playing_list.push(s);
    }
  } else {
    for (let s of sound_event_playing_list) {
      s.stop();
      // console.log("stop");
    }
    sound_event_playing_list = [];
  }
}
