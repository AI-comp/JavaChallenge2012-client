///<reference path='types/enchant.d.ts'/>
declare var enchant : enchant;

// In this context, enchant is module so it is not callable.
// Use window.enchant instead of 'enchant'.
interface Window {
  enchant: Function;
}
window.enchant();

module App {
  export class Field32 extends enchant.Sprite {
    constructor() {
      super(1024, 495);
      this.x = 0;
      this.y = 0;
      this.image = Game.game.assets['img/map32.png'];
    }
  }

  /*
  export class Map48 extends enchant.Sprite {
    constructor() {
      super(1280, 720);
      this.x = 0;
      this.y = 0;
      this.image = Game.game.assets['img/map48.png'];
    }
  }
  */

  export class Vein extends enchant.Group {
    constructor(obj){
      super();
      this.moveTo(obj["x"] * 32, obj["y"] * 32)

      var materialSprite = new enchant.Sprite(16, 16);
      materialSprite.frame = obj["kind"];
      materialSprite.image = Game.game.assets['img/material.png'];
      this.addChild(materialSprite);

      if (obj["owner"] != undefined) {
        var ownerSprite = new enchant.Sprite(16, 16);
        ownerSprite.frame = 6 + obj["owner"];
        ownerSprite.image = Game.game.assets['img/material.png'];
        this.addChild(ownerSprite);
      }
      Game.entities.push(this);
    }
  }

  export class Squad extends enchant.Group {
    constructor(obj){
      super();
      this.moveTo(obj["x"] * 32, obj["y"] * 32)

      var robotSprite = new enchant.Sprite(10, 9);
      robotSprite.frame = obj["owner"];
      robotSprite.image = Game.game.assets['img/robot.png'];
      this.addChild(robotSprite);

      Game.entities.push(this);
    }
  }

  export class Number extends enchant.Group {
    constructor(obj){
      super();
      this.moveTo(obj["x"], obj["y"])
      var numString:string = obj["number"] + "";
      var keta:number = numString.length;
      var color:number = obj["color"];
      var num:number = obj["number"];
      for (var i = keta-1 ; i >= 0 ; i--) {
        var digit = num % 10;
        num -= digit;
        num /= 10;

        var numSprite  = new enchant.Sprite(6, 9);
        numSprite.image = Game.game.assets['img/num.png'];
        numSprite.frame = color*10+digit;
        numSprite.x = i * 6;
        numSprite.y = 0;
        this.addChild(numSprite);
      }

      Game.entities.push(this);
    }
  }

  export class Hex32 extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(32, 32);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/hex32.png'];
    }
  }

  /*
  export class Hex48 extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(48, 48);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/hex48.png'];
    }
  }
  */

  export class Info extends enchant.Sprite {
    constructor(x: number, y: number, n: number) {
      var name = 'img/p' + n + '.png';

      super(304, 68);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets[name];
    }
  }

  export class Bank extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(304, 72);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/bank.png'];
    }
  }

  export class Sample extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(101, 70);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/veinSample.png'];
    }
  }

  export class Rnslash extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(32, 32);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/rnslash.png'];
    }
  }

  export class Rn0 extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(24, 32);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/rn0.png'];
    }
  }

  export class Rn2 extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(24, 32);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/rn2.png'];
    }
  }

  export class Game extends enchant.Game {
    public static game: Game;

    public static entities: enchant.Node[];

    constructor(x: number, y: number){
      super(x, y);
      Game.game = this;
      Game.entities = new Array();
      this.fps = 24;
      this.preload(['images/chara1.png', 'img/map48.png', 'img/material.png', 'img/robot.png', 'img/num.png']);
      this.preload(['img/map32.png', 'img/map48.png', 'img/hex32.png', 'img/hex48.png']);
      this.preload(['img/p0.png', 'img/p1.png', 'img/p2.png', 'img/p3.png', 'img/p4.png', 'img/p5.png'])
      this.preload(['img/bank.png']);
      this.preload(['img/veinSample.png']);
      this.preload(['img/rnslash.png', 'img/rn0.png', 'img/rn2.png'])


      this.onload = () => {
        var field = new Field32();
        this.rootScene.addChild(field);

        var hexSize = 32;
        var i, j;
        var posx = hexSize*4, posy = 12;
        for (i = 10; i < 20; i++) {
          posx = 192 - hexSize/2 * (i - 10);
          for (j = 0; j < i; j++) {
            var hex = new Hex32(posx, posy);
            this.rootScene.addChild(hex);

            posx += hexSize;
          }
          posy += hexSize*3/4;
        }
          
        for (i = 18; i > 9; i--) {
          posx = 192 - hexSize/2 * (i - 10);
          for (j = 0; j < i; j++) {
            var hex = new Hex32(posx, posy);
            this.rootScene.addChild(hex);
            posx += hexSize;
          }
          posy += hexSize*3/4;
        }

        posx = 1024-304;
        posy = 0;
        for (i = 0; i < 6; i++) {
          var info = new Info(posx, posy, i);
          this.rootScene.addChild(info);

          posy += 68;
        }

        var bank = new Bank(posx, posy);
        this.rootScene.addChild(bank);

        var sample = new Sample(0, 495-70);
        this.rootScene.addChild(sample);

        var rnslash = new Rnslash(80, 0);
        this.rootScene.addChild(rnslash);

        var rn2 = new Rn2(80+36, 0);
        this.rootScene.addChild(rn2);

        var rn0 = new Rn0(80+36+24, 0);
        this.rootScene.addChild(rn0);

        rn0 = new Rn0(80+36+24+24, 0);
        this.rootScene.addChild(rn0);
      };
    }

    update(gameInfo: string): void {
      var entityLength = Game.entities.length
      for (var i = 0 ; i < entityLength ; i++) {
        this.rootScene.removeChild(Game.entities[i])
      }

      var gameObjects = JSON.parse(gameInfo);
      Game.game.drawVeins(gameObjects.veins);
      Game.game.drawSquads(gameObjects.squads);
    }

    drawVeins(veins): void {
      var veinLength = veins.length
      for (var i = 0 ; i < veinLength ; i++) {
        var vein = new Vein(veins[i]);
        this.rootScene.addChild(vein);
      }
    }

    drawSquads(squads): void {
      var squadLength = squads.length
      for (var i = 0 ; i < squadLength ; i++) {
        var squad = new Squad(squads[i]);
        this.rootScene.addChild(squad);
      }
    }
  }
}

window.onload = () => {
  var game =  new App.Game(1024, 495);
  game.start();
};
