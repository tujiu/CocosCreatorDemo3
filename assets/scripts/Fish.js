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
        mSpeed: {
            default: 1,
            type: cc.Float,
            tooltip: '鱼的速度，默认为1，最小0.1，最大10',
            min: 0.1
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let x = this.node.x;
        let duration = 5 - (this.node.x + 320) / 640 * 5;
        let action = cc.sequence(
            cc.moveTo(duration, cc.v2(320, this.node.y)),
            cc.flipX(true),
            cc.moveTo(duration, cc.v2(x, this.node.y)),
            cc.moveTo(5 - duration, cc.v2(-320, this.node.y)),
            cc.flipX(false),
            cc.moveTo(5 - duration, cc.v2(x, this.node.y)),
        );
        this.node.runAction(cc.speed(cc.repeatForever(action), this.mSpeed));
    },

    // update (dt) {},
});
