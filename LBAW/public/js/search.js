'use strict';

const MAX_NUM_SEARCH_RETURN = 5;

function getRequestFormData() {
    const searchData = $('#search-bar, #sidebar').serializeArray();

    const searchOffset = $('.auction-item').length;
    searchData.push({name: 'offset', value: searchOffset});

    return searchData;
}

function addAuctions(auctionsContainer, auctions) {
    if(auctions.length == 0) {
        $('#no-more-auctions').show();
        $('#load-more').hide();
    }
    else {
        auctions.forEach(function (auction) {
            auctionsContainer.append(auction);
        })
    }
}

function requestAuctions() {
    const searchData = getRequestFormData();
    const auctionsContainer = $('#search-auctions-container ');

    $.ajax({
        type: "GET",
        url: "/search/auctions",
        data: searchData,
        success: function(auctions) {
            addAuctions(auctionsContainer, auctions);
        },
        error: function(result) {
            alert('error');
        }
    });
}

$('#load-more').click(function (e) {
    e.preventDefault();
    requestAuctions();
})

$('#sidebar input, #sidebar select').change(function() {
    const auctionsContainer = $('#search-auctions-container ');
    auctionsContainer.empty();
    $('#no-more-auctions').hide();
    $('#load-more').show();
    requestAuctions();
});