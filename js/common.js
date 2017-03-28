/*公用js文件*/
window.itcast = {};
itcast.transitionEnd = function(dom, callback) {
        if (dom && typeof dom == 'object') {
            dom.addEventListener('webkitTransitionEnd', function() {
                /*if(callback){
                    callback();
                }*/
                callback && callback();
            });
            dom.addEventListener('transitionEnd', function() {
                callback && callback();
            });
        }
    }
    /*封装tap*/
itcast.tap = function(dom, callback) {
    if (dom && typeof dom == 'object') {
        var isMove = false;
        var startTime = 0;
        dom.addEventListener('touchstart', function(e) {
            startTime = Date.now();
        });
        dom.addEventListener('touchmove', function(e) {
            isMove = true;
        });
        dom.addEventListener('touchend', function(e) {
            if (!isMove && (Date.now() - startTime) < 150) {
                callback && callback(e);
            }
            isMove = false;
            startTime = 0;
        });
    }
}
