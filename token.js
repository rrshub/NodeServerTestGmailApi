const {google} = require('googleapis');
let express = require('express')
let app1 = express.Router();
const url = require('url');
let axios = require('axios')
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);
const scopes = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/userinfo.profile'
];
const authurl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    // If you only need one scope you can pass it as a string
    scope: scopes,
    include_granted_scopes: true
});

app1.use("/",async(req,res)=> {
    console.log("/",req.url)
    if(req.url == '/')
    {
    //     window.location.replace(authurl)
    //    res.writeHead(301, {location : authurl});
      res.redirect(301, authurl)
    }
    if(req.url.startsWith('/oauth'))
    {
        //console.log()
        let q = url.parse(req.url, true).query;
        if (q.error) { // An error response e.g. error=access_denied
          //console.log('Error:' + q.error);
        } else { // Get access and refresh tokens (if access_type is offline)
          let { tokens } = await oauth2Client.getToken(q.code);
          //console.log(tokens)
          oauth2Client.setCredentials(tokens);
          axios.post('http://localhost:8080/thrList',{access_token : tokens.access_token}).then(res1 => {
            //res.send(JSON.stringify(res1))
          })
        //   axios.post('http://localhost:8080/msgList',{access_token : tokens.access_token}).then(res1 => {
        //     //res.send(JSON.stringify(res1))
        //   })
          //res.redirect(`http://localhost:4200/user-profile#${JSON.stringify(tokens)}`)
        }
    }
    //   const {tokens} = await oauth2Client.getToken('2F0AbUR2VPUaXvNYoqeqSnwNXgZKtUUtAwqsdbOpxv8pDVQLaO6nWmzS6_t-PvrETP6GTdqTQ')
    //   oauth2Client.setCredentials(tokens)
    //   console.log(tokens)
})

// app1.post("/",async(req,res)=> {
//     console.log("/",req)
//       res.writeHead(301, { "Location": url });
   
// })

module.exports = app1