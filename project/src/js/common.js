$(document).ready(function() {
  //S: 2016-12-22
  var thColor_1 = "#4e6678";
  //E: 2016-12-22

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


  /*스크롤테이블*/
  function ScTable(opt) {
      this.myObj = opt.myObj;
      this.$myObj = $(opt.myObj);
      this.tbin_sc_h = opt.tbinH;
      this.tbody_sc_h = this.tbin_sc_h + 20;

      $(".tbody_sc_wrap",this.$myObj).css({
         "max-height":this.tbody_sc_h+"px"
      });
      $(".tbin_sc_wrap>div",this.$myObj).css({
         "max-height":this.tbin_sc_h + "px"
      });

      this.h1 = null;
      this.h2 = null;
      this.h3 = null;

      if($(".tbin_sc_wrap>div",this.$myObj).get(0)) {
        this.h1 = $(".tbin_sc_wrap>div",this.$myObj).get(0).scrollHeight;
        this.h2 = $(".tbin_sc_wrap>div",this.$myObj).height();
        this.h3 = this.h1 - this.h2;

        
        var tdSize = $(".tbody_sc_wrap>div>table>tbody>tr:first>td").size();
        var newTdRow = $("<tr><td colspan='"+tdSize+"' style='border:none;height:21px;'></td></tr>");
        $(".tbody_sc_wrap>div>table>tbody",this.$myObj).append(newTdRow);
    
      }
      this.bindEvent();
   }
   ScTable.prototype.bindEvent = function() {
      $(".tbody_sc_wrap", this.$myObj).on("scroll",$.proxy(this.tbScrollMove, this));
   }
   var old_tbody_sc_l = 0;
   var old_tbody_sc_t = 0;
   ScTable.prototype.tbScrollMove = function(e) {
      var myObj = this.$myObj;
      var evObj = $(e.target);
      var tbody_sc_t = evObj.scrollTop();
      var tbody_sc_l = evObj.scrollLeft();
      //console.log(tbody_sc_t);
      
      $(".thead_1 table", myObj).css({marginLeft:-tbody_sc_l+"px"});
      if(tbody_sc_t > (this.h3+20) || old_tbody_sc_l != tbody_sc_l && old_tbody_sc_t == tbody_sc_t) {
        e.preventDefault();
        return false;
      }
      if(old_tbody_sc_t != tbody_sc_t || (tbody_sc_t == 0 && old_tbody_sc_t>0)) {
        $(".tbin_sc_wrap > div", myObj).css({"max-height":"none"});
        //console.log(this.tbin_sc_h + parseInt(tbody_sc_t));
        $(".tbin_sc_wrap > div", myObj).height(this.tbin_sc_h + parseInt(tbody_sc_t));
      }
      
      old_tbody_sc_l = tbody_sc_l;
   }

   var arrScTb = [];
   $.fn.tbinScTable = function(opt) {
      $(this).each(function(i, o){
         arrScTb[i] = new ScTable(opt);
      });
   }

   $(".sctable").tbinScTable({myObj:".sctable",tbinH:200});

  /*스크롤테이블2*/
  function ScTable2(myObj) {
      this.myObj = myObj; 
      this.headTable = $(".thead_wrap>table", this.myObj);
      this.bodyWrap = $(".tbody_wrap", this.myObj);
      this.bindEvent();
  }
  ScTable2.prototype.bindEvent = function() {
      $(this.bodyWrap).on("scroll",$.proxy(this.scrollMove, this));
  }
  ScTable2.prototype.scrollMove = function(e) {
    var evntObj = $(e.target);
    var scr_l = evntObj.scrollLeft();
    //console.log(scr_l);
    this.headTable.css({
      marginLeft:-scr_l+"px"
    });
  }
  $.fn.scrTable = function() {
      $(this).each(function(i, o){
         arrScTb[i] = new ScTable2($(this));
      });
  }
  $(".sctable2").scrTable();



 /*팝업*/
  var popup_t = "";
  popup_t += '<div class="openPopupWrap">';
  popup_t += '<div class="popup_bar"></div>';
  popup_t += '<div class="messagepop pop"></div>';
  popup_t += '<input type="button" class="closeBtn" value="창닫기">';
  popup_t += '</div>';
  var popObj = null;
  var popBefore = null;

  $(document).on("click",".openPopupWrap .closeBtn", function() {
     popBefore.remove();
     popBefore = null;
  });

  $(".openPopTag").on('click', function() {
        if(popBefore) {
           popBefore.remove();
           popBefore = null;
        }

        $(this).addClass("selected");
        popObj = $(popup_t);
        $("body").append(popObj);
        $.get(this.href, function(data) {
              $(".pop").html(data);
        });
        popBefore = popObj;
     return false;
  });

  /*탭메뉴*/
  /*tit 이름과 같아야 작동됩니다*/
  function Tabmenu_a(obj) {
    var myThis = this;
    this.myObj = $(obj);
    this.arrSec = null;
    if(this.myObj.attr("data-show-controll")){
      //console.log(JSON.parse(JSON.stringify(this.myObj.attr("data-show-controll"))));
      this.arrSec = JSON.parse(this.myObj.attr("data-show-controll"));
    }
    this.tab_a = this.myObj.find("a");
    this.tab_on = this.myObj.find("a.on");
    this.arrTit = [];
    this.tab_a.each(function(i, o){
        var aText = $(o).text();
        var theObj = $(document).find(".tit_2:contains('" + aText + "')"); 
        myThis.arrTit.push(theObj);
    });

    $.each(this.arrTit, function(i,o){
      if($(o).text() == myThis.tab_on.text()) {
        $(o).closest(".row").show();
      } else {
        $(o).closest(".row").hide();
      }
    });

    this.tit_2 = $(document).find(".tit_2");
    this.bindEvent(this.tab_a);
  }
  Tabmenu_a.prototype.bindEvent = function(tabA) {
    tabA.on({
      "click": $.proxy(this.tabShowHide, this)
    });
  };
  Tabmenu_a.prototype.tabShowHide = function(e) {
    e.preventDefault();
    var clickA = $(e.target);
    var clickTxt = clickA.text();
    this.tab_a.removeClass("on");
    clickA.addClass("on");
    
    if(this.arrSec) {
      console.log(typeof this.arrSec);
      console.log(this.arrSec);
      $.each(this.arrSec,function(i,o){
        var showSec = $("*[data-sec-name=" + o.showSec +"]");
        if(clickTxt == o.tabName){
          showSec.show();
        }else{
          showSec.hide();
        }
      });
    }
    $.each(this.arrTit, function(i,o){
      if($(o).text() == clickTxt) {
        $(o).closest(".row").show();
      } else {
        $(o).closest(".row").hide();
      }
    });
  };

  var arrTag = [];
  $.fn.tabMenu_a = function() {
    $(this).each(function(i,o){
        arrTag[i] = new Tabmenu_a(o);
    });
  };
  $(".tabmenu_wrap").tabMenu_a();
  
  //S: 2016-12-22
  var thColorStyle = "<style>";
  thColorStyle += "th {background-color:" + thColor_1 + "}";
  thColorStyle += ".basic_table_column_1 .dataTables_scrollHead th:last-child:after {background-color:" + thColor_1 + "}";
  thColorStyle += "</style>";
  $("head").append(thColorStyle);    

  $.each($('.table_column_1').not(".notScroll"), function(i,o){
    var scrollTable = $(o);
    var dataTableHeight = $(o).attr("data-table-height");
    var dataTableScrollY = $(o).attr("data-table-scrolly");
    var dataTableScrollX = $(o).attr("data-table-scrollx");
    var scrollTableDefault = {
      "scrollY":"200px",
      "scrollX":true,
      "scrollCollapse":true,
      "autoWidth": false,
      "info":false,
      "bFilter": false,
      "paging":false,
      "bSort":false
    }

    if(dataTableHeight) {
      $.extend(scrollTableDefault, {"scrollY":dataTableHeight});
    }
    if(dataTableScrollY) {
      $.extend(scrollTableDefault, {"scrollY":eval(dataTableScrollY)});
    }
    if(dataTableScrollX) {
      $.extend(scrollTableDefault, {"scrollY":eval(dataTableScrollX)});
    }

    scrollTable.DataTable(scrollTableDefault);
  });
  //E: 2016-12-22
}); 