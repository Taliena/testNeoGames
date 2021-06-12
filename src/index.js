define(["require", "exports", "./lotteryGame/GameEntryPoint"], function (require, exports, GameEntryPoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.onload = function () {
        var game = new GameEntryPoint_1.GameEntryPoint();
        game.init();
    };
});
//# sourceMappingURL=index.js.map