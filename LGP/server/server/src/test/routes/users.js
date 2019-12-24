/* eslint-disable */

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { sleep } = require('../../utils/utils');

chai.use(chaiHttp);
const server = require('../../app');

describe('User', () => {
  before(async () => {
    const db = require('../../models');
    db.sequelize.sync({ force: true });

    return await sleep(1000);
  });

  /*
 * Test the /signup route
 */
  describe('/GET user', () => {
    it('it should GET a user', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((_, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
