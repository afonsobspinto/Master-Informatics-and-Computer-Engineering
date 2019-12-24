
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const session = require('express-session');
const { AUTH_API, LEDGER_API } = require('../config/blockchain');
const { identityIssue } = require('./network.connection');


// const ADMIN_CARD = fs.createReadStream(path.resolve(__dirname, './genesis.card'));
const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiIwIiwiaWF0IjowfQ.j2njp2gjQaV1zSf4sU4dcilqy-opxiPUW5whs4GHnLI';

const authJwtHeader = {
  maxRedirects: 0,
  validateStatus(status) {
    return status >= 200 && status < 303;
  },
  withCredentials: true,
};

const authJwtHeaderToken = {
  headers: { authorization: `Bearer ${ADMIN_TOKEN}` },
  maxRedirects: 0,
  validateStatus(status) {
    return status >= 200 && status < 303;
  },
  withCredentials: true,
};


function addLedger(ns, asset) {
  const authHeader = {
    ...authJwtHeader,
    headers: {
      Cookie: session.cookies,
    },
  };

  return axios.post(LEDGER_API + ns, asset, authHeader);
}


function addParticipantLedger(itemToAdd, identityToAdd) {
  return addLedger('User', itemToAdd)
    .then(() => identityIssue(identityToAdd));
}

function getUser(userID) {
  const authHeader = {
    ...authJwtHeader,
    headers: {
      Cookie: session.cookies,
    },
  };

  return axios.get(`${LEDGER_API}User/${userID}`, authHeader);
}

function importAdminCard() {
  const formData = new FormData();
  formData.append('card', ADMIN_CARD);
  const headersForm = formData.getHeaders();
  const headers = {
    ...headersForm,
    Cookie: session.cookies,
  };

  return axios.post(`${LEDGER_API}wallet/import?name=admin.card`, formData, {
    headers,
  });
}

function auth() {
  return axios.get(AUTH_API, authJwtHeaderToken);
}

function addVideo(asset) {
  const authHeader = {
    maxRedirects: 0,
    validateStatus(status) {
      return status >= 200 && status < 303;
    },
    withCredentials: true,
    headers: {
      Cookie: session.cookies,
    },
  };

  return axios.post(`${LEDGER_API}video`, asset, authHeader);

}

module.exports = {
  auth,
  importAdminCard,
  addParticipantLedger,
  getUser,
  addVideo,
};
