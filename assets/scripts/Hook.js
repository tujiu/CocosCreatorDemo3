// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        RegainSpeed : 320,
        isRepeating: {
            default: false,
            visible: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.StartLine();
    },

    StartLine () {
        this.node.stopAllActions();
        this.node.runAction(cc.repeatForever(cc.moveBy(5, cc.v2(0, -100))));
        this.isRepeating = false;
    },

    // update (dt) {},
    RegainLine () {
        if (this.isRepeating) {
            return;
        }

        this.node.stopAllActions();
        var duration = Math.abs(this.node.y) / this.RegainSpeed;
        if (duration < 5) {
            duration = 5;
        }
        this.node.runAction(cc.moveTo(duration, cc.v2(0, 0)).easing(cc.easeSineIn()));
        this.isRegaining = true;
    }

});
