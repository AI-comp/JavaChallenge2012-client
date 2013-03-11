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

  export class Game extends enchant.Game {
    public static game: Game;
    constructor(x: number, y: number){
      super(x, y);
      Game.game = this;
      this.fps = 24;
      this.preload(['images/chara1.png', 'img/map48.png']);
      this.onload = () => {
        var field = new Field();
        var bear = new Bear();
        this.rootScene.addChild(field);
        this.rootScene.addChild(bear);
      };
    }
    update(gameInfo: string): void {
      var gameObjects = JSON.parse(gameInfo);
      //console.log(gameObjects);
    }
  }
}

window.onload = () => {
  var game =  new App.Game(1280, 720);
  game.start();
};
