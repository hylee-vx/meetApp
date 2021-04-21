const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

// SCOPES sets access levels
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// process.env means credential values are in config.json file
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://hylee-vx.github.io/meetapp/"],
  javascript_origins: ["https://hylee-vx.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// first step in OAuth process is to generate URL so user can login with Google and be authorised to see calendar
// after login user receives code as URL parameter
module.exports.getAuthURL = async () => {
  // SCOPES array passed to scope option - must be enabled in the OAuth consent screen settings in Google Console
  // any passed scopes are visible to users when content screen displayed
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // decode authorisation code extracted from URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    // exchange authorisation code for access token with a callback after the exchange
    // callback here an arrow function with the results as parameters (err, token)
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then(token => {
      // respond with OAuth token
      return {
        statusCode: 200,
        body: JSON.stringify(token),
      };
    })
    .catch(err => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};