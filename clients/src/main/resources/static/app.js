"use strict";
// Define your client-side logic here.
(function() {
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
})();

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



