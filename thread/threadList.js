let request = require('request');
let axios = require('axios')
let db = require('./dbQueryThreadMsg')

module.exports = require('express').Router().post('/',(req,res) => 
{
  let startTime = new Date()
  console.log("Start Time",startTime)
  request.get("https://gmail.googleapis.com/gmail/v1/users/me/threads", 
  {
          method: "GET",
          headers:  {
                      "Authorization": `Bearer ${req.body.access_token}`
                    }
  },
  function (error, response1, body) 
  {
    if (!error && response1.statusCode == 200) 
    {
      JSON.parse(body).threads.forEach((message,i) => 
      {
        axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/threads/${message.id}`,
        {
          headers: 
          {
            Authorization: `Bearer ${req.body.access_token}`,
            "format" : "RAW"
          }
        }).then(async(res1) => 
        {
          console.log(res1.data.messages?.length)
//console.log("res")
            let flag = false
            // await res1.data.messages?.forEach((msg) => {
            //   if(flag == true)
            //   {
            //     return
            //   }
            //   if( msg.labelIds?.includes("INBOX"))
            //   {
            //     flag = true
            //     return
            //   }
            // })

            // if(flag == true)
            // {
            //   //message_id, thread_id, message, sender_name, msg_subject, send_to, cc, sended_from, picture, 
            //  // labelIds, gmail_date, ctreated_on, snippt, day_of_msg, conversation_type
            //   let insertInbox = await db.insertInbox()

            // }
          // if(res1.data.messages?.length == 1)
          // {
          //   if(res1.data.messages[0].labelIds?.includes("INBOX"))
          //   {

          //   }
          //   if(JSON.parse(body).threads.length == i+1)
          //   {
          //     let endTime = new Date()
          //     console.log("End Time",endTime)
          //     console.log(endTime-startTime)
          //     var diff =(endTime.getTime() - startTime.getTime()) / 1000;
          //     diff /= 60;
          //     console.log(diff);
          //   }
          // }
          // else if(res1.data.messages?.length > 1)
          //   {
          //     res1.data.messages.forEach(msg => 
          //       {
          //         if(msg.labelIds?.includes("INBOX"))
          //         {

          //         }
          //       }) 
          //   }
          
          // if(ele.allmsg.length >=1){
          // console.log(ele.allmsg.labelIds)
          // let flag = 0;
          // ele.allmsg.forEach((el:any)=>{
          //   if(flag ==1){
          //        // this.inboxArr.push(ele)
          //         return
          //       }
          //       flag = 0
          //       el.labelIds.forEach((e:any)=>{
          //       //  console.log("e",e)
          //       //  console.log(e,(e=='INBOX'||(e=='SENT'&&ele.allmsg.length >1)),(e=='SENT'&&ele.allmsg.length >1))
          //       //||(e=='SENT'&&ele.allmsg.length >1)  
          //       if(e=='INBOX'){
          //         flag = 1
          //         return
          //           //this.inboxArr.push(ele)
          //           //return
          //         }
          //       })
          //       //console.log(flag)
          //       if(flag ==1){
          //         this.inboxArr.push(ele)
          //         return
          //       }
                
          //     })
            
          //   }
        })
      });
    }
  })
})