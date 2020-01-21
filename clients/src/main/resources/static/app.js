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

function sendMessage(ip, port, command, district, requestText){
    var address = `${ip}:${port}/${command}`;
    var request = new XMLHttpRequest();
    request.open("PUT", address, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.timeout = 15000;
    request.send(JSON.stringify(data));

}

document.getElementById("submitBtn").onclick = () => {

    var district = document.getElementById('adminDistrict').value
        requestText = document.getElementById('request').value;
    sendMessage("127.0.0.1","8080", "sendMessage", district, requestText);
};
