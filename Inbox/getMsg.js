let request = require('request');
// let parser = require('emailjs-mime-parser')
// let parse = new parser()
 
let rawMsg=[];
let Data = []
let ACCESS_TOKEN;
let obj;
let time;
module.exports = require('express').Router().post("/",async(req,res)=> {
  
        ACCESS_TOKEN = req.body.ACCESS_TOKEN['access_token'];
        obj = req.body.obj;
        let data = await getData(ACCESS_TOKEN,obj)
       // console.log(data)

        if(data){
        }
     
        // console.log(Data.length,obj.messages.length,Data.length===obj.messages.length)
        // if(Data.length===obj.messages.length){
        //   sendMsg(Data)
        // }
        // ************Need to change with function call according to length of obj*********
        setTimeout(() => {
           // console.log(Data)
            //let a = base64url.decode(Data[3].raw)
  //         let a = simpleParser(Data[3].raw)
  //   .then(parsed => {console.log("parse**************************",parsed)
  //   //let bufferObj = Buffer.from(parsed.headerLines[0].line, "utf8");
  //  // console.log("********",bufferObj)
  // })
  //   .catch(err => {console.log(err)});
//console.log(Data)

  rawMsg=[];

//   function countDown(fromNumber) {
//     console.log(fromNumber);

//     let nextNumber = fromNumber - 1;

//     if (nextNumber > 0) {
//         countDown(nextNumber);
//     }
// }
// countDown(3);

  Array.from(Data).forEach((ele,i)=>{
     bufferObj = Buffer.from(ele.raw, "base64url");
    let str = bufferObj.toString()

    simpleParser(str).then(function(mail_object) {
      rawMsg.push(mail_object)
     // console.log("From:", mail_object.date,(Data.length == rawMsg.length),Data.length,rawMsg.length);
      if(Data.length == rawMsg.length){
        console.log("MSGLIST ", rawMsg.length)
      }

      
 // console.log(rawMsg)


    }).catch(function(err) {
      console.log('An error occurred:', err.message);
    });

    //getMsg1(str)
    
  //   let a = mailparser.write(str);
     
     
  //   mailparser.on("end", function(mail_object){
  //     console.log(mail_object.date)
  //     rawMsg.push(mail_object);
  //     if(rawMsg.length==Data.length){
  //       res.send(rawMsg)
  //     }
  //  });
  })

 

  //mailparser.end();


  // function getMsg1(str){
  //   let a = mailparser.write(str);
  //   if(a == true){
  //     mailparser.end();
  //   console.log("str",str.length)
  //   }
  // }


   
     
  



    
    //  fs.writeFile("file.txt",file,(res=>{
    //   console.log("done")
    // }))
    //  let str = Buffer.from(Data[3].raw, "base64")
    //  let str2 = (Buffer.from(str, "utf8")).toString()
    //console.log(str)
         // val = '{'+str.replace(/([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)\r\n/g, "\"$1\":\"$2\"")+'}'
    // const _data = JSON.parse(base64url.decode(data, 'utf8'));
    // const res = {};
    // for (var name in _data) {
    //  res[decodeURIComponent(name)] = decodeURIComponent(_data[name]);
    // }
    // return res;
    // let arr=[];

    // fs.writeFile("file.txt",str,(res1=>{
    //   console.log("done")
    //  // 
    //   // const allFileContents = fs.readFileSync('file.txt', 'utf-8');
    //   // allFileContents.split(/\r\n/).forEach(line =>  {
        
    //   //   console.log(`Line from file: ${line}`);
    //   //   arr.push(line)
    //   // });
    //   // res.send({d:Data[3].raw,arr,str})
    // }))

    // res.send(Data)
         
        }, 5000)
        //  function sendMsg(Data){
        //   setTimeout(() => {
        //     //   console.log(Data.length)
        //      res.send(Data)}, 1000)
        //   }
})
 function getData(ACCESS_TOKEN,obj){
  Array.from(obj).forEach((message,i) => 
  {
    Data = []
       request.get(
         `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.Id}?format=raw`,
         {
           headers: {
             Authorization: `Bearer ${ACCESS_TOKEN}`,
             'format' : 'RAW'
           },
         },
         function (error, response, body) {
           if (!error && response.statusCode == 200) {
             
               let msg = JSON.parse(body)
               //console.log(msg)
               Data.push(msg)
             // console.log(i,obj.length)
              
              
              }

 
      });
      if(Data.length==obj.length){
        return Data
       }
  });
 
}