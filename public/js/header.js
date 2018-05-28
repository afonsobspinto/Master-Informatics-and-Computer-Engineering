'use strict';

const idInput = $('#header-user-id');

if(idInput.length)
{
    const userID = idInput.val();
    const url = `/profile/${userID}/unread-messages`;

    const setNumMessagesCallback = (numMessages) => $('#num-messages').text(numMessages);
    infinitePollingApiJson(url, setNumMessagesCallback, 10000);
}





