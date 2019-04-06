import GameData from "GameData";

cc.Class({
    extends: cc.Component,

    properties: {
        mScoreLabel: cc.Label,
        mDepthLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.mScoreLabel.string = GameData.instance.score;
        this.mDepthLabel.string = '深度:' + GameData.instance.depth.toFixed(2);
    },
});
