
if(!window.itcast){
    window.itcast = {};
}
itcast.iScroll = function(args){
    /*调用的时候没有初始化的话就是初始化一次*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(args);
    this.init(args);
};
itcast.iScroll.prototype = {
    constructor:itcast.iScroll,
    init:function(args){
        /*局部变量来接受当前的this*/
        var that  = this;
        /*如果传入的对象是一个Dom对象就把他看作是我们的大容器盒子*/
        if(args.swipeDom && typeof  args.swipeDom == 'object'){
            that.parentDom = args.swipeDom;
        }
        /*如果不存在父容器就停止初始化*/
        if(!that.parentDom) return false;
        /*找到子容器*/
        that.childDom = that.parentDom.children&&that.parentDom.children[0]?that.parentDom.children[0]:'';
        /*如果不存在子容器就停止初始化*/
        if(!that.childDom) return false;
        /*初始化传入的参数*/
        that.settings = {};
        /*默认类型  默认的Y轴滑动 如果不是y的话就是以x轴开始滑动*/
        that.settings.swipeType = args.swipeType?args.swipeType:'y';
        /*默认的缓冲滑动距离*/
        that.settings.swipeDistance = args.swipeDistance>=0?args.swipeDistance:150;
        /*初始化滑动*/
        that._scroll();
    },
    /*对外开放的设置定位的方法*/
    setTranslate:function(translate){
        this.currPostion = translate;
        this._addTransition();
        this._changeTranslate(this.currPostion);
    },
    _addTransition:function(){
        this.childDom.style.transition = "all .2s ease";
        this.childDom.style.webkitTransition = "all .2s ease";
    },
    _removeTransition:function(){
        this.childDom.style.transition = "none";
        this.childDom.style.webkitTransition = "none";
    },
    _changeTranslate:function(translate){
        if(this.settings.swipeType == 'y'){
            this.childDom.style.transform = "translateY("+translate+"px)";
            this.childDom.style.webkitTransform = "translateY("+translate+"px)";
        }else{
            this.childDom.style.transform = "translateX("+translate+"px)";
            this.childDom.style.webkitTransform = "translateX("+translate+"px)";
        }
    },
    _scroll:function(){
        var that = this;
        var type = that.settings.swipeType == 'y'?true:false;
        var parentHeight = type?that.parentDom.offsetHeight:that.parentDom.offsetWidth;
        var childHeight = type?that.childDom.offsetHeight:that.childDom.offsetWidth;
        if(childHeight < parentHeight){
            if(type){
                that.childDom.style.height = parentHeight + 'px';
                childHeight = parentHeight;
            }else{
                that.childDom.style.width = parentHeight + 'px';
                childHeight = parentHeight;
            }
        }

        var distance = that.settings.swipeDistance;
        that.maxPostion = 0;
        that.minPostion = -(childHeight-parentHeight);
        that.currPostion = 0;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
        that.childDom.addEventListener('touchstart',function(e){
            that.startPostion = type?e.touches[0].clientY: e.touches[0].clientX;
        },false);
        that.childDom.addEventListener('touchmove',function(e){
            e.preventDefault();
            that.endPostion = type?e.touches[0].clientY: e.touches[0].clientX;
            that.movePostion = that.startPostion - that.endPostion;/*计算了移动的距离*/
            if((that.currPostion-that.movePostion)<(that.maxPostion+distance)
                &&
                (that.currPostion-that.movePostion)>(that.minPostion -distance)){
                that._removeTransition();
                that._changeTranslate(that.currPostion-that.movePostion);
            }
        },false);
        window.addEventListener('touchend',function(e){
            if((that.currPostion-that.movePostion) > that.maxPostion){
                that.currPostion = that.maxPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            else if((that.currPostion-that.movePostion) < that.minPostion){
                that.currPostion = that.minPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            else{
                that.currPostion = that.currPostion-that.movePostion;
            }
            that._reset();
        },false);

    },
    _reset:function(){
        var that = this;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
    }
};
