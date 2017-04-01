window.onload = function() {
        search();
        banner();
        downTime();
    }
    //搜索区背景
function search() {
    var searchBox = document.querySelector(".head_box");
    var bannerBox = document.querySelector(".jd_banner");
    var height = bannerBox.offsetHeight;
    //监听滚动事件
    window.onscroll = function() {
        //不断观察当前滚动是否超过轮播图
        var top = document.body.scrollTop;
        var opcity = 0;
        if (top > height) {
            opcity = 0.85;
        } else {
            opcity = 0.85 * (top / height);
        }
        searchBox.style.background = "rgba(201,21,35," + opcity + ")";
    }
}
//轮播图
function banner() {
    var banner = document.querySelector(".jd_banner"); //轮播大盒子
    var width = banner.offsetWidth; //图片宽度，盒子宽度
    var imageBox = banner.querySelector('ul:first-child'); //图片盒子
    var pointBox = banner.querySelector('ul:last-child'); //点盒子
    var points = pointBox.querySelectorAll('li'); //所有的点
    var addTransition = function() {
        imageBox.style.webkitTransition = "all .2s";
        imageBox.style.transition = "all .2s";
    }
    var removeTransition = function() {
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    }
    var setTranslateX = function(x) {
            imageBox.style.webkitTransform = "translateX(" + x + "px)";
            imageBox.style.transform = "translateX(" + x + "px)";
        }
        //自动轮播
    var index = 1; //当前索引
    var timer = setInterval(function() {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 3000);
    itcast.transitionEnd(imageBox, function() {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            transitionLate(-index * width);
        }
        setPoint();
    });
    var setPoint = function(i) {
            for (var i = 0; i < points.length; i++) {
                points[i].className = "";
            }
            points[index - 1].className = "on";
        }
        //图片盒子滑动
     var startX = 0;
    // 移动的时候的X的坐标
    var moveX = 0;
    // 移动距离
    var distanceX = 0;
    // 判断是否滑动过
    var isMove = false;
    // 绑定事件
    imageBox.addEventListener('touchstart',function(e){
        // 清除定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        // console.log(distanceX);
        // 清除过度
        removeTransition();
        // 设置当前的定位
        setTranslateX(-index*width+distanceX);
    });
    //在谷歌的模拟器会出现一个问题就是touchend的时候可能会丢失事件
    window.addEventListener('touchend',function(e){
        //当左右滑动超过图片三分之一时滑动
        if(Math.abs(distanceX) > (width/3) && isMove){
//是通过distanceX的值来判断上一张下一张
            if(distanceX>0){
                index --;
            }else{
                index ++;
            }
            // 动画的定位回去当前的index
            addTransition();
            setTranslateX(-index*width);
        }else{
            // 动画的定位回去
            addTransition();
            setTranslateX(-index*width);
        }

        // 重置参数防止第二次的时候影响计算
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        // 加上定时器
        clearInterval(timer);
        timer = setInterval(function(){
            index ++ ;
            // 让图片动画的滚动实现动画
            addTransition();
            // 给imageBox设置当前的位置
            setTranslateX(-index*width);
        },3000);
    });
}
//倒计时
function downTime() {
    var time = 3 * 60 * 60;
    var sktime = document.querySelector(".sk_time");
    var span = sktime.querySelectorAll("span");
    var timer = setInterval(function() {
        time--;
        if (time < 0) {
            clearInterval(timer);
            return false;
        }
        var h = Math.floor(time / 3600);
        var m = Math.floor((time % 3600) / 60);
        var s = time % 60;
        span[0].innerHTML = Math.floor(h / 10);
        span[1].innerHTML = h % 10;
        span[3].innerHTML = Math.floor(m / 10);
        span[4].innerHTML = m % 10;
        span[6].innerHTML = Math.floor(s / 10);
        span[7].innerHTML = s % 60;
    }, 1000);
}
