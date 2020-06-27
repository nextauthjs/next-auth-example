const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
};

//Testing Documentation
//const jwt = require('jsonwebtoken')
//const fs = require('fs')

// const appleId = process.env.APPLE_ID
// const keyId = process.env.APPLE_KEY_ID
// const teamId = process.env.APPLE_TEAM_ID
// const privateKey = fs.readFileSync('./AuthKey_KEY_ID.p8')

// const secret = jwt.sign(
//   {
//     iss: teamId,
//     iat: Math.floor(Date.now() / 1000),
//     exp: Math.floor(Date.now() / 1000) + ( 86400 * 180 ), // 6 months
//     aud: 'https://appleid.apple.com',
//     sub: appleId
//   }, privateKey, {
//     algorithm: 'ES256',
//     keyid: keyId
//   })

// console.log(secret)

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on ' + process.env.SITE);
  });
});