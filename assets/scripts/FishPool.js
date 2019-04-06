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
        mPrefab: {
            default: null,
            type: cc.Prefab
        },
        mFishPool: {
            default: null,
            type: cc.Node
        },
        mHook: {
            default: null,
            type: cc.Node
        },
        mDepth: {
            default: 0,
            type: cc.Float,
            visible: false
        },
        mSceneData: {
            default: null,
            type: cc.JsonAsset
        },
        mIndex: {
            default: 0,
            visible: false,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    reset () {
        this.mFishPool.removeAllChildren(true);
        this.mIndex = 0;
    },

    update (dt) {
        this.mDepth = Math.floor(Math.abs(this.mHook.y) / 100);
        let data = this.mSceneData.json[this.mIndex];
        if (data != undefined && this.mDepth >= data.depth) {
            var fish = cc.instantiate(this.mPrefab);
            cc.loader.loadRes(data.res, cc.SpriteFrame, function(err, spriteFrame) {
                if (!err) {
                    fish.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            })
            fish.x = Math.random() * 640 - 320;
            fish.y = this.mHook.y - 480 - 100;
            fish.getComponent('Fish').mScore = data.score;
            fish.getComponent('Fish').mSpeed = data.speed;
            this.mFishPool.addChild(fish);
            this.mIndex++;
        }
    },
});
