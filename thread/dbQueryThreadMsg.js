let pool = require('../databaseConnection/createconnection')
let db = {}



db.insertInbox = () =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            let sql = `INSERT INTO inbox (message_id, thread_id, message, sender_name, msg_subject, send_to, cc, sended_from, picture, 
                labelIds, gmail_date, ctreated_on, snippt, day_of_msg, conversation_type) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            pool.query(sql, [], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }
                return resolve(result);
            });
        }
        catch(e)
        { 
            console.log(e)
        }
    });
};

db.insertDraft = () =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            let sql = `INSERT INTO draft (message_id, thread_id, message, sender_name, msg_subject, send_to, cc, sended_from, picture, 
                labelIds, gmail_date, ctreated_on, snippt, day_of_msg, conversation_type) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            pool.query(sql, [], (error, result) => 
            {
                if(error)
                {
                    return reject(error);
                }
                return resolve(result);
            });
        }
        catch(e)
        { 
            console.log(e)
        }
    });
};

module.exports = db