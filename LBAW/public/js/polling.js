'use strict';


function infinitePollingApiJson(url, callback, periodMS = 1000) {
    const request = () => $.ajax(url, {
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            callback(data);
        }
    });

    request();
    setInterval(request, periodMS);
}
