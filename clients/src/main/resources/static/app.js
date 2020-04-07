"use strict";
// Define your client-side logic here.
$(document).ready(function () {

    $("#jkhTags").hide();
    $("#blagoTags").hide();
    $("#illegalTags").hide();
    $("#transTags").hide();
    $("#forma").hide();
    /*$("#low-visionMenu").hide();*/
    //var response = grecaptcha.getResponse();

    $("#tag").on("change", function () {
        switch ($("#tag").val()) {
            case "JKH":
                //$("#tagSelect").removeClass("col-md-12");
                //$("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#jkhTags").show(300);
                break;

            case "Blago":
                //$("#tagSelect").removeClass("col-md-12");
                //$("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#blagoTags").show(300);
                break;

            case "Illegal":
                //$("#tagSelect").removeClass("col-md-12");
                //$("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#illegalTags").show(300);
                break;

            case "Transport":
                //$("#tagSelect").removeClass("col-md-12");
                //$("#tagSelect").addClass("col-md-4");
                $(".podTags:visible").hide();
                $("#transTags").show(300);
                break;

            case "Other":
                //$("#tagSelect").addClass("col-md-12");
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
            $(window).scrollTop(0);
        });
    });

    $("#nextBtn").keyup(function(event){
        if(event.keyCode == 13){
            $("#nextBtn").click();
        }
    });

    $('#backBtn').on('click', function () {
        grecaptcha.reset();
        $("#forma").fadeOut(300, function () {
            $("#privet").fadeIn(100);
            $(window).scrollTop(0);
        });
    });

    $("#backBtn").keyup(function(event){
            if(event.keyCode == 13){
                $("#backBtn").click();
            }
        });

    $('#submitBtn').on('click', function () {
        grecaptcha.reset();
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

    $("#submitBtn").keyup(function(event){
            if(event.keyCode == 13){
                $("#submitBtn").click();
            }
        });

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

    /*$("#low-visionBtn").keyup(function(event){
                if(event.keyCode == 13){
                    $("#low-visionBtn").click();
                }
            });

    $('#low-visionBtn').on('click', function () {
            $("#low-visionMenu").toggle();
        });*/

    $('#Color-n').click(function () {
                $(".window1").css({"color" : "#212529","background-color" : "#EAEAEA"});
                $(".btn").css({"color" : "#ffffff","background-color" : "#007bff"});
                $(".fa-check-circle").css("color", "#007bff");
                $(".custom-select,.form-control").css("border", "1px solid #ced4da");
                $("#low-visionMenu").addClass("shadow");
                $("#low-visionMenu").css("border", "");
                $("hr").css("border", "");
        });
    $('#Color-contrast').click(function () {
                $(".window1").css({"color" : "#000000","background-color" : "#ffffff"});
                $(".btn").css({"color" : "#ffffff","background-color" : "#000000"});
                $(".fa-check-circle").css("color", "#000000");
                $(".custom-select,.form-control").css("border", "1px solid #000000");
                $("#low-visionMenu").removeClass("shadow");
                $("#low-visionMenu").css("border", "2px solid #000000");
                $("hr").css("border", "1px solid #000000");
        });

    $('#stringSpacing-n').click(function () {
                $("p").css("line-height", "1.5");
                $("label").css("line-height", "1.5");
                $("small").css("line-height", "1.5");
                $(".h1").css("line-height", "1.2");
        });
    $('#stringSpacing-l').click(function () {
                $("p").css("line-height", "2.5");
                $("label").css("line-height", "2.5");
                $("small").css("line-height", "2.5");
                $(".h1").css("line-height", "2.5");
        });
    $('#stringSpacing-s').click(function () {
                $("p").css("line-height", "1");
                $("label").css("line-height", "1");
                $("small").css("line-height", "1");
                $(".h1").css("line-height", "1");
        });

    $('#letterSpacing-n').click(function () {
                //$("span").css("letter-spacing", "normal");
                $("p").css("letter-spacing", "normal");
                $("label").css("letter-spacing", "normal");
                $("small").css("letter-spacing", "normal");
                $(".h1").css("letter-spacing", "normal");
        });
    $('#letterSpacing-l').click(function () {
                //$("span").css("letter-spacing", "0.1em");
                $("p").css("letter-spacing", "0.1em");
                $("label").css("letter-spacing", "0.1em");
                $("small").css("letter-spacing", "0.1em");
                $(".h1").css("letter-spacing", "0.1em");
        });
    $('#letterSpacing-xl').click(function () {
                //$("span").css("letter-spacing", "0.3em");
                $("p").css("letter-spacing", "0.3em");
                $("label").css("letter-spacing", "0.3em");
                $("small").css("letter-spacing", "0.3em");
                $(".h1").css("letter-spacing", "0.3em");
                $(".btn").css("letter-spacing", "0.3em");
                $("select").css("letter-spacing", "0.3em");
        });

    $('#font-T').click(function () {
                $(".window1").css("font-family", "Tahoma");
        });
    $('#font-TNR').click(function () {
                $(".window1").css("font-family", "Times New Roman");
        });

});

var validation = function() {
        if ($("#adminDistrict").val() != null && $("#request").val().length > 30 && $("#tag").val() != null
         && grecaptcha.getResponse().length != 0) {
            $("#submitBtn").attr('tabindex', 0);
            $("#submitBtn").removeClass("disabledbutton");
            $("#submitBtn").removeClass("btn-outline-secondary");
        } else {
            $("#submitBtn").removeAttr('tabindex', 0);
            $("#submitBtn").addClass("disabledbutton");
            $("#submitBtn").removeClass("btn-primary");
        }
}
$('.inpt').on('keyup', 'change', validation);
$('.btn').on('keyup', 'click', validation);
$('#close').on('keyup', 'click', validation);