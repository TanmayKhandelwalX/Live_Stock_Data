import fs from 'fs';
import json2xls from 'json2xls';
import { SmartAPI, WebSocket,WebSocketV2 } from 'smartapi-javascript';
import { authenticator } from 'otplib';
import {HISTORICAL_DATA_API, PASSWORD, TOTP_TOKEN, USER_NAME} from './constants.js';
// const { SmartAPI, WebSocket,WebSocketV2 } = require('smartapi-javascript');
// const { authenticator } = require('otplib');
// const fs = require('fs');
// const json2xls = require('json2xls');
let JWT_TOKEN;
let REFRESH_TOKEN;
let FEED_TOKEN;
let stocks = [["sbin-eq","3045"],["wipro-eq","3787"]];

function otp_Generator (){
    const otp = authenticator.generate(TOTP_TOKEN);
    return otp;
}
function date_today(){                                           
    let date = new Date().toISOString().slice(0, 10);
    return date;
}

let smart_api = new SmartAPI({
	api_key: HISTORICAL_DATA_API
});
smart_api
	.generateSession(USER_NAME, PASSWORD, otp_Generator())
	.then( async (data) => {
        JWT_TOKEN = data.data.jwtToken;
        REFRESH_TOKEN = data.data.refreshToken;
        FEED_TOKEN = data.data.feedToken;
        for(let i=0; i<stocks.length; i++){
            try {
                const candleData = await smart_api.getCandleData({
                    "exchange": "NSE",
                    "symboltoken": `${stocks[i][1]}`,
                    "interval": "ONE_MINUTE",
                    "fromdate": `${date_today()} 09:15`,
                    "todate": `${date_today()} 15:30`
                })
                //console.log(candleData);
                const parsedData = candleData.data.map(
                    function (item) {
                        //const [timestamp, open, high, low, close, volume] = item;
                        return {
                            timestamp: item[0].slice(11,16),           
                            open: item[1],
                            high: item[2],
                            low: item[3],
                            close: item[4],
                            volume: item[5],
                        };
                    }
                );
    
                let xls = json2xls(parsedData);
                fs.writeFileSync(`${stocks[i][0]} ${date_today()}.xlsx`, xls, 'binary');

            } catch (error) {
                console.log('ERROR: ', error);
            }
        }
        // console.log("jwt token ",JWT_TOKEN);
        // console.log("refresh ",REFRESH_TOKEN);
        // console.log("feed  ",FEED_TOKEN);

        
    })
	// .then((files) => {
        
	// })
	.catch((err) => {
		console.log("error", err);
	});
    export{JWT_TOKEN,R}

    

