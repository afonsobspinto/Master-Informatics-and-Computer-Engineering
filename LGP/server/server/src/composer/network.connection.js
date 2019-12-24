
const path = require('path');
const fs = require('fs');
const IdentityIssue = require('composer-cli').Identity.Issue;
const { userController } = require('../controllers');

async function identityIssue(identity) {
  const options = {
    card: 'admin@mogplay',
    file: `card${identity.userID}`,
    newUserId: identity.userID,
    participantId: identity.participant,
  };
  const pathCard = path.resolve(__dirname, `../../${options.file}.card`);
  try {
    await IdentityIssue.handler(options);
    const card = fs.readFileSync(pathCard).toString('base64');
    await userController.updateCard(identity.userID, card);
    fs.unlinkSync(pathCard);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  identityIssue,
};
