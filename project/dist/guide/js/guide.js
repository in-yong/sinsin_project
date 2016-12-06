$(function(){
	$("#header>ul>li>a").on("click",function(e) {
		e.preventDefault();
		var myObj = $(this);
		var href = myObj.attr("href").substring(1);
		$("#header>ul>li>a.on").removeClass("on");
		myObj.addClass("on");
		$("#guide_frame").attr("src",href+".html");
		//alet(1243)
	});	
});