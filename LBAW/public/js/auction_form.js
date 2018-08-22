'use strict';

$('#photos-input').change(function () {
    const container = $('#images-container');
    container.empty();
    const files = this.files;

    for(let i=0; i < files.length; i++) {
        let reader = new FileReader();

        reader.onload = function (e) {
            const child = $.parseHTML(`<img class="form-picture" src="${e.target.result}">`);
            container.append(child);
        }

        reader.readAsDataURL(files[i]);
    }
})