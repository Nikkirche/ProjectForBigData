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

window.fn = {};

window.fn.request = function (url, method, callback) {
var request = new XMLHttpRequest();
request.open(method, url, true);
request.setRequestHeader("Content-Type", "application/json");
request.timeout = 10000;

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        callback(null, JSON.parse(request.responseText));
    } else {
        callback("There was an error: " + request.status);
    }
};
request.onerror = function () {
    callback("Connection error");
};

request.send();
};

function sendMessage(ip, port, command, district, requestText){
    var address = `${ip}:${port}/${command}`;

    var request = new XMLHttpRequest();
    fn.request(address,"GET",function(err,data){
        alert(err);
        alert(data);
    });
    /*alert("Ok");
    val myJSON = JSON.stringify(requestText);
    alert("Ok");
    var request = new XMLHttpRequest();
    request.open("POST", address, true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    request.timeout = 10000;
    request.send(myJSON);*/
}

document.getElementById("submitBtn").onclick = () => {
    var district = document.getElementById('adminDistrict').value;
    var requestText = document.getElementById('request').value;
    sendMessage("localhost","10050", "sendMessage", district, requestText);
};


