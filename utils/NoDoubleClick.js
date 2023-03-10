const NoDoublePress = {
    lastPressTime: 1,
    onPress(callback) {
        let curTime = new Date().getTime();
        if (curTime - this.lastPressTime > 1000) {
            this.lastPressTime = curTime;
            callback();
        }
    },
};

export default NoDoublePress;