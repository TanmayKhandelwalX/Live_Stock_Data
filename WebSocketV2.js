
import { SmartAPI, WebSocket,WebSocketV2 } from 'smartapi-javascript';
import { JWT_TOKEN,REFRESH_TOKEN,FEED_TOKEN } from './data';
import { USER_NAME,HISTORICAL_DATA_API } from './constants';
let web_socket = new WebSocketV2({
	jwttoken: JWT_TOKEN,
	apikey: HISTORICAL_DATA_API,
	clientcode: USER_NAME,
	feedtype: FEED_TOKEN
});

web_socket.connect().then((res) => {
	let json_req = {
		correlationID: 'abcde12345',
		action: 1,
        mode: 3,
		exchangeType: 1,
		tokens: ['99926009','99926000'],
		// params: {
		// 	tokenList: [
		// 		{
					
		// 			tokens: ['99926009'],
		// 		},
		// 	],
		// },
	};

	web_socket.fetchData(json_req);
	web_socket.on('tick', receiveTick);

	function receiveTick(data) {
		const {token,last_traded_price,open_interest} = data;
		if(token==='"99926000"') console.log('NIFTY 50:  ', last_traded_price/100,open_interest);
		else console.log('BANK_NIFTY:  ',last_traded_price,open_interest);

		//console.log('DATA    :', data);
	}
});





