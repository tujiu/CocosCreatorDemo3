// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import GameData from "GameData";

cc.Class({
    extends: cc.Component,

    properties: {
        RegainSpeed : 320,
        isRegaining: false,
        isStarted: false,
        game: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.StartLine();
    },

    StartLine () {
        this.node.stopAllActions();
        this.node.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(0, -100))));
        this.isRegaining = false;
        this.isStarted = true;
        this.node.y = 0;
    },

    update (dt) {
        if (this.isStarted) {
            if (!this.isRegaining) {
                GameData.instance.depth += dt;
            }
        }
    },

    RegainLine () {
        if (this.isRegaining) {
            return;
        }

        this.node.stopAllActions();
        var duration = Math.abs(this.node.y) / this.RegainSpeed;
        if (duration < 5) {
            duration = 5;
        }
        duration = 1;
        this.node.runAction(cc.sequence(
            cc.moveTo(duration, cc.v2(0, 0)).easing(cc.easeSineIn()),
            cc.callFunc(() => {
                console.log('finished gaining');
                this.game.getComponent('Game').end();
            })));
        this.isRegaining = true;
    }

});
