"use strict";
// Define your client-side logic here.
    $("#jkhTags").hide();
    $("#blagoTags").hide();
    $("#illegalTags").hide();
    $("#transTags").hide();


    $("#tag").on("change", function(){
        switch( $("#tag").val() ) {
            case "JKH":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#jkhTags").show(700);
                break;

            case "Blago":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#blagoTags").show(700);
                break;

            case "Illegal":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#illegalTags").show(700);
                break;

            case "Transport":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#transTags").show(700);
                break;

            case "Other":
                $("#tagSelect").addClass("col-md-12");
                $(".podTags:visible").hide();
                break;
        }
    });

 $('.inpt').on('keyup change', function(){
      if( $("#adminDistrict").val().length != 0 && $("#request").val().length > 30){
            $("#submitBtn").removeAttr("disabled");
            $("#submitBtn").removeClass("btn-outline-secondary");
            $("#submitBtn").addClass("btn-primary");
        }
      else{
            $("#submitBtn").prop("disabled", true);
            $("#submitBtn").removeClass("btn-primary");
            $("#submitBtn").addClass("btn-outline-secondary");
      }
     });

function getMethod(address){
    $.get(`/${address}`,  // url
      function (data, textStatus, jqXHR) {  // success callback
          console.log('status: ' + textStatus + ', data:' + data);
    });
}

function postMethod(address, data){
    $.post(`/${address}`, data)
      .done(function( requestData ) {
        alert( "Data Loaded: " + requestData );
      });
}

$('#submitBtn').on('click', function(){
    console.log('clicked')
    var data = {
        district: $('#adminDistrict').val(),
        requestText: $('#request').val(),
        $($('#seltag').find('div:visible select')[0]).val(),
        $($('#seltag').find('div:visible select')[1]).val()
    }
    postMethod('postData', data);
    getMethod('getData');
})



