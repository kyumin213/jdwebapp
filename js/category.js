// $(function() {
//     $(".left_category li").click(function() {
//         var index = $(this).index();
//         $(this).find("a").addClass('now')
//             .parent().siblings().children('a').removeClass('now');
//         $(".right_category div").eq(index).show().siblings('div').hide();
//     });

//     $('.clear').click(function() {
//         $(".category_hot ul:last-child").hide();
//     });
//     $('.icon_back').click(function() {
//         window.history.back();
//     });
// });
window.onload = function() {
    leftSwipe();
    rightSwipe();
}

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
    var currY = 0;
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
    childBox.addEventListener("touchstart", function(e) {
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener("touchmove", function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        // console.log(distanceY);
        removeTransition();
        if ((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe) {
            setTranslateY(currY + distanceY);
        }
    });
    window.addEventListener("touchend", function(e) {
        if ((currY + distanceY) > maxY) {
            currY = maxY;
            addTransition();
            setTranslateY(currY);
        } else if ((currY + distanceY) < minY) {
            currY = minY;
            addTransition();
            setTranslateY(currY);
        } else {
            currY = currY + distanceY;
        }
        var startY = 0;
        var moveY = 0;
        var distanceY = 0;
        var isMove = false;
    });
    var lis = childBox.querySelectorAll("li");
    itcast.tap(childBox, function(e) {
        var li = e.target.parentNode;
        for (var i = 0; i > lis.length; i++) {
            lis[i].className = " ";
            lis[i].index = i;
        }
        li.className = "now";
        var translateY = -li.index * 50;
        if (translateY > minY) {
            currY = translateY;
            addTransition();
            setTranslateY(currY);
        } else {
            currY = minY;
            addTransition();
            setTranslateY(currY);
        }
    });
}

function rightSwipe() {
    itcast.iScroll({
        swipeDom: document.querySelector(".right_category"),
        swipeType: 'y',
        swipeDistance: 100
    });
}
