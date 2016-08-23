// JavaScript Document

/*getStyle获取样式框架*/
function getStyle(obj,name){
    var value = obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
    if(name=='opacity'){
        value = Math.round(parseFloat(value)*100);
    }
    else {
        value = parseInt(value);
    }
    return value;
}
/*运动框架*/
//运动框架
function move(obj,moveMode,end,stopTime){//不能用的玩意儿
    //确定起点
    var start= getStyle(obj, moveMode);
    //确定距离 终点 end -start
    var dis=end-start;    //distance

    //时间分份
    var count=parseInt(stopTime/30);

    var n=0;//计数器

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        var a=1-n/count;//减速运动

        //步进长度  起点+ 距离/份数*n；
        var step_dis=start+dis*(1-a*a*a);

        if(moveMode=="opacity"){//判断透明度
            obj.style.opacity=step_dis/100;
            obj.style.filter='alpha(opacity:'+step_dis+')';  //ie

        }else{
            obj.style[moveMode]=step_dis+'px';

        }

        if(n==count){
            clearInterval(obj.timer);
        }
    },30)
}
