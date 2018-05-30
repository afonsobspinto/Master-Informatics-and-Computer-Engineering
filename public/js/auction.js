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


// update current bid price and time
const auctionID = $('#auction');
if(auctionID.length)
{
    const userID = auctionID.val();
    const url = `/auctions/${userID}/update`;

    const updateAuctionCallback = function (data) {
        let obj = JSON.parse(data);
        console.log(obj.time);

        $('#current-auction-price').text(obj.price + '€');
        $('#current-auction-time').text("Ending in " + obj.time );
        };

    infinitePollingApiJson(url, updateAuctionCallback, 1000);
}


/*
// add item to wishlist
$('#add-wishlist').click(function(){
    console.log('response');
    const input = $('#add-wishlist');
    $.ajax({
        type: 'POST',
        url: '/wishlist',
        data: input,
        success: function(data) {
            window.location.replace("");
        },
        error: function (data) {
            showErrorAlert("error");
        }
    });
});*/