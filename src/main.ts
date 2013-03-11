///<reference path='types/enchant.d.ts'/>
declare var enchant : enchant;

// In this context, enchant is module so it is not callable.
// Use window.enchant instead of 'enchant'.
interface Window {
  enchant: Function;
}
window.enchant();

module App {
  export class Field extends enchant.Sprite {
    constructor() {
      super(1280, 720);
      this.x = 0;
      this.y = 0;
      this.image = Game.game.assets['img/map48.png'];
    }
  }

  export class Bear extends enchant.Sprite {
    constructor(){
      super(32, 32);
      this.x = 32;
      this.y = 32;
      this.image = Game.game.assets['images/chara1.png'];

      var self = this;
      this.on('enterframe', () => self.update());
    }

    update(): void {
      var input = Game.game.input
      if (input.right) this.x += 2;
      if (input.left)  this.x -= 2;
      if (input.up)    this.y -= 2;
      if (input.down)  this.y += 2;
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

  export class Hex48 extends enchant.Sprite {
    constructor(x: number, y: number) {
      super(48, 48);
      this.x = x;
      this.y = y;
      this.image = Game.game.assets['img/hex48.png'];
    }
  }

  export class Info extends enchant.Sprite {
    constructor(x: number, y: number, n: number) {
      var name = 'img/playerInfo/p' + n + '.png';

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

  export class Game extends enchant.Game {
    public static game: Game;
    constructor(x: number, y: number){
      super(x, y);
      Game.game = this;
      this.fps = 24;
      this.preload(['images/chara1.png', 'img/map48.png', 'img/hex32.png', 'img/hex48.png']);
      this.preload(['img/playerInfo/p0.png', 'img/playerInfo/p1.png', 'img/playerInfo/p2.png', 'img/playerInfo/p3.png', 'img/playerInfo/p4.png', 'img/playerInfo/p5.png'])
      this.preload(['img/bank.png']);
      this.onload = () => {
        var field = new Field();
        var bear = new Bear();
        this.rootScene.addChild(bear);
        this.rootScene.addChild(field);

        var i, j;
        var posx = 128, posy = 12;
        for (i = 10; i < 20; i++) {
          posx = 224 - 24 * (i - 10);
          for (j = 0; j < i; j++) {
            var hex48 = new Hex48(posx, posy);
            this.rootScene.addChild(hex48);

            posx += 48;
          }
          posy += 36;
        }
          
        for (i = 18; i > 9; i--) {
          posx = 224 - 24 * (i - 10);
          for (j = 0; j < i; j++) {
            var hex48 = new Hex48(posx, posy);
            this.rootScene.addChild(hex48);
            posx += 48;
          }
          posy += 36;
        }

        posx = 960;
        posy = 0;
        for (i = 0; i < 6; i++) {
          var info = new Info(posx, posy, i);
          this.rootScene.addChild(info);

          posy += 68;
        }

        var bank = new Bank(posx, posy);
        this.rootScene.addChild(bank);
      };
    }
  }
}

window.onload = () => {
  var game =  new App.Game(1280, 720);
  game.start();
};
