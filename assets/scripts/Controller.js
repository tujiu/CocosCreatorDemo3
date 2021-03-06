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
        mSpeed: 350,
        mMoveToPos: {
            default: cc.v2(0, 0),
            visible: false
        },
        mIsMoving: {
            default: false,
            visible: false
        },
        mEnableTouch: {
            default: false,
            visible: false
        },
        mHookScreen: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    reset () {
        this.EnableTouch();
    },

    update (dt) {
        if (!this.mIsMoving) {
            return;
        }

        var oldPos = this.node.position;
        this.mMoveToPos.y = oldPos.y;
        var direction = this.mMoveToPos.sub(oldPos).normalize();
        direction.y = 0;
        var newPos = oldPos.add(direction.mul(this.mSpeed * dt));
        this.node.setPosition(newPos);
    },

    EnableTouch () {
        if (this.mEnableTouch) {
            return;
        }

        this.mHookScreen.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mHookScreen.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.mHookScreen.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.mHookScreen.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.mEnableTouch = true;

        console.log("EnableTouch");
    },

    DisableTouch () {
        if (!this.mEnableTouch) {
            return;
        }

        this.mHookScreen.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mHookScreen.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.mHookScreen.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.mHookScreen.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.mEnableTouch = false;

        console.log("DisableTouch");
    },

    onTouchStart (event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this.mIsMoving = true;
        this.mMoveToPos = this.node.parent.convertToNodeSpaceAR(touchLoc);
    },

    onTouchMove (event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this.mMoveToPos = this.node.parent.convertToNodeSpaceAR(touchLoc);
    },

    onTouchEnd (event) {
        this.mIsMoving = false;
    },

    onTouchCancel (event) {
        this.mIsMoving = false;
    },

    onCollisionEnter: function (other, self) {
        var pHook = this.mHookScreen.getComponent('Hook');
        pHook.RegainLine();

        other.node.stopAllActions();
        other.node.parent = this.node;
        other.node.setPosition(cc.v2(0, 0));
        other.node.runAction(cc.repeatForever(cc.sequence(
            cc.rotateTo(0.5, -60 * other.node.scaleX),
            cc.rotateTo(0.5, -30 * other.node.scaleX)
        )));
        GameData.instance.score = other.node.getComponent('Fish').mScore;
        this.DisableTouch();
    }


});
