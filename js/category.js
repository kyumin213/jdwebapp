window.onload = function() {
    leftSwipe();
    rightSwipe();
    Swipeleft();
    backHome()
}
//左侧菜单
function leftSwipe() {
    var parentBox = document.querySelector(".left_category");
    var childBox = parentBox.querySelector("ul");
    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;
    // translateY最大定位
    var maxY = 0;
    //最小定位，滑到最小面的定位
    var minY = parentHeight - childHeight;
    //缓冲距离
    var distance = 100;
    //translateY滑动高度最大定位
    var maxSwipe = maxY + 100;
    //translateY最小定位
    var minSwipe = minY - 100;
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove = false;
    var currY = 0; //记录当前定位
    var addTransition = function() {
        childBox.style.webkitTransition = "all .2s"
        childBox.style.transition = "all .2s";
    }
    var removeTransition = function() {
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    }
    var setTranslateY = function(y) {
            childBox.style.webkitTransform = "translateY(" + y + "px)";
            childBox.style.transform = "translateY(" + y + "px)";
        }
        //绑定事件
        // childBox.addEventListener('touchstart',function(e) {
        //     startY=e.touches[0].clientY;
        // });
        // childBox.addEventListener('touchmove',function(e) {
        //     moveY=e.touches[0].clientY;
        //     distanceY=moveY-startY;
        //     // 清除过渡
        //     removeTransition();
        //     /*设置定位*/
        //     /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        //     /*当前要做定位的位子需要在滑动区间内*/
        //     if ((currY+distanceY)<maxSwipe&&(currY+distanceY)>minSwipe){
        //         setTranslateY(currY+distanceY);
        //     }
        // });
        // window.addEventListener('touchend',function(e) {
        //     /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        //     /*当往下滑的时候 大于 最大定位*/
        //     if((currY+distanceY)>maxY) {
        //         currY=maxY;
        //         addTransition();
        //         setTranslateY(currY);
        //     }
        //      /*当往上滑的时候 小于 最小定位*/
        //     else if((currY+distanceY)<minY) {
        //         currY=minY;
        //         addTransition();
        //         setTranslateY(currY);
        //     }
        //     else {
        //         /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
        //         currY=currY+distanceY;
        //     }

    //     var startY = 0;
    //     var moveY = 0;
    //     var distanceY = 0;
    //     var isMove = false;
    // });

    var lis = childBox.querySelectorAll("li");
    itcast.tap(childBox, function(e) {
        var li = e.target.parentNode;
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = " ";
            lis[i].index = i;
        }
        li.className = "now";
        var translateY = -li.index * 50;
        if (translateY > minY) {
            currY = translateY;
            addTransition();
            setTranslateY(translateY);
        } else {
            currY = translateY;
            addTransition();
            setTranslateY(currY);
        }
    });
}
//右侧内容
function rightSwipe() {
    //通过封装swipe插件实现
    itcast.iScroll({
        swipeDom:document.querySelector(".right_category"),//父容器对象
        swipeType: 'y',
        swipeDistance: 100 //缓冲距离
    });
}
//左侧菜单
function Swipeleft() {
    itcast.iScroll({
        swipeDom: document.querySelector(".left_category"),//父容器对象
        swipeType: 'y',//滑动方向
        swipeDistance: 100//缓冲距离
    });
}
//返回
function backHome(){
    var back=document.querySelector('.icon_back');
    back.onclick=function(){
        window.history.back();
    }
}
