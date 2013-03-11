var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.enchant();
var App;
(function (App) {
    var Field = (function (_super) {
        __extends(Field, _super);
        function Field() {
                _super.call(this, 1280, 720);
            this.x = 0;
            this.y = 0;
            this.image = Game.game.assets['img/map48.png'];
        }
        return Field;
    })(enchant.Sprite);
    App.Field = Field;    
    var Bear = (function (_super) {
        __extends(Bear, _super);
        function Bear() {
                _super.call(this, 32, 32);
            this.x = 32;
            this.y = 32;
            this.image = Game.game.assets['images/chara1.png'];
            var self = this;
            this.on('enterframe', function () {
                return self.update();
            });
        }
        Bear.prototype.update = function () {
            var input = Game.game.input;
            if(input.right) {
                this.x += 2;
            }
            if(input.left) {
                this.x -= 2;
            }
            if(input.up) {
                this.y -= 2;
            }
            if(input.down) {
                this.y += 2;
            }
        };
        return Bear;
    })(enchant.Sprite);
    App.Bear = Bear;    
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
    var Hex48 = (function (_super) {
        __extends(Hex48, _super);
        function Hex48(x, y) {
                _super.call(this, 48, 48);
            this.x = x;
            this.y = y;
            this.image = Game.game.assets['img/hex48.png'];
        }
        return Hex48;
    })(enchant.Sprite);
    App.Hex48 = Hex48;    
    var Info = (function (_super) {
        __extends(Info, _super);
        function Info(x, y, n) {
            var name = 'img/playerInfo/p' + n + '.png';
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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(x, y) {
            var _this = this;
                _super.call(this, x, y);
            Game.game = this;
            this.fps = 24;
            this.preload([
                'images/chara1.png', 
                'img/map48.png', 
                'img/hex32.png', 
                'img/hex48.png'
            ]);
            this.preload([
                'img/playerInfo/p0.png', 
                'img/playerInfo/p1.png', 
                'img/playerInfo/p2.png', 
                'img/playerInfo/p3.png', 
                'img/playerInfo/p4.png', 
                'img/playerInfo/p5.png'
            ]);
            this.preload([
                'img/bank.png'
            ]);
            this.onload = function () {
                var field = new Field();
                var bear = new Bear();
                _this.rootScene.addChild(bear);
                _this.rootScene.addChild(field);
                var i, j;
                var posx = 128, posy = 12;
                for(i = 10; i < 20; i++) {
                    posx = 224 - 24 * (i - 10);
                    for(j = 0; j < i; j++) {
                        var hex48 = new Hex48(posx, posy);
                        _this.rootScene.addChild(hex48);
                        posx += 48;
                    }
                    posy += 36;
                }
                for(i = 18; i > 9; i--) {
                    posx = 224 - 24 * (i - 10);
                    for(j = 0; j < i; j++) {
                        var hex48 = new Hex48(posx, posy);
                        _this.rootScene.addChild(hex48);
                        posx += 48;
                    }
                    posy += 36;
                }
                posx = 960;
                posy = 0;
                for(i = 0; i < 6; i++) {
                    var info = new Info(posx, posy, i);
                    _this.rootScene.addChild(info);
                    posy += 68;
                }
                var bank = new Bank(posx, posy);
                _this.rootScene.addChild(bank);
            };
        }
        return Game;
    })(enchant.Game);
    App.Game = Game;    
})(App || (App = {}));
window.onload = function () {
    var game = new App.Game(1280, 720);
    game.start();
};
