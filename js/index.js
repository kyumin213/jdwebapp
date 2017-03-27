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
    /*移动的时候的X的坐标*/
    var moveX = 0;
    /*移动距离*/
    var distanceX = 0;
    /*判断是否滑动过*/
    var isMove = false;
    /*绑定事件*/
    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);
        /*在滑动的时候不断的给图片盒子做定位  来达到滑动的效果*/
        /*定位的位置  当前的图片的定位  加上 移动的距离*/
        /*清除过度*/
        removeTransition();
        /*设置当前的定位*/
        setTranslateX(-index*width+distanceX);
    });
    //在谷歌的模拟器会出现  一个问题就是  touchend的时候可能会丢失事件
    window.addEventListener('touchend',function(e){
        /*第六步*/
        /*
         * 4.当滑动的时候不超过一定的距离的时候  吸附回去
         * 5.当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
         * 一定的距离  就是1/3的图片的宽度
        * */
        if(Math.abs(distanceX) > (width/3) && isMove){
            /*怎么判断上一张还是下一张
            * 是通过distanceX的值来判断
            * */
            if(distanceX>0){
                index --;
            }else{
                index ++;
            }
            /*动画的定位回去 当前的index*/
            addTransition();
            setTranslateX(-index*width);
        }else{
            /*动画的定位回去 其实就是吸附回去*/
            addTransition();
            setTranslateX(-index*width);
        }

        /*重置参数  防止第二次的时候影响计算*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++ ;
            /*让图片动画的滚动  translateX  transition 来实现动画*/
            /*给imageBox加上过度*/
            addTransition();
            /*给imageBox设置当前的位置 */
            setTranslateX(-index*width);
        },3000);
    });
}
// function banner(){
//     /*
//     * 1.自动的轮播
//     * 2.点随着图片轮播做改变  对应上当前的图片的位子
//     * 3.图片盒子能滑动
//     * 4.当滑动的时候不超过一定的距离的时候  吸附回去
//     * 5.当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
//     * 一定的距离  就是1/3的图片的宽度
//     * */

//     /*第一步*/
//     /*需要操作的dom*/
//     /*轮播图大盒子*/
//     var banner = document.querySelector('.jd_banner');
//     /*图片的宽度  或者说  轮播图大盒子的宽度*/
//     var width = banner.offsetWidth;
//     /*图片盒子*/
//     var imageBox = banner.querySelector('ul:first-child');
//     /*点盒子*/
//     var pointBox = banner.querySelector('ul:last-child');
//     /*所有的点*/
//     var points = pointBox.querySelectorAll('li');

//     /*公用方法*/
//     /*添加过度*/
//     var addTransition = function(){
//         imageBox.style.webkitTransition = "all .2s";/*兼容*/
//         imageBox.style.transition = "all .2s";
//     }
//     /*删除过度*/
//     var removeTransition = function(){
//         imageBox.style.webkitTransition = "none";/*兼容*/
//         imageBox.style.transition = "none";
//     }
//     /*设置定位*/
//     var setTranslateX = function(x){
//         imageBox.style.webkitTransform = "translateX("+x+"px)";
//         imageBox.style.transform = "translateX("+x+"px)";
//     }

//     /*第二步*/
//     /*1.自动的轮播*/
//     /*当前默认的索引*/
//     var index = 1;
//     /*核心定时器*/
//     var timer = setInterval(function(){
//         index ++ ;
//         /*让图片动画的滚动  translateX  transition 来实现动画*/
//         /*给imageBox加上过度*/
//         addTransition();
//         /*给imageBox设置当前的位置 */
//         setTranslateX(-index*width);
//     },3000);

//     /*第三步*/
//     /*无缝的滚动和滑动*/
//     /*
//     * 动画结束  过度结束   判断当前是 第几张
//     * 如果索引是 9  需要瞬间定位到  第一张图片
//     * 如果索引是 0  需要瞬间定位到  第八张图片
//     * */
//     /*每一次过度结束都会触发这个  过度结束时间*/
//     itcast.transitionEnd(imageBox,function(){
//         if(index >= 9){
//             index = 1;
//             /*瞬间定位*/
//             /*去除过度*/
//             removeTransition();
//             /*做定位*/
//             setTranslateX(-index*width);
//         }else if(index <= 0){
//             index = 8;
//             /*瞬间定位*/
//             /*去除过度*/
//             removeTransition();
//             /*做定位*/
//             setTranslateX(-index*width);
//         }
//         /*设置当前的点*/
//         setPoint();
//     });

//     /*第四步*/
//     /*2.点随着图片轮播做改变  对应上当前的图片的位子*/
//     var setPoint = function(i){
//         /*去除当前样式*/
//         for(var i = 0 ; i < points.length ; i ++){
//             points[i].className = " ";
//         }
//         /*索引值 0-9 */
//         /*又需要判断index 是0 9的时候 */
//         /*但是 我们设置点的  时候我们是在动画结束的时候设置*/
//         /*我们的index已经重置过了*/
//         /*没有必要 被重置过的index  1-8 */
//         points[index-1].className = "on";
//     }

//     /*第五步*/
//     /*3.图片盒子能滑动*/
//     /*开始的x坐标*/
//     var startX = 0;
//     /*移动的时候的X的坐标*/
//     var moveX = 0;
//     /*移动距离*/
//     var distanceX = 0;
//     /*判断是否滑动过*/
//     var isMove = false;
//     /*绑定事件*/
//     imageBox.addEventListener('touchstart',function(e){
//         /*清除定时器*/
//         clearInterval(timer);
//         startX = e.touches[0].clientX;
//     });
//     imageBox.addEventListener('touchmove',function(e){
//         isMove = true;
//         moveX = e.touches[0].clientX;
//         distanceX = moveX - startX;
//         console.log(distanceX);
//         /*在滑动的时候不断的给图片盒子做定位  来达到滑动的效果*/
//         /*定位的位置  当前的图片的定位  加上 移动的距离*/
//         /*清除过度*/
//         removeTransition();
//         /*设置当前的定位*/
//         setTranslateX(-index*width+distanceX);
//     });
//     //在谷歌的模拟器会出现  一个问题就是  touchend的时候可能会丢失事件
//     window.addEventListener('touchend',function(e){
//         /*第六步*/
//         /*
//          * 4.当滑动的时候不超过一定的距离的时候  吸附回去
//          * 5.当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
//          * 一定的距离  就是1/3的图片的宽度
//         * */
//         if(Math.abs(distanceX) > (width/3) && isMove){
//             /*怎么判断上一张还是下一张
//             * 是通过distanceX的值来判断
//             * */
//             if(distanceX>0){
//                 index --;
//             }else{
//                 index ++;
//             }
//             /*动画的定位回去 当前的index*/
//             addTransition();
//             setTranslateX(-index*width);
//         }else{
//             /*动画的定位回去 其实就是吸附回去*/
//             addTransition();
//             setTranslateX(-index*width);
//         }

//         /*重置参数  防止第二次的时候影响计算*/
//         startX = 0;
//         moveX = 0;
//         distanceX = 0;
//         isMove = false;

//         /*加上定时器*/
//         clearInterval(timer);
//         timer = setInterval(function(){
//             index ++ ;
//             /*让图片动画的滚动  translateX  transition 来实现动画*/
//             /*给imageBox加上过度*/
//             addTransition();
//             /*给imageBox设置当前的位置 */
//             setTranslateX(-index*width);
//         },3000);
//     });
// }
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
