'use strict';

const MAX_NUM_SEARCH_RETURN = 5;

$('#load-more').click(function (e) {
    e.preventDefault();
    const auctionsContainer = $('#search-auctions-container');
    const searchData = $('#search-bar').serializeArray();

    const searchOffset = $('.auction-item').length;
    searchData.push({name: 'offset', value: searchOffset});

    $.ajax({
        type: "GET",
        url: "/search/auctions",
        data: searchData,
        success: function(auctions) {
            if(auctions.length == 0) {
                $('#no-more-auctions').show();
                $('#load-more').hide();
            }
            else {
                auctions.forEach(function (auction) {
                    auctionsContainer.append(auction);
                })
            }
        },
        error: function(result) {
            alert('error');
        }
    });
})

