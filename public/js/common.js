// This is load•••ed ASYNC
"use strict";



// adds csrf token
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function showErrorAlert(errorMsg) {
    const errorBootstrapAlert =
        `<div class="alert alert-danger alert-dismissible fade show mx-1 mt-2" role="alert">
            <strong>An error occured: </strong> ${errorMsg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;

    $('#header').after(errorBootstrapAlert);
}

