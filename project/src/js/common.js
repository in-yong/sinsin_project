$(document).ready(function() {
  $.each($('.table_column_1').not(".notScroll"), function(i,o){
      var scrollTable = $(o);
      var dataTableHeight = $(o).attr("data-table-height");
      
      var scrollTableDefault = {
        "scrollY":"200px",
        "scrollX":true,
        "scrollCollapse": true,
        "info":false,
        "bFilter": false,
        "paging":false
      }
      if(dataTableHeight) {
        $.extend(scrollTableDefault, {"scrollY":dataTableHeight});
      }
      scrollTable.DataTable(scrollTableDefault);
  });

  var gnbHideInterval = null;
  function resetGnb() {
    $("#header nav>ul>li>a.on").removeClass("on");
    $("#header nav>ul ul:visible").hide();
  }
  function gnbClearInterval() {
    if(gnbHideInterval) {
       clearTimeout(gnbHideInterval);
    }  
  }
  
  $(document).on("mouseover focus","#header nav>ul>li>a", function(){
    gnbClearInterval();
    var myObj = $(this);
    resetGnb();
    myObj.addClass("on");
    $("#header nav>ul ul:visible").hide();
    myObj.next().show();
  });
  $(document).on("mouseenter","#header nav>ul ul", function(){
    gnbClearInterval();
  })
  $(document).on("mouseleave","#header nav", function() {
    gnbClearInterval();
    gnbHideInterval = setTimeout(resetGnb,800);
  });
}); 