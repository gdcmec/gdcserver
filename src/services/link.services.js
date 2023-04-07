
const google = require('googleapis').google;
const {getUserId , addUser ,addInterested , addAttended} = require('./user.services');
const {pool} = require('../config/postgres');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const getSheetData = async (sheetId) => {
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = sheetId;
    const response = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueRenderOption: 'FORMATTED_VALUE',
    });
  
    
      const rows = response.data.values;
    
      if (rows) {
        const headers = rows[0];
        return rows.slice(1).map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });
      } else {
        console.log('No data found.');
        return [];
      }
}

const addInterestedBulk = async(sheetId, event_id) => {
    try{
        const sheetData = await getSheetData(sheetId);
        console.log(sheetData);
       for(const student of sheetData){
            let user_id
            user_id = await getUserId(student.email);
            if(!user_id){
                user_id = await addUser({
                    name: student.name,
                    email: student.email,
                    pnumber: student["phone number"],
                    class: student.class,
                    year: student.year[0], 
                });
            }

            const data = await addInterested(user_id, event_id);
            console.log("result",data);
        }
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addAttendedBulk = async(sheetId, event_id) => {
    try{
        const sheetData = await getSheetData(sheetId);
        console.log(sheetData);
         for(const student of sheetData){
            let user_id
            user_id = await getUserId(student.email);
            if(!user_id){
                user_id = await addUser({
                    email: student.email,
                    name : student.name,
                });
            }

            const data = await addAttended(user_id, event_id , {rating: student.rating, feedback: student.feedback});
            console.log("result",data); 
        }
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}


module.exports = { getSheetData , addAttendedBulk , addInterestedBulk }

