$(function(){
	animation();//动画效果
	searchResult();//查询结果页
	details();//企业详情页
	purchasePlan();//购买套餐页
	asscociationMapping();//关联图谱页
    reportMenu();//报告
    //点击报告支付按钮关闭遮罩层
    $("#play-single").click(function () {
        var _height = $(".mask-layer-content").height();
        $(".mask-layer-box").css({"opacity":0}).delay(500).hide();
        $(".mask-layer-content").css({"bottom":"-"+_height+"px"});
        setTimeout(function () {
            $(".mask-layer-content").hide();
        }, 300);
        $('html,body').css('overflow','auto');
    });
});
//动画效果animation()
function animation(){
	//click-bottom 底部滑动效果+遮罩层
	$(".click-bottom").click(function(){
        $('html,body').css({'overflow':'hidden','height':'100%'});
		$(".mask-layer-box,.mask-layer-content").show();
		setTimeout(function () {
            $(".mask-layer-box").css({"opacity":1});
		}, 10);
        setTimeout(function () {
            $(".mask-layer-content").css({"bottom":0});
        }, 5);
	});
    //关闭遮罩层
	$(".mask-layer-box,.i-down,.btn-cancel,.report-menu a").click(function(){
        $('html,body').css({'overflow':'auto','height':'auto '});
		var _height = $(".mask-layer-content").height();
		$(".report-menu").hide();
		$(".mask-layer-box").css({"opacity":0}).delay(500).hide();
		$(".mask-layer-content").css({"bottom":"-"+_height+"px"});
		setTimeout(function () {
			$(".mask-layer-content").hide();
		}, 300);
	})
}
//查询结果页
function searchResult(){
	//取消
    $(".btn-close").click(function () {
        $(".search-list,.hide-box,.search-empty-hide").hide();
        $(".index-box,.report-box").show();
        $(".search-input").val("");
    });
    // 搜索结果页滚动事件
    var searchBox = $('.search-include');
    $(document).on('scroll',function(){
        var	_scroll = $(document).scrollTop();
        var searchInclude = searchBox.height();
        if(searchInclude<=_scroll){
            searchBox.css({'box-shadow':'0 2px 10px -5px rgba(0,0,0,.2)'})
        }else if(_scroll<=searchInclude){
            searchBox.css({'box-shadow':'none'})
        }
    });
}
//企业详情页
function details(){
	  $(".headerDetails-ul-menu-box2 li").click(function(){
		  var _i = $(this).index();
		  $(".headerDetails-ul-menu-box2 li").removeClass("active");
		  $(this).addClass("active");
		  var menuBoxheight = $("#menuBox").height();
		  console.log(menuBoxheight)
		  var _detailsContent = $(".details-list-title").eq(_i).offset().top;
		  $("html,body").animate({scrollTop:_detailsContent-menuBoxheight});
	  });
	//菜单-点击事件
	$(".headerDetails-nav-box .headerDetails-nav-content").click(function(){
		var _i = $(this).index();
		//active-blue全部,active-red警报,active-orange负向,active-violet中性,active-azure正向,active-green利好
		$(".headerDetails-nav-box .headerDetails-nav-content").removeClass("active-blue active-red active-orange active-violet active-azure active-green");
		switch(_i){
			case 0: $(this).addClass("active-blue");
			break;
			case 1: $(this).addClass("active-red");
			break;
			case 2: $(this).addClass("active-orange");
			break;
			case 3: $(this).addClass("active-azure");
			break;
			case 4: $(this).addClass("active-violet");
			break;
			/*case 5: $(this).addClass("active-green");
			break;*/
		}
		$(".details-list-box").hide();
		$(".details-list-box").eq(_i).show();
	});
	$(".headerDetails-ul-menu-box li").on("click",function(ev){
	    var moveX = $(this).position().left+$(this).parent().scrollLeft();//位置
	    var pageX = document.documentElement.clientWidth;//总宽
	    var blockWidth = $(this).width();//每个元素的宽度
	    var left = moveX-(pageX/2)+(blockWidth/2);
		$(".headerDetails-ul-menu-box li").removeClass("active");
	    $(this).addClass("active");
		$(".bottom-line").animate({"left":moveX},0);
	    $(".headerDetails-ul-menu-box").scrollLeft(left);
	});
    $(".headerDetails-ul-menu-box2 li").on("click",function(ev){
        var moveX = $(this).position().left+$(this).parent().scrollLeft();//位置
        var pageX = document.documentElement.clientWidth;//总宽
        var blockWidth = $(this).width();//每个元素的宽度
        var left = moveX-(pageX/2)+(blockWidth/2);
        $(".headerDetails-ul-menu-box2").scrollLeft(left);
    })
}
//购买套餐
function purchasePlan(){
	var price;
	/*$(".price-box li").click(function(){
		var _i = $(this).index();
		$(".price-box li").removeClass("active");
		$(this).addClass("active");
		$(".price-content").hide();
		$(".price-content").eq(_i).show();
		price = $(this).find("span").html();
        $(".btn-pay span").html(price);
	});
    $(".price-box li").on("click",function(ev){
        var moveX = $(this).position().left+$(this).parent().scrollLeft();//位置
        var pageX = document.documentElement.clientWidth;//总宽
        var blockWidth = $(this).width();//每个元素的宽度
        var left = moveX-(pageX/2)+(blockWidth/2);
        $(".price-box").scrollLeft(left);
    });*/
	$(".set-meal-box .price-box2").click(function () {
        $(".set-meal-box .price-box2").removeClass("active");
        $(this).addClass("active");
        price = $(this).find(".price-num span").html();
        console.log(price)
        $(".btn-pay span").html(price);
    })
}
//关联图谱
function asscociationMapping(){
	$(".am-tab li").click(function(){
		$(".am-tab li").removeClass("active");
		$(this).addClass("active");
	})
}
//显示搜索内容
function Entrance(num) {
    $(".index-box,.report-box").hide();//首页
	$(".search-list").show();
    $(".search-input").focus();
    $('.search-include').css({'box-shadow':'none'});
    /* 搜索框输入至少2个字符显示删除文字图标 */
    $(".search-input").keyup(function(event){
        var searchInputVal = $(this).val().length;
        if(searchInputVal>=2){
            $(".i-delete").show();
        }else if(searchInputVal==0){
            $(".i-delete,.search-empty-hide").hide();
            $(".search-content"+num).hide();
        }
    });
    $(".search-input").keyup(function(event) {
        if(event.keyCode == 13) {//回车事件
            $(".hide-box").hide()
            $(".search-content" + num).show();
            $(".search-empty-hide").show();
        }
    })
    /* 搜索框点击删除图标，文字清空 */
    $(".i-delete").click(function(){
        $(".search-input").val("");
        $(".i-delete,.search-empty-hide").hide();
        $(".search-content"+num).hide();
    });
    if(num==1){
        $(".search-box input").attr('placeholder',"请输入企业名称，如“小米科技”")
    }else if(num==2){
        $(".search-box input").attr('placeholder',"任意关键词全文匹配，查询更多风险信息")
    }else if(num==3){
        $(".search-box input").attr('placeholder',"请输入企业名称，查询企业股东和对外投资企业关联风险")
    }else if(num==4){
        $(".search-box input").attr('placeholder',"请输入当事人姓名＋身份证号")
    }

}
//报告显示遮罩层
function showMaskLayer(num) {
    $('html,body').css({'overflow':'hidden','height':'100%'});
    $(".mask-layer-box,.mask-layer-content").show();
    $(".title-hide").hide()
    $(".title-show"+num).show();
    setTimeout(function () {
        $(".mask-layer-box").css({"opacity":1});
    }, 10);
    setTimeout(function () {
        $(".mask-layer-content").css({"bottom":0});
    }, 5);
    if (num==2){
        $("#play-single").attr('href','baogao2.html');
    }
}
//报告
function reportMenu() {
    $(".i-menu").click(function () {
        $(".mask-layer-box,.report-menu").show();
        setTimeout(function () {
            $(".mask-layer-box").css({"opacity":1});
        }, 10);
    })
}


	