let request = require('request');


module.exports = require('express').Router().post('/',(req,res)=>{


        request.get("https://gmail.googleapis.com/gmail/v1/users/me/messages", {
                method: "GET",
                headers: {
                            "Authorization": `Bearer ${req.body.access_token}`
                        }
        },
    function (error, response1, body) {

        if (!error && response1.statusCode == 200) {
            console.log("MSGLIST LENGTH  ", JSON.parse(body).messages.length)
          res.send(JSON.stringify(JSON.parse(body).messages))
        }
    })
})
