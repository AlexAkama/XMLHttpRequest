'use strict';
let messages = {
    loading: 'Loading...',
    sending: 'Sending...',
    succes: 'Thank you!',
    failure: 'Ooops, mistake!'
};

let form = document.querySelector('form'),
    inputs = form.querySelectorAll('input'),
    message = form.querySelector('#message');

function sendFormData() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest(),
            formData = new FormData(form);
        request.open('POST', 'server.php');

        // for JSON
        request.setRequestHeader('Comment-Type', 'application/json; charset=utf-8');
        let toJSON = {};
        formData.forEach(function (value, key) {
            toJSON[key] = value;
        });
        let jsonData = JSON.stringify(toJSON);
        request.send(jsonData);

        // for simple Form
        request.setRequestHeader('Comment-Type', 'application/x-www-from-urlencoded');
        request.send(formData);

        message.textContent = messages.sending;
        request.onload = () => {
            if (request.readyState === 4) {
                if (request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            }
        };

    });
}

sendFormData()
    .then(() => {
        message.textContent = messages.succes;
    })
    .then(clearIntuts())
    .catch(() => {
        message.textContent = messages.failure;
    });

function clearIntuts() {
    setTimeout(function () {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }, 3000);
    setTimeout(function () {
        message.textContent = '';
    }, 5000);

}