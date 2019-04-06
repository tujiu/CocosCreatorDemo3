// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var GameData = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null
    },

    properties: {
        score: 0,
        depth: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    start () {

    },

    // update (dt) {},
});

GameData.instance = new GameData();
export default GameData;