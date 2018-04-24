"use strict";


// auction owner remove auction on auction page
$('#remove-auction-btn').click(function() {
    const pass_input = $('#user-pass');
    const password = pass_input.serialize();
    $.ajax({
        type: 'DELETE',
        contentType: 'application/x-www-form-urlencoded',
        data: password,
        success: function(data) {
            window.location.replace("../..");
        },
        error: function (data) {
            const msg = JSON.parse(data.responseText);
            showErrorAlert(msg);
        }
    });
});