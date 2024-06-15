import fetch from 'node-fetch';
import fs from 'fs';
import json2xls from 'json2xls';

const tokenDataFunction = async () => {
    try {
        const tokenDataResponse = await fetch('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')
        const tokenData = await tokenDataResponse.json();
        //console.log(tokenData);
		let xls = json2xls(tokenData);
        fs.writeFileSync('tokenData1.xlsx', xls, 'binary');
    } catch (error) {
        console.log(error);
    }
}

tokenDataFunction();


// let date = new Date().toISOString().slice(0, 10);
// console.log(date);