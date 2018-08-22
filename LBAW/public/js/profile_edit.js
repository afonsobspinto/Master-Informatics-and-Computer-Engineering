"use strict";


// auction owner remove auction on auction page
$('#country').change(function() {
    const cities = $('#city');
    cities.empty();

    const country_id = this.value;
    if(country_id == null || country_id == "" || country_id == "NONE")
        return;

    const url = `/country/${country_id}/cities`;
    $.ajax(url, {
        type: 'GET',
        success: function(data) {
            for(let city of data) {
                const option = `<option value="${city.id}">${city.city}</option>`
                cities.append(option);
            }
        },
        error: function (data) {
            showErrorAlert(data.responseJSON);
        }
    });
});

function setImgToLocal(input, img) {
    let reader = new FileReader();

    reader.onload = function (e) {
        img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
}

$('#profile-picture').change(function () {

    setImgToLocal(this, $('#profile-avatar'));

})