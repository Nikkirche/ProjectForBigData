"use strict";
// Define your client-side logic here.
// Material Select Initialization


$(document).ready(function() {

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

        /*
        if( $("#tag").val() == "JKH" ){
            $("#tagSelect").removeClass("col-md-12");
            $("#tagSelect").addClass("col-md-4");
            $("#jkhTags").show(700);
         }
        else if( $("#tag").val() == "Blago" ){
            $("#tagSelect").removeClass("col-md-12");
            $("#tagSelect").addClass("col-md-4");
            $("#blagoTags").show(700);
         }
        else{
            $("#jkhTags").hide();
            $("#blagoTags").hide();
        }*/
    });



     $('.inpt').on('keyup change', function(){
      if( $("#adminDistrict").val().length != 0 && $("#request").val().length > 30){
            $("#submitBtn").removeAttr("disabled");
            $("#submitBtn").removeClass("btn-outline-secondary");
            $("#submitBtn").addClass("btn-warning");
        }
      else{
            $("#submitBtn").prop("disabled", true);
            $("#submitBtn").removeClass("btn-warning");
            $("#submitBtn").addClass("btn-outline-secondary");
      }
     });
});

/*(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();*/

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
        requestText: $('#request').val()
    }
    postMethod('postData', data);
    getMethod('getData');
})



