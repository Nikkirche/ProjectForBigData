"use strict";
// Define your client-side logic here.
$(document).ready(function () {

    $("#jkhTags").hide();
    $("#blagoTags").hide();
    $("#illegalTags").hide();
    $("#transTags").hide();
    $("#forma").hide();
    //var response = grecaptcha.getResponse();

    $("#tag").on("change", function () {
        switch ($("#tag").val()) {
            case "JKH":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#jkhTags").show(300);
                break;

            case "Blago":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#blagoTags").show(300);
                break;

            case "Illegal":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#illegalTags").show(300);
                break;

            case "Transport":
                $("#tagSelect").removeClass("col-md-12");
                $("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#transTags").show(300);
                break;

            case "Other":
                $("#tagSelect").addClass("col-md-12");
                $(".podTags:visible").hide();
                break;
        }
    });



    function getMethod(address) {
        $.get(`/${address}`,  // url
            function (data, textStatus, jqXHR) {  // success callback
                console.log('status: ' + textStatus + ', data:' + data);
                $('#myModal').modal('show')//показывает уведомление
            });
    };

    function postMethod(address, data) {
        $.post(`/${address}`, data)
            .done(function (requestData) {
                alert("Data Loaded: " + requestData);
            });
    };

    $('#nextBtn').on('click', function () {
        //$('#myModal').modal('show') для теста уведомления
        $("#privet").fadeOut(300, function () {
            $("#forma").fadeIn(100);
        });
    });

    $('#backBtn').on('click', function () {
        $("#forma").fadeOut(300, function () {
            $("#privet").fadeIn(100);
        });
    });

    $('#submitBtn').on('click', function () {
        console.log(JSON.stringify(data))
        console.log('clicked')
        var data = {
            district: $('#adminDistrict').val(),
                requestText: $('#request').val(),
                //subfield: $($('#seltag').find('div:visible select')[0]).val()
            //                 //field: $($('#seltag').find('div:visible select')[1]).val

            }
        ;
        postMethod('postData', data);
        var result = getMethod('getData');
        console.log(result)
    })



    /*// implement on the backend
    function backend_API_challenge() {
        $.ajax({
            type: "POST",
            url: 'https://www.google.com/recaptcha/api/siteverify',
            data: {"secret" : "6Lczi-UUAAAAAPaCIUsKZdk_VK3CrVSQboH4OIcz", "response" : response, "remoteip":"localhost"},
            contentType: 'application/x-www-form-urlencoded',
            success: function(data) { console.log(data); }
        });
    }*/




});

var validation = function() {
        if ($("#adminDistrict").val() != null && $("#request").val().length > 30 && $("#tag").val() != null
         && grecaptcha.getResponse().length != 0) {
            $("#submitBtn").removeClass("disabledbutton");
            $("#submitBtn").removeClass("btn-outline-secondary");
            $("#submitBtn").addClass("btn-primary");
        } else {
            $("#submitBtn").addClass("disabledbutton");
            $("#submitBtn").removeClass("btn-primary");
            $("#submitBtn").addClass("btn-outline-secondary");
        }
}
$('.inpt').on('keyup change', validation);