$(document).ready(function() {
  $.each($('.table_column_1'), function(i,o){
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
  /*$('.table_column_1').DataTable( {
    "scrollY":"200px",
    "scrollX":true,
    "scrollCollapse": true,
    "info":false,
    "bFilter": false,
    "paging":false
  } );*/
}); 