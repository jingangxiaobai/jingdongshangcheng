/**
 * Created by hxsd on 2016/7/23.
 */
$(function(){
    //需要的数据
    var goods = [
        {shop:"卉之乡旗舰店",img:"data/img/01.jpg",color:"颜色：L热偶",size:"尺码：含盆",name:"特价【必秒】【已开口30粒优质碗莲套餐】荷花睡莲花种盆栽绿植花草种子四季播特价",price:17,number:1},
        {shop:"葫芦图书旗舰店",img:"data/img/02.jpg",color:"颜色：AngularJS开发web应用",size:"",name:"用AngularJS开发下一代Web应用",price:44 ,number:3},
        {shop:"浩博图书专营店",img:"data/img/03.jpg",color:"颜色：JavaScript DOM",size:"",name:"JavaScript DOM编程艺术（第2版）",price:38,number:2},
        {shop:"海洋图书专营店",img:"data/img/04.jpg",color:"",size:"",name:"JavaScript高级程序设计(第3版)",price:77,number:1},
        {shop:"洁面旗舰店",img:"data/img/05.jpg",color:"颜色：蓝",size:"",name:"韩国imate舒适版洁面仪毛孔清洁器 超柔软刷头 去死皮去角质 电动洗脸刷机洗脸仪洗脸神器",price:276,number:2},
    ];
    //写入的表格的结构
    var mainText = "";
    mainText = "<div class='title'>全部商品</div>"+
                "<div class='mainItem mainTitle clearfix'>"+
                    "<ul>"+
                        "<li class='check'><input type='checkbox' checked></li>"+
                        "<li class='img'>全选</li>"+
                        "<li class='goods'>商品</li>"+
                        "<li class='color'>颜色、尺码</li>"+
                        "<li class='price'>单价</li>"+
                        "<li class='number'>数量</li>"+
                        "<li class='xiaoji'>小计(元)</li>"+
                        "<li class='delete'>操作</li>"+
                    "</ul>"+
                "</div>";
    for(var i = 0; i<goods.length;i++){
        mainText +="<div class='mainItem mainCont clearfix'>"+
                        "<div class='shop'>"+
                            "<input type='checkbox' checked>"+
                            "<span>"+goods[i].shop+"</span>"+
                        "</div>"+
                        "<ul  class='clearfix shangpin'>"+
                            "<li class='check'>"+"<input type='checkbox' checked>"+"</li>"+
                            "<li class='img'>"+"<img src=" + goods[i].img + "></li>"+
                            "<li class='goods'>"+ goods[i].name+ "</li>"+
                            "<li class='color'>"+goods[i].color+"</br>"+goods[i].size+"</li>"+
                            "<li class='price'>"+goods[i].price+"</li>"+
                            "<li class='number'><input type='button' value='-' class='reduceBtn'><span>"+goods[i].number+"</span><input type='button' value='+' class='addBtn'/></br><i>有货</i></li>"+
                            "<li class='xiaoji'>"+goods[i].price*goods[i].number+ "</li>"+
                            "<li class='delete'>"+"<a href='javascript:;'>删除</a>"+"</li>"+
                        "</ul>"+
                    "</div>";
    }
    /*code by zc*/
    var num =9;
    mainText +="<div class='mainBot'>"+
                    "<input class='checked' type='checkbox' checked>"+
                    "<span>全选</span>"+
                    "<ul>"+
                        "<li><span>总价：（不含运费）<i>￥</i><i class='zongjia'></i>元</span></li>"+
                        "<li><a href='luck.html'><input type='button' value='去结算' class='jsBtn'></a></li>"+
                    "</ul>"+
                "</div>";
    $("#goodsList").html(mainText);
    //数量--
    $(".reduceBtn").click(function(){
        var number = $(this).next().html();
        number--;
        if(number==0) number=1;
        $(this).next().html(number);
        var price = $(this).parent().prev().html();
        var xiaoji = $(this).parent().next().html();
        xiaoji = number*price;
        $(this).parent().next().html(xiaoji);
        var zongjia = compute();
        $(".zongjia").html(zongjia);
    });
    //数量++
    $(".addBtn").click(function(){
        var number = $(this).prev().html();
        number++;
        if(number==0) number=1;
        $(this).prev().html(number);
        var price = $(this).parent().prev().html();
        var xiaoji = $(this).parent().next().html();
        xiaoji = number*price;
        $(this).parent().next().html(xiaoji);
        var zongjia = compute();
        $(".zongjia").html(zongjia)
    });

    /*code by zc*/
    //计算总价函数封装
    function compute(){
        var rows = $(".shangpin");
        var total =0;
        for(var i = 0; i<rows.length; i++){
            var check = rows.eq(i).find("input:checkbox").prop("checked");
            if(check){
                var spanTxt = rows.eq(i).find("li:eq(6)");
                var spanNum = spanTxt.text();
                spanNum = parseInt(spanNum);
                total += spanNum;
            }
        }
        return total;
    }
    var zongjia = compute();
    $(".zongjia").html(zongjia);
    $(".shangpin").addClass("bg");

    //复选框勾选时总价变化
    $(".shangpin").find("input:checkbox").change(function(){
        var zongjia = compute();
        $(".zongjia").html(zongjia);
    });

    //复选框相互勾选影响问题
    $(".mainTitle").find("input:checkbox").change(function(){
        var onOff = $(this).prop("checked");
        $(".main").find("input:checkbox").prop("checked",onOff);
        if (onOff){
            $(".shangpin").addClass("bg");
        }else {
            $(".shangpin").removeClass("bg");
        }

    });

    $(".shop").find("input:checkbox").change(function(){
        var onOff2 = $(this).prop("checked");
        if(onOff2){
            $(this).parent().next().addClass("bg");
        }
        else {
            $(this).parent().next().removeClass("bg");
        }
        $(this).parent().next().find("input:checkbox").prop("checked",onOff2);
    });

    $(".mainBot").find("input:checkbox").change(function(){
        var onOff = $(this).prop("checked");
        $(".main").find("input:checkbox").prop("checked",onOff);
        if (onOff){
            $(".shangpin").addClass("bg");
        }else {
            $(".shangpin").removeClass("bg");
        }
    });
//所有复选框变换状态时价格改变
    $(".main").find("input:checkbox").change(function(){
        var zongjia = compute();
        $(".zongjia").html(zongjia);
    });

    //点击删除键删除整行

    $(".delete").find("a").click(function(){
       $(this).parent().parent().parent().remove();
        var zongjia = compute();
        $(".zongjia").html(zongjia);
    });

    $(".shangpin").find("input:checkbox").change(function(){
        var checked =  $(this).prop("checked");
        if (checked){
            $(this).parent().parent().addClass("bg");
        }else {
            $(this).parent().parent().removeClass("bg");
        }

    });









});