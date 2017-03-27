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
    var imgBox = banner.querySelector('ul:first-child'); //图片盒子
    var pointBox = banner.querySelector('ul:last-child'); //点盒子
    var point = pointBox.querySelectorAll("li"); //所有的点
    var addTransition = function() {
        imgBox.style.webkitTransition = "all .2s";
        imgBox.style.transition = "all .2s";
    }
    var removeTransition = function() {
        imgBox.style.webkitTransition = "none";
        imgBox.style.transition = "none";
    }
    var setTranslateX = function(x) {
            imgBox.style.webkitTransform = "translateX("+x+"px)";
            imgBox.style.transform = "translateX("+x+"px)";
        }
        //自动轮播
    var index = 1; //当前索引
    var timer = setInterval(function() {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 3000);
    itcast.transitionEnd(imgBox, function() {
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
            for (var i = 0; i < point.length; i++) {
                point[i].className = "";
            }
            point[index - 1].className ="on";
        }
        //图片盒子滑动
    var startX = 0;
    var moveX = 0;
    var distansX = 0;
    var ismove = false;
    imgBox.addEventListener("touchstart", function(e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function(e) {
        ismove = true;
        moveX = e.touches[0].clientX;
        distansX = moveX - startX;
        removeTransition();
        setTranslateX(-index * width + distansX);
    });
    window.addEventListener("touchend", function(e) {
        if (Math.abs(distansX) > (width / 3) && ismove) {
            if (distansX > 0) {
                index--;
            } else {
                index++;
            }
            addTransition();
            setTranslateX(-index * width);
        } else {
            addTransition();
            setTranslateX(-index * width);
        }
        var startX = 0;
        var moveX = 0;
        var distansX = 0;
        var ismove = false;
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            addTransition();
            setTranslateX(-index*width);
        },3000);
    });
}
//倒计时
    function downTime(){
        var time=3*60*60;
        var sktime=document.querySelector(".sk_time");
        var span=sktime.querySelectorAll("span");
        var timer=setInterval(function(){
            time--;
            if(time<0){
                clearInterval(timer);
                return false;
            }
            var h=Math.floor(time/3600);
            var m=Math.floor((time%3600)/60);
            var s=time%60;
            span[0].innerHTML=Math.floor(h/10);
            span[1].innerHTML=h%10;
            span[3].innerHTML=Math.floor(m/10);
            span[4].innerHTML=m%10;
            span[6].innerHTML=Math.floor(s/10);
            span[7].innerHTML=s%60;
        },1000);
    }

