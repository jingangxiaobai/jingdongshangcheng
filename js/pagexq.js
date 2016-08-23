/**
 * Created by admin on 2016/7/9.
 */
/*选择产品*/
function choose_chanpin(){
    var choose = document.getElementById('choose_chanpin');
    var span = choose.getElementsByTagName('span');
    for(var i = 0;i<span.length; i++){
        span[i].onmouseover = function(){
            for(var i=0;i<span.length; i++){
                span[i].style.border = "none";
            }
            this.style.border = "2px solid #c00";
        };
    }
}

/*按住button数值加1*/
function btnAddReduce(){
    var Input = document.getElementById('input');
    var input = Input.getElementsByTagName('input')[0];
    var addBtn = Input.getElementsByTagName('a')[0];
    var reduceBtn = Input.getElementsByTagName('a')[1];
    var i=1;
    addBtn.onclick = function(){
        i++;
        if(i==0)i=1;
        input.value = i;
    };
    reduceBtn.onclick = function(){
        i--;
        if(i==0)i=1;
        input.value = i;
    };
}
/*轮播图框架*/
    function luobo(id){
        var  sild = document.getElementById(id);
        var  ol = document.getElementById('ol');//下侧小图轮播
        var BigBox = document.getElementById('BigBox');
        var numBtn = ol.getElementsByTagName('li');
        var viewBox = document.getElementById('viewBox');
        var viewBoxImg = viewBox.getElementsByTagName('img')[0];
        var BigBox = document.getElementById('BigBox');
        var BigBoxImg = BigBox.getElementsByTagName('img')[0];
        for(var i=0; i<numBtn.length;i++){
            numBtn[i].index = i;
            numBtn[i].onmouseover = function(){
                for(var j=0; j<numBtn.length;j++){
                    numBtn[j].className = "";
                }
                var numBtnImg = this.getElementsByTagName('img')[0];
               var src = numBtnImg.src;
                this.className = "active";
                viewBoxImg.src= src;
                BigBoxImg.src = src;
            }
        }
    }
/*放大镜效果*/
function glass(){
    var viewBox = document.getElementById('viewBox');
    var BigBox = document.getElementById('BigBox');
    var BigBoxImg = BigBox.getElementsByTagName('img')[0];
    var oSpan = viewBox.getElementsByTagName('span')[0];
    var main_bot = document.getElementById('main_bot');

    //鼠标move事件
    viewBox.onmousemove = function(ev){
        var oEv = ev || window.event;
        BigBox.style.display = oSpan.style.display = "block" ;
        var l = oEv.clientX - main_bot.offsetLeft-14-oSpan.offsetWidth/2;//获取span的left值
        var t = oEv.clientY - main_bot.offsetTop-14 //获取span的top值
        var w =  viewBox.offsetWidth - oSpan.offsetWidth;//获取span的X方向的活动范围
        var h = viewBox.offsetHeight -oSpan.offsetHeight;//获取span的Y方向的活动范围
        if (l<0) l = 0;//if判断span移动的范围不要移出盒子
        if (l>w) l=w;
        if (t<0) t=0;
        if (t>h) t=h;
        var rateX = l/w ;//span的X方向的移动的比率
        var rateY = t/h;//span的Y方向的移动的比率
        //span移动时对应右面的大盒子移动，两者之间有一个比率问题
        var w_b =BigBoxImg.offsetWidth -  BigBox.offsetWidth ;
        var h_b =BigBoxImg.offsetHeight - BigBox.offsetHeight;
        oSpan.style.left = l + "px";
        oSpan.style.top = t + "px";
        BigBoxImg.style.left = -rateX *w_b + "px";
        BigBoxImg.style.top = -rateY*h_b + "px";
    }
    viewBox.onmouseout = function(){
        BigBox.style.display = oSpan.style.display = "none" ;
    }
}


function abc(){
    var oTab=document.getElementById('tab');
    var oUl = oTab.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var aDiv=oTab.getElementsByTagName('div');
    aLi[0].onmouseover = function(){
        aLi[0].className = 'ac';
        aLi[1].className='';
        aDiv[0].style.display = "block";
        aDiv[1].style.display = "none";
    }
    aLi[1].onmouseover = function(){
        aLi[0].className='';
        aLi[1].className = 'ac';
        aDiv[1].style.display = "block";
        aDiv[0].style.display = "none";
    }
}


