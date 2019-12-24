/**
 * Buy video transaction
 * @param {com.mog.technologies.Purchase} purchase
 * @transaction
 */

async function buyVideo(purchase) {
    let totalPrice = 0;
    let promises = [];
    if (purchase.newOwner.tokens > totalPrice) {
        purchase.videos.forEach(async video =>{
            purchase.newOwner.tokens -= video.price;
            video.uploader.tokens += video.price;
            purchase.newOwner.purchasedVideos.push(video);
            let assetRegistry = await getAssetRegistry("com.mog.technologies.Video");
            await assetRegistry.update(video);
            let participantRegistry = await getParticipantRegistry("com.mog.technologies.User");

            promises.push(participantRegistry.updateAll([purchase.newOwner, video.uploader]))
        });
        return Promise.all(promises);
    }
    else {
        throw new Error('Insufficient Funds');
    }
}
