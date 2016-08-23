/**
 * Created by hxsd on 2016/7/7.
 */
/*轮播图框架*/
function luobo(id,ol_num){
    var  sild = document.getElementById(id);
    var  ol = sild.children[2];
    var  oUl = sild.getElementsByTagName('ul')[0];
    var aLi = oUl.children;
    var prevBtn = sild.children[0];
    var nextBtn = sild.children[1];
    for(var i = 0; i<aLi.length; i++){
        var li = document.createElement('li');
        if(i==0) li.className = 'ac';
        if(ol_num) li.innerHTML = i+1;
        ol.appendChild(li);
    }
    var numBtn = ol.children;

    var li_w = getStyle(aLi[0],"width");
    var show_num =0;
    oUl.style.width = li_w*aLi.length +"px";
    for(var i=0; i<numBtn.length;i++){
        numBtn[i].index = i;
        numBtn[i].onmouseover = function(){
            for(var j=0; j<numBtn.length;j++){
                numBtn[j].className = "";
            }
            this.className = "ac";
            show_num = this.index;
            move(oUl,"left",-li_w*show_num,500)
        }
    }
    nextBtn.onclick = function(){
        show_num++;
        if(show_num>= aLi.length-1){
            show_num = aLi.length-1;
        }
        move(oUl,"left",-li_w*show_num,500);
        for(var j=0; j<numBtn.length;j++){
            numBtn[j].className = "";
        }
        numBtn[show_num].className = "ac";
    };
    prevBtn.onclick = function(){
        show_num--;
        if(show_num<0){
            show_num =0;
        }
        move (oUl,"left",-li_w*show_num,500);
        for(var j=0; j<numBtn.length;j++){
            numBtn[j].className = "";
        }
        numBtn[show_num].className = "ac";
    }
}
/*京东菜单*/
function jdMenu(){
    var oMenu = document.getElementById('jdMenu');
    var oUl = document.getElementById('ul_list');
    var aLi = oUl.getElementsByTagName('li');
    var oMenuCont=document.getElementById('menuCont');
    var overlays = oMenuCont.children;

    var show_t;//显示弹框计算器
    var hide_t;//隐藏弹框计算器
    var move_t;//鼠标从弹框移入菜单延迟用计时器
    //删除所有li上的ac
    function del_li_ac(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].className="";
        };
    }
//----------------------------------------------------------------------------------------
    //触发什么行为（事件）
    for(var i=0; i<aLi.length; i++){
        aLi[i].index=i;//发牌照
        aLi[i].onmouseover=function(){ //为每一个li标签绑定onmouseover事件
            clearTimeout(hide_t);//清除关闭
            clearTimeout(move_t);//清除鼠标移动

            var _this=this; //计时器中的this是window，所以要先声明一个_this变量，用这个变量传入计时器
            show_t=setTimeout(function(){

                oMenuCont.style.display="block";//oMenuCont弹框 显示

                //显示相对应的内容(就是选项卡的原理)
                for(var i=0; i<overlays.length; i++){
                    overlays[i].style.display="none";
                };
                overlays[_this.index].style.display="block";
                del_li_ac();//删除所有li上的ac
                _this.className="ac";//自己增加ac
            },0);
        };


        aLi[i].onmouseout=function(){  //为每一个li标签绑定onmouseout 事件
            clearTimeout(show_t);
            clearTimeout(hide_t);
            var _this=this;
            hide_t=setTimeout(function(){
                oMenuCont.style.display="none"; //oMenuCont弹框 隐藏

                del_li_ac();//删除所有li上的ac
            },200);
        };
//-------------------------------------------------------------------------------------
        //oMenuCont绑定两个事件
        oMenuCont.onmouseover=function(){
            clearTimeout(hide_t);
            clearTimeout(move_t);
            this.style.display="block"; //让自己显示
        };

        oMenuCont.onmouseout=function(){
            var _this=this;
            move_t=setTimeout(function(){//延时隐藏
                _this.style.display="none";

                del_li_ac();//删除所有li上的ac

            },100);
        }
    }
}

/*选项卡组件*/
function tab(id1,id2){//tab盒子的id
    var oTab=document.getElementById(id1);
    var tabTitle = document.getElementById(id2);
    var aLi=tabTitle.getElementsByTagName('li');
    var aDiv=oTab.getElementsByClassName('tab_cont');

    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i].onmouseover=function(){
            for(var i=0;i<aLi.length;i++){
                aLi[i].className='';
                aDiv[i].style.display="none";
            };
            this.className='active';
            aDiv[this.index].style.display="block";
        };
    }
}
function tabRun(id1,id2,autoPlay){//autoPlay是决定是否自动播放的参数
    var oTab=document.getElementById(id1);
    var tabTitle = document.getElementById(id2);
    var aLi=tabTitle.getElementsByTagName('li');
    var aDiv=oTab.getElementsByClassName('tab_cont');


    var num =0;//自动播放的卡片编号
    var timer =null;
    for(var i =0; i<aLi.length; i++){
        //为每个标签标记编号
        aLi[i].index = i;
        //为每个标签绑定事件
        aLi[i].onmouseover = function(){
            for(var i =0; i<aLi.length; i++){
                aLi[i].className = "";//将全部标签去掉class

                aDiv[i].style.display = "none";//把所有div隐藏
            }
            this.className = "active";//当前点击的标签增加class=ac
            aDiv[this.index].style.display = "block";//让与当前标签对应的div显示
            num = this.index;
        }
    }
    if(autoPlay){//设置if可以选择是否自动播放
//---------------------------------------------------------------------------
//自动播放需要什么？
        function autoRun(){
            timer = setInterval(function(){
                function run(num){
                    for(var i=0; i<aLi.length; i++){
                        aLi[i].className = "";//将全部标签去掉class
                        aDiv[i].style.display = "none";//把所有div隐藏
                    }
                    //指定的卡片显示
                    aLi[num].className = "ac";
                    aDiv[num].style.display = "block";
                }
                run(num);
                num++;
                if(num == 3) num=0;
            },1000)
        }
        //!!!!!!记得引爆函数！！！！！！！！
        autoRun();
        //---------------------------------------------------------------------------

        //鼠标进入大盒子，停止自动播放
        oTab.onmouseover = function(){
            clearInterval(timer);
        };
        //出来的时候继续自动播放
        oTab.onmouseout= function(){
            autoRun();
        };

    }
}





