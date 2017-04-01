window.onload = function() {
    del();
    backHome();
}
//点击删除
function del() {
    var show = document.querySelector(".jd_win");//弹出框
    var box=show.querySelector(".jd_win_box");//盒子
    var sub=document.querySelector(".submit");
    var dels = document.querySelectorAll(".delete_box");//全部删除按钮
    var deleteBox=null;
    for(var i=0;i<dels.length;i++){
        dels[i].onclick=function(e){
            //点击删除按钮动画弹出删除框
            show.style.display = "block";
            box.className="jd_win_box bounceInDown";
            //翻盖动画
            deleteBox=this;
            //找盖子
            var deleteUp=deleteBox.querySelector("span:first-child");
            //加过渡
            deleteUp.style.webkitTransition="all 1s";
            deleteUp.style.transition="all 1s";
            //加旋转
            deleteUp.style.webkitTransform="rotate(-30deg) translateY(2px)";
            deleteUp.style.transform="rotate(-30deg) translateY(2px)";
            //设置旋转原点
            deleteUp.style.webkitTransformOrigin="0 5px";
            deleteUp.style.transformOrigin="0 5px";
        }
    }
    //点击取消
    var cancel=document.querySelector(".cancel");
    cancel.onclick=function(){
        //隐藏弹出框
        show.style.display="none";
        //找到盖子并删除动画
        var deleteUp=deleteBox.querySelector("span:first-child");
        if(deleteUp){
            deleteUp.style.webkitTransform="none";
            deleteUp.style.transform="none";
        }
    }
    //点击确认
    document.querySelector('.submit').onclick=function(){
        //隐藏删除商品
        var submit=deleteBox.parentNode.parentNode.parentNode.parentNode;
        submit.style.display="none";
        show.style.display="none";
    }
}
//返回
function backHome(){
    var back=document.querySelector('.icon_back');
    back.onclick=function(){
        window.history.back();
    }
}
