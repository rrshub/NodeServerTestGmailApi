let request = require('request');
let axios = require('axios')
let db = require('./dbQueryThreadMsg')
let fs = require('fs')

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
        }).then((res1) => 
        {
          let result = []
          let msgJson = {}
          msgJson['threadId'] = res1.data.id
          msgJson['msg'] = filterData(res1.data.messages)
          msgJson.msg.forEach(m => {
            axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.msgId}?format=raw`,
            {
              headers: 
              {
                Authorization: `Bearer ${req.body.access_token}`,
                "format" : "RAW"
              }
            }).then((res2) => 
            {

              if(res2){
                // res2.data.forEach((ele)=>{
                //   let indx = ele.html.indexOf("gmail_quote");
                //   if(indx != -1){
                //     ele['trimHtml']=ele.html.substring(0, indx)
                //   }
                //   else{
                //     console.log(ele.html)
                //     ele['trimHtml']=ele.html
                //   }
                //   m['getMsg'] = ele
                // })
                
                if(res1.data.messages.length == 5)
              {
                //console.log(res2)
                fs.writeFile("file.txt",JSON.stringify(msgJson) + ',',(res=>{
                  console.log("done")
                }))
              }
              }
            })
          })
          
          

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

function filterData(msg)
{
  let msg1 = []
  msg.forEach(m => {
    let dataJson = {}
    dataJson['msgId'] = m.id
    dataJson['snippt']=m.snippet
    dataJson['labelIds'] = m.labelIds
    dataJson['conversationType'] = m.labelIds.includes('INBOX') ? 'RECEIVE' : 'SENT'
    m.payload.headers.forEach(payload => {
      if (
        payload.name == "Date" ||
        payload.name == "From" ||
        payload.name == "To"   ||
        payload.name == "Subject"||
        payload.name.toUpperCase() == 'MESSAGE-ID'
      ) {
        if(payload.name.toUpperCase() == 'MESSAGE-ID'){
          dataJson['MsgId']=payload.value
        }
        else{
          dataJson[payload.name]=payload.value
        }
      }
    })
    
    dataJson['name']=dataJson.From.split(" <")[0]
    msg1.push(dataJson)
  })
  return msg1
}

// function calculateDate() {
// let todayDate = new Date() 
//    let yesterDate = new Date()
//   const todaysDayOfMonth = todayDate.getDate();
//   yesterDate.setDate(todaysDayOfMonth - 1);
//   let lastDay = new Date(todayDate.getTime() - (7 * 24 * 60 * 60 * 1000));
//   getName()
// }

// function getName(){
// //   let todayDate = new Date() 
// //   let yesterDate = new Date()
// //  const todaysDayOfMonth = todayDate.getDate();
// //  yesterDate.setDate(todaysDayOfMonth - 1);
// //  let lastDay = new Date(todayDate.getTime() - (7 * 24 * 60 * 60 * 1000));

//   this.arr.forEach((ele,i)=>{
//     let minDate;
//     ele.allmsg.forEach((e,j)=>{
//     //console.log(e)

//       // e['name']=e.From.split(" <")[0]
//       //  e['Days']=(new Date(e.Date).toDateString() == this.todayDate.toDateString())?'TODAY':(new Date(e.Date).toDateString() == this.yesterDate.toDateString())?'YESTERDAY':'LAST'
        
//     })
//     minDate = new Date(
//       Math.max(
//         ...ele.allmsg.map((element) => {
//           return new Date(element.Date);
//         }),
//       ),
//     );
//     ele['Date']=minDate
//     ele['Days']=(new Date(ele.Date).toDateString() == this.todayDate.toDateString())?'TODAY':(new Date(ele.Date).toDateString() == this.yesterDate.toDateString())?'YESTERDAY':'LAST'
//     ele.allmsg.sort((a,b) => new Date(b.Date)- new Date(a.Date))
//   //console.log("***********name ",minDate.toDateString())

//     // this.arr[i]['name']=this.arr[i]?.From.split(" <")[0]
//     // this.arr[i]['Days']=(new Date(this.arr[i].Date).toDateString() == this.todayDate.toDateString())?'TODAY':(new Date(this.arr[i].Date).toDateString() == this.yesterDate.toDateString())?'YESTERDAY':'LAST'
//   })

//  this.arr.forEach((ele,i)=>{
//   ele['name']=[]
//   ele.allmsg.forEach((e,j)=>{
//     // console.log(e.name)
//     ele['name'].push(e.name)
//     let name = e.name.split("")
//     e['picture'] =   name.shift().charAt(0) 
//     e['bgColor'] = this.random_bg_color()
//     // name.length > 0 ?
//     // + name.pop().charAt(0):name.shift().charAt(0)
//     console.log("**",j,e.name,e['picture'])
//     //console.log((new Date(e.Date).getTime() == ele.Date.getTime()),new Date(e.Date), ele.Date)
//   if(new Date(e.Date).getTime() == ele.Date.getTime()){
//    // console.log(e.Date)
//     ele['msg'] = e.msg
//     ele['Subject'] = e.Subject.replace("Re:",'').trim()
//   }  
//   })
//   ele['picture'] = this.getInitials(ele.name.toString())
// })

// //Check and assign label
// this.arr.forEach((ele,i)=>{

//   ele.allmsg.forEach((e,j)=>{
//     // delete e.labelIds

//     const index = e.labelIds.indexOf('INBOX')
//     if(index>-1){
//       delete e.labelIds
//       e['labelIds']=['INBOX']
//     }
      

//        })
//     })
// }

// function getInitials(nameString){
//  const fullName = nameString.split(',');

//   let initials
//   if(fullName.length>1){
  
//     initials = fullName.shift().charAt(0)
//     for(let i=1;i<=fullName.length;i++){
   
//       initials += fullName.shift().charAt(0) //+ fullName.pop().charAt(0);
//       if(i==fullName.length){
//         initials += fullName.pop().charAt(0);
//       }
//     }
//   }
//   else{
//     initials = fullName.shift().charAt(0)
//   }
// return initials.toUpperCase();
// }

// function change(mail){
//   let params = localStorage.getItem('authInfo')
//   params = JSON.parse(params)
//   console.log(JSON.stringify(params))
//   this.inboxService.getMsg({'ACCESS_TOKEN':params,
//         obj:mail.allmsg}).subscribe(res1=>{
//           if(res1){
//             res1.forEach((ele)=>{
//               let indx = ele.html.indexOf("gmail_quote");
//               if(indx != -1){
//                 ele['trimHtml']=ele.html.substring(0, indx)
//               }
//               else{
//                 console.log(ele.html)
//                 ele['trimHtml']=ele.html
//               }
//             })
//             mail.allmsg.forEach((element)=>{
//               res1.forEach((ele)=>{
               

//                 if(ele.messageId==element.MsgId){
//                   element['getMsg'] = ele
//                 }
//               })
//             })
//             this.inboxService.ChatObject.next(mail)
//             console.log("Send from day status",mail)
//           }
         
//           })
// }