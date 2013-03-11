var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.enchant();
var App;
(function (App) {
    var Field32 = (function (_super) {
        __extends(Field32, _super);
        function Field32() {
                _super.call(this, 1024, 495);
            this.x = 0;
            this.y = 0;
            this.image = Game.game.assets['img/map32.png'];
        }
        return Field32;
    })(enchant.Sprite);
    App.Field32 = Field32;    
    var Hex32 = (function (_super) {
        __extends(Hex32, _super);
        function Hex32(x, y) {
                _super.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/hex32.png'];
        }
        return Hex32;
    })(enchant.Sprite);
    App.Hex32 = Hex32;    
    var Info = (function (_super) {
        __extends(Info, _super);
        function Info(x, y, n) {
            var name = 'img/p' + n + '.png';
                _super.call(this, 304, 68);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets[name];
        }
        return Info;
    })(enchant.Sprite);
    App.Info = Info;    
    var Bank = (function (_super) {
        __extends(Bank, _super);
        function Bank(x, y) {
                _super.call(this, 304, 72);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/bank.png'];
        }
        return Bank;
    })(enchant.Sprite);
    App.Bank = Bank;    
    var Sample = (function (_super) {
        __extends(Sample, _super);
        function Sample(x, y) {
                _super.call(this, 101, 70);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/veinSample.png'];
        }
        return Sample;
    })(enchant.Sprite);
    App.Sample = Sample;    
    var Rnslash = (function (_super) {
        __extends(Rnslash, _super);
        function Rnslash(x, y) {
                _super.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/rnslash.png'];
        }
        return Rnslash;
    })(enchant.Sprite);
    App.Rnslash = Rnslash;    
    var Rn0 = (function (_super) {
        __extends(Rn0, _super);
        function Rn0(x, y) {
                _super.call(this, 24, 32);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/rn0.png'];
        }
        return Rn0;
    })(enchant.Sprite);
    App.Rn0 = Rn0;    
    var Rn2 = (function (_super) {
        __extends(Rn2, _super);
        function Rn2(x, y) {
                _super.call(this, 24, 32);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/rn2.png'];
        }
        return Rn2;
    })(enchant.Sprite);
    App.Rn2 = Rn2;    
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(x, y) {
            var _this = this;
                _super.call(this, x, y);
            Game.game = this;
            this.fps = 24;
            this.preload([
                'img/map32.png', 
                'img/map48.png', 
                'img/hex32.png', 
                'img/hex48.png'
            ]);
            this.preload([
                'img/p0.png', 
                'img/p1.png', 
                'img/p2.png', 
                'img/p3.png', 
                'img/p4.png', 
                'img/p5.png'
            ]);
            this.preload([
                'img/bank.png'
            ]);
            this.preload([
                'img/veinSample.png'
            ]);
            this.preload([
                'img/rnslash.png', 
                'img/rn0.png', 
                'img/rn2.png'
            ]);
            this.onload = function () {
                var field = new Field32();
                _this.rootScene.addChild(field);
                var hexSize = 32;
                var i, j;
                var posx = hexSize * 4, posy = 12;
                for(i = 10; i < 20; i++) {
                    posx = 192 - hexSize / 2 * (i - 10);
                    for(j = 0; j < i; j++) {
                        var hex = new Hex32(posx, posy);
                        _this.rootScene.addChild(hex);
                        posx += hexSize;
                    }
                    posy += hexSize * 3 / 4;
                }
                for(i = 18; i > 9; i--) {
                    posx = 192 - hexSize / 2 * (i - 10);
                    for(j = 0; j < i; j++) {
                        var hex = new Hex32(posx, posy);
                        _this.rootScene.addChild(hex);
                        posx += hexSize;
                    }
                    posy += hexSize * 3 / 4;
                }
                posx = 1024 - 304;
                posy = 0;
                for(i = 0; i < 6; i++) {
                    var info = new Info(posx, posy, i);
                    _this.rootScene.addChild(info);
                    posy += 68;
                }
                var bank = new Bank(posx, posy);
                _this.rootScene.addChild(bank);
                var sample = new Sample(0, 495 - 70);
                _this.rootScene.addChild(sample);
                var rnslash = new Rnslash(80, 0);
                _this.rootScene.addChild(rnslash);
                var rn2 = new Rn2(80 + 36, 0);
                _this.rootScene.addChild(rn2);
                var rn0 = new Rn0(80 + 36 + 24, 0);
                _this.rootScene.addChild(rn0);
                rn0 = new Rn0(80 + 36 + 24 + 24, 0);
                _this.rootScene.addChild(rn0);
            };
        }
        return Game;
    })(enchant.Game);
    App.Game = Game;    
})(App || (App = {}));
window.onload = function () {
    var game = new App.Game(1024, 495);
    game.start();
};
