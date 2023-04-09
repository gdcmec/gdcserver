
const google = require('googleapis').google;
const {getUserId , addUser ,addInterested , addAttendee} = require('./user.services');
const {pool} = require('../config/postgres');

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});


const addExpectedSheet = async (sheetId, event_id) => {
    try{
        //check if google  sheet is accessible by client
        // const client = await auth.getClient();
        // const googleSheets = google.sheets({version: 'v4', auth: client});
        // const metaData = await googleSheets.spreadsheets.get({
        //     auth,
        //     spreadsheetId: sheetId,
        // });
        //if sheet is accessible then add it to database
        console.log("sheetId", sheetId);
         await pool.query("INSERT INTO sheets (expected_sheet_id, event_id) VALUES ($1, $2) ON CONFLICT (event_id) DO UPDATE SET expected_sheet_id = $1", [sheetId, event_id]);
            console.log("sheet added");
            return true;
    }
    catch(err){
        console.log(err);
        return false;
    }

}

const addAttendedSheet = async (sheetId, event_id) => {
    try{
        //check if google  sheet is accessible by client
        // const client = await auth.getClient();
        // const googleSheets = google.sheets({version: 'v4', auth: client});
        // const metaData = await googleSheets.spreadsheets.get({
        //     auth,
        //     spreadsheetId: sheetId,
        // });
        //if sheet is accessible then add it to database
            await pool.query("INSERT INTO sheets (attended_sheet_id, event_id) VALUES ($1, $2) ON CONFLICT (event_id) DO UPDATE SET attended_sheet_id = $1", [sheetId, event_id]);
            return true;
    }
    catch(err){
        console.log(err);
        return false;
    }

}



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
            obj[header.toLowerCase()] = row[index];
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
        const storedSheetId = await pool.query("SELECT expected_sheet_id AS sheet_id FROM sheets WHERE event_id = $1", [event_id]);
        if(storedSheetId.rows.length && storedSheetId.rows[0].sheet_id === sheetId){
        const sheetData = await getSheetData(sheetId);
        console.log(sheetData);
       for(const student of sheetData){
            let user_id
            user_id = await getUserId(student.email);                 //adds a user to our db if not present
            if(!user_id){
                user_id = await addUser({
                    name: student.name,
                    email: student.email,
                    pnumber: student["phone no"],
                    class: student.class,
                    year: student.year[0], 
                });
            }

            const data = await addInterested(user_id, event_id);
        }
        return true;
    }
        
        else{
            return false;     // return a code TODO...
        }

    }
    catch(err){
        console.log(err);
        return false;
    }
}

const addAttendedBulk = async(sheetId, event_id) => {
    try{
        const storedSheetId = await pool.query("SELECT attended_sheet_id AS sheet_id FROM sheets WHERE event_id = $1", [event_id]);
        if(storedSheetId.rows.length && storedSheetId.rows[0].sheet_id === sheetId){
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
                     const data = await addAttendee( event_id,user_id , {rating: student.rating, feedback: student.feedback});
            console.log("result",data); 
        }
        return true;
    }
    else{
        return false;     // return a code TODO...
    }
}
    catch(err){
        console.log(err);
        return false;
    }
}

const getSheetId = async (event_id) => {
    try{
        const attendedInfo = await pool.query("SELECT  attended_sheet_id AS sheet_id FROM sheets WHERE event_id = $1", [event_id]);
        let attended
        if(!attendedInfo.rows.length){
            attended = null;
        }
        else{
            attended = attendedInfo.rows[0].sheet_id;
        }
        const expectedInfo = await pool.query("SELECT expected_sheet_id AS sheet_id FROM sheets WHERE event_id = $1", [event_id]);
        let expected
        if(!expectedInfo.rows.length){
            expected = null;
        }
        else{
            expected = expectedInfo.rows[0].sheet_id;
        }

        return {attended : attended , expected : expected};
    }
    catch(err){
        console.log(err);
        return false;
    }
}


module.exports = { getSheetData , getSheetId,addAttendedBulk , addInterestedBulk ,addAttendedSheet , addExpectedSheet }


