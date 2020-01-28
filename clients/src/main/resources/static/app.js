"use strict";
// Define your client-side logic here.
$(document).ready(function () {

    $("#jkhTags").hide();
    $("#blagoTags").hide();
    $("#illegalTags").hide();
    $("#transTags").hide();
    $("#forma").hide();

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

    $('.inpt').on('keyup change', function () {
        if ($("#adminDistrict").val() != null && $("#request").val().length > 30 && $("#tag").val() != null) {
            $("#submitBtn").removeClass("disabledbutton");
            $("#submitBtn").removeClass("btn-outline-secondary");
            $("#submitBtn").addClass("btn-primary");
        } else {
            $("#submitBtn").prop("disabled", true);
            $("#submitBtn").removeClass("btn-primary");
            $("#submitBtn").addClass("btn-outline-secondary");
        }
    });

    function getMethod(address) {
        $.get(`/${address}`,  // url
            function (data, textStatus, jqXHR) {  // success callback
                console.log('status: ' + textStatus + ', data:' + data);
            });
    };

    function postMethod(address, data) {
        $.post(`/${address}`, data)
            .done(function (requestData) {
                alert("Data Loaded: " + requestData);
            });
    };

    $('#nextBtn').on('click', function () {
        $("#privet").fadeOut(500, function () {
            $("#forma").fadeIn(200);
        });
    });

    $('#backBtn').on('click', function () {
        $("#forma").fadeOut(500, function () {
            $("#privet").fadeIn(200);
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
});



