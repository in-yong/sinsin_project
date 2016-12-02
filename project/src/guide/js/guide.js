  $(function() {
    $(".guide_table td").hover(function(){
      $(this).css({backgroundColor:"#ddd"}).siblings().css({backgroundColor:"#ddd"});
    },function(){
      $(this).css({backgroundColor:"#fff"}).siblings().css({backgroundColor:"#fff"});
    })
    var idxThFile = $(".guide_table th").index($(".guide_table th:contains('파일명')"));
    var idxThIng = $(".guide_table th").index($(".guide_table th:contains('진행여부')"));
    var idxManager = $(".guide_table th").index($(".guide_table th:contains('담당자')"));
    $(".guide_table tr").find("td:eq("+idxThFile+")").each(function(i, o){
      var pageFullName = $(o).text();
      var pageName;
      var idxSlash = pageFullName.lastIndexOf("/");
      if(idxSlash>=0) {
        pageName = pageFullName.substring(idxSlash+1);
      } else {
        pageName= pageFullName;
      }
       
      var pageUrl = $("<a href='"+pageFullName+"' target='_blank'>"+pageName+"</a>");
      $(o).html(pageUrl);
    });
   
	var status_num_1 =0;
	var status_num_2 =0;
	var status_num_3 =0;
	var status_num_4 =0;

    $(".guide_table tr").find("td:eq("+idxThIng+")").each(function(i, o){
       var ingTxt = $(o).text();
       if(ingTxt == "" || ingTxt == "-") {
         $(o).text("-");

		 if(!$(o).siblings().parent().hasClass("skipNum")) {status_num_1++;}
       } else if (ingTxt == "완료") {
         $(o).text("완료").css({color:"#000"});
		 if(!$(o).siblings().parent().hasClass("skipNum")) {status_num_2++;}
       } else if (ingTxt == "진행중") {
         $(o).text("진행중").css({color:"#060"});
		 if(!$(o).siblings().parent().hasClass("skipNum")) {status_num_3++;}
       } else if (ingTxt == "보류중") {
         $(o).text("보류중").css({color:"#600"});
		 if(!$(o).siblings().parent().hasClass("skipNum")) {status_num_4++;}
       }
    });

	$(".status_ing dt").each(function(i, o) {
		var status_title = $(o).text();
		if(status_title == "새문서") {
			$(o).next().text(status_num_1);
		} else if(status_title == "진행중") {
			$(o).next().text(status_num_2);
		} else if(status_title == "완료") {
			$(o).next().text(status_num_3);
		} else if(status_title == "보류") {
			$(o).next().text(status_num_4);
		}
	});

    var cNum = $(".cat, .cat~tr").size();
    $(".cat, .cat~tr").each(function(i, o) {
      $(o).find("td:first").text(cNum);
      cNum--;
    });
  });