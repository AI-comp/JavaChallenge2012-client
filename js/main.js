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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(x, y) {
            var _this = this;
                _super.call(this, x, y);
            Game.game = this;
            this.fps = 24;
            this.preload([
                'images/chara1.png', 
                'img/map48.png'
            ]);
            this.onload = function () {
                var field = new Field();
                var bear = new Bear();
                _this.rootScene.addChild(bear);
                _this.rootScene.addChild(field);
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
