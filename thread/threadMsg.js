let request = require('request');
let Data = []
let ACCESS_TOKEN;
let obj;

module.exports = require('express').Router().post("/",(req,res)=> {
        ACCESS_TOKEN = req.body.ACCESS_TOKEN['access_token'];
        obj = req.body.obj;
      //  console.log("*******************************",obj)
        Array.from(obj.threads).forEach((message) => 
        {
          Data = []
       // console.log("*******************************")

             request.get(
               `https://gmail.googleapis.com/gmail/v1/users/me/threads/${message.id}`,
               {
                 headers: {
                   Authorization: `Bearer ${ACCESS_TOKEN}`,
                   "format" : "RAW"
                 },
               },
               function (error, response, body) {
                // console.log(error)
                // console.log(response.statusCode)
                // console.log(body)
                 if (!error && response.statusCode == 200) {
                   
                     let msg = JSON.parse(body)
                    //  console.log(msg)
                     Data.push(msg)
                    // console.log(Data.length,obj.threads.length,(Data.length==obj.threads.length))
                     if((Data.length==obj.threads.length)){
                     // res.send(Data)
                     console.log("thredMSG LENGTH  ", Data.length)
                      console.log("send")
                     }
                    }
       
            });
        });




        // console.log(Data.length,obj.messages.length,Data.length===obj.messages.length)
        // if(Data.length===obj.messages.length){
        //   sendMsg(Data)
        // }
        // ************Need to change with function call according to length of obj*********
        setTimeout(() => {
      //   console.log(Data.length,obj.messages.length)
          // res.send(Data)
       // console.log("********************************* Data ",Data)
        }, 5000)
        //  function sendMsg(Data){
        //   setTimeout(() => {
        //     //   console.log(Data.length)
        //      res.send(Data)}, 1000)
        //   }
})