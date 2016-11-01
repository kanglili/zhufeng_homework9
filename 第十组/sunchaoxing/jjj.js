function Girl() {
    this._events = {};
    this.smile = '大笑'
}
Girl.prototype.on = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};
Girl.prototype.once = function (eventName, callback) {
    function sss() {
        var args = Array.from(arguments).slice(0);
        callback.apply(this, args);
        this.removeListener(eventName, sss)
    }

    this.on(eventName, sss);
};
Girl.prototype.emit = function (eventName) {
    var args = Array.from(arguments).slice(1);
    this._events[eventName].forEach((item)=> {
        item.apply(this, args);
    });
};
Girl.prototype.removeListener = function (eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return item != callback;
        });
    }
};
var girl = new Girl();
function buyPack(who, other) {
    console.log(who + '买lv包' + other + this.smile);
}
function buyCar(who, other) {
    console.log(who + '买bmw' + other);
}
girl.once('有钱', buyPack);
girl.on('有钱', buyCar);
girl.removeListener('有钱', buyCar);
girl.emit('有钱', '老公', '给别人');
girl.emit('有钱', '老公', '给别人');
