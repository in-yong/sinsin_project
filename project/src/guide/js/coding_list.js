  $(function() {
    $(".guide_table td").hover(function(){
      $(this).css({backgroundColor:"#ddd"}).siblings().not("td[rowspan]").css({backgroundColor:"#ddd"});
    },function(){
      $(this).css({backgroundColor:"#fff"}).siblings().css({backgroundColor:"#fff"});
    })
    var idxThFile = $(".guide_table th").index($(".guide_table th:contains('파일명')"));
    var idxThIng = $(".guide_table th").index($(".guide_table th:contains('진행여부')"));
    var idxManager = $(".guide_table th").index($(".guide_table th:contains('담당자')"));
    $(".guide_table tr").find("td:eq("+idxThFile+")").each(function(i, o){
		var myObj = $(o);
		if(i == 0) {
			initTdNum = $(o).siblings().size();
		}
		if(initTdNum > $(o).siblings().size()) {
			myObj = $(o).prev();
		}
		var pageFullName = myObj.text();
		var pageName;
		var idxSlash = pageFullName.lastIndexOf("/");
		if(idxSlash >= 0) {
			pageName = pageFullName.substring(idxSlash+1);
		} else {
			pageName= pageFullName;
		}

		var pageUrl = $("<a href='"+pageFullName+"' target='_blank'>"+pageName+"</a>");
		myObj.html(pageUrl);
    });
   
	var status_num_1 =0;
	var status_num_2 =0;
	var status_num_3 =0;
	var status_num_4 =0;
	var initTdNum;
    $(".guide_table tr").find("td:eq("+idxThIng+")").each(function(i, o){
		var myObj = $(o);
		if(i == 0) {
			initTdNum = $(o).siblings().size();
		}
		if(initTdNum > $(o).siblings().size()) {
			myObj = $(o).prev();
		}

		var ingTxt = myObj.text();
		if(ingTxt == "" || ingTxt == "-") {
		 myObj.text("-");
		 if(!myObj.siblings().parent().hasClass("skipNum")) {status_num_1++;}
		} else if (ingTxt == "완료") {
		 myObj.text("완료").css({color:"#000"});
		 if(!myObj.siblings().parent().hasClass("skipNum")) {status_num_2++;}
		} else if (ingTxt == "진행중") {
		 myObj.text("진행중").css({color:"#060"});
		 if(!myObj.siblings().parent().hasClass("skipNum")) {status_num_3++;}
		} else if (ingTxt == "보류중") {
		 myObj.text("보류중").css({color:"#600"});
		 if(!myObj.siblings().parent().hasClass("skipNum")) {status_num_4++;}
		}
    });
	
	$(".status_ing dt").each(function(i, o) {
		var status_title = $(o).text();
		if(status_title == "새문서") {
			$(o).next().text(status_num_1);
		} else if(status_title == "완료") {
			$(o).next().text(status_num_2);
		} else if(status_title == "진행중") {
			$(o).next().text(status_num_3);
		} else if(status_title == "보류") {
			$(o).next().text(status_num_4);
		}
	});
	function initMngName(m) {
		$(".guide_table tr").find("td:eq("+idxManager+")").each(function(i, o){
			var myObj = $(o);
			if(i == 0) {
				initTdNum = $(o).siblings().size();
			}
			if(initTdNum > $(o).siblings().size()) {
				myObj = $(o).prev();
			}
			var mngName = myObj.text();
			if(location.hash != "#sinsin") { 
						mngName = "";
						$(".docReq_1").hide();
			}
			if(m) {
				console.log(m.css("color") == "rgb(34, 177, 76)");
				if(m.css("color") == "rgb(34, 177, 76)") {
					myObj.html("<a href='#" + mngName + "' class='cellManage'>" + mngName + "</a>");
				} else {
					if(mngName != m.text()) {
						myObj.html("<a href='#" + mngName + "' class='cellManage' style='display:none'>" + mngName + "</a>");
					} else {
						myObj.html("<a href='#" + mngName + "' class='cellManage'>" + mngName + "</a>");
					}
				}
			} else {
				myObj.html("<a href='#" + mngName + "' class='cellManage'>" + mngName + "</a>");
			}
		});
	}
	initMngName();
	function selectMng(e) {
		e.preventDefault();
		var myObj = $(this);
		var mngName = myObj.text();
		initMngName(myObj);
		if(myObj.css("color") != "rgb(34, 177, 76)") {
			$(".guide_table td:contains('" + mngName + "') a").css({fontWeight:"bold",color:"#22b14c"});
		}
	}
	
	$(document).on("click",".cellManage",selectMng);
	
    var cNum = $(".cat, .cat~tr").size();
    $(".cat, .cat~tr").each(function(i, o) {
      $(o).find("td:first").text(cNum);
      cNum--;
    });


	/*상단메뉴*/
	function fncGnb(e) {
		e.preventDefault();
		var myObj = $(this);
		var href = myObj.attr("href");
		var href_txt = href.substring(href.indexOf("#")+1);
		$("#header>ul>li>a.on").removeClass("on");
		myObj.addClass("on");
		$("tbody tr").css({display:"table-row"});
		if(href_txt == "all" || href_txt == "") {
			return false;
		}
		if(href_txt) {
			console.log("tr."+href_txt);
			var theTr = $("tr."+href_txt);
			$("tbody tr").not(theTr).css({display:"none"});
			theTr.nextUntil(".cat").css({display:"table-row"});
		}
	}
	$("#header>ul>li>a").on({
		click:fncGnb
	});
  });