var serviceNodes;
var block = {
	"whitepaper": "Coming Soon...",
	"markets": "<a href='https://bittrex.com/Market/Index?MarketName=BTC-BLOCK'>Bittrex</a>, <a href='https://novaexchange.com/market/BTC_BLOCK/''>Nova Exchange</a>",
	"blockCount": "",
	"networkDifficulty": "",
	"networkHash": "",
	"serviceNodes": "",
	"algo": "",
	"proof": "POW/POS",
	"releaseMethod": "ITO, No Premine",
	"startDate":"Oct. 20, 2014",
	"blockReward": "1 BLOCK",
	"blockTime": "60 sec.",
	"24hOpen": "",
	"24hHigh": "",
	"24hLow": "",
	"marketCap": "",
	"ccFollowers": "",
	"ccPoints": "",
	"ccPosts": "",
	"ccComments": "",
	"ccViews": "",
	"twitFollowers": "",
	"twitFollowing": "",
	"twitLists": "",
	"twitTweets": "",
	"twitStart": "Oct. 2014",
	"twitHandle": "@The_Blocknet",
	"twitLink": "https://twitter.com/The_Blocknet",
	"slackUsers": "1800",
	"slackInvite": "https://blocknetdx-slack.herokuapp.com/",
	"telegramUsers": "174",
	"telegramLink": "https://t.me/Blocknet",
	"redLink": "https://www.reddit.com/r/theblocknet/",
	"redHandle": "",
	"redActiveUsers": "",
	"redSubs": "",
	"redStart": "Nov. 2014",
	"redAMA": "https://www.reddit.com/r/theblocknet/comments/676buj/ask_anything_about_blocknet_qa/",
	"githubLink": "https://github.com/BlocknetDX",
	"youtubeLink": "https://www.youtube.com/channel/UCCDBoR9fHb21bLH7FGvFrQg/videos",
	"rocketLink": "https://webapp.blocknet.co/home",
	"mediumHandle": "@theblocknetchannel",
	"mediumLink": "https://medium.com/@theblocknetchannel",
	"steemHandle": "@theblocknet",
	"steem": "https://steemit.com/@theblocknet",
	"explorer": "https://chainz.cryptoid.info/block/",
	"api": "https://github.com/BlocknetDX/BlockDX/blob/master/doc/dx/dxapi.md",
	"faq": "https://github.com/BlocknetDX/blocknet-docs/blob/master/blocknetFAQ.md",
	"walletMigration": "https://github.com/BlocknetDX/blocknet-docs/blob/master/blocknet-migrate-wallet.md",
	"serviceNodeSetup": "https://github.com/BlocknetDX/blocknet-docs/blob/master/blocknetDXservice-node.md",
	"cmcPriceUSD": "",
	"cmcPriceBTC": "",
	"cmc24hVolUSD": "",
	"cmcSupply": "",
	"1hPChange": "",
	"24hPChange": "",
	"7dPChange": "",
};


$(function(){
	init();
});


function init() {
	loadSnode();
	loadPriceData();
	loadSocial();
	loadCMC();
	loadReddit();
	// loadStaking();
	// loadSocial2();
	// loadChartData();
	// loadGithub();
};

// Blog Page, Medium articles XML
// https://medium.com/feed/@theblocknetchannel

// Works - Done
function loadSnode() {
	$.ajax({
		type: "GET",
		// url: "http://107.170.169.56:8888/api/v1.0/snode",
		url: "https://api.cryptocallback.com/snode",
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			// block["blockCount"] = data["BlockCount"];
			// block["networkDifficulty"] = data["NetworkDifficulty"];
			// block["networkHash"] = data["NetworkHash"];
			block["serviceNodes"] = data[0]["ServiceNodeTotal"];
			servicenodes = data[0]["ServiceNodeTotal"];
			// console.log("loadSnode: " + block["serviceNodes"]);
			$("#blockheight").html(data[0]["BlockCount"]);
			$("#networkdiff").html(numberPretty(data[0]["NetworkDifficulty"].split(".")[0]));
			$("#networkhash").html(numberPretty(data[0]["NetworkHash"]));
			$("#servicenodes").html(data[0]["ServiceNodeTotal"]);
			var msCurrent, currentBlock, startBlock, blockRemain, msRemain, msFinal, blockFinal, date, dateSimple;
			msCurrent = new Date().getTime();
			currentBlock = data[0]["BlockCount"];
			// currentBlock = 112571;
			startBlock = currentBlock - 86400;
			blockRemain = Number("."+(1 - (startBlock / 43200)).toString().split(".")[1])*43200;
			msRemain = blockRemain*60000;
			msFinal = msCurrent + msRemain;
			blockFinal = currentBlock + blockRemain;
			date = new Date(msFinal);
			dateSimple = date.toString().split(" ")[1] + " " + date.toString().split(" ")[2] + " " + date.toString().split(" ")[3];
			$("#vote-close-date").html(dateSimple);
			$("#vote-close-block").html(blockFinal);

		}
	});
};

// Works - Done
function loadPriceData() {
	$.ajax({
		type: "GET",
		url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BLOCK&tsyms=BTC,USD",
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			// block["24hOpen"] = data["DISPLAY"]["BLOCK"]["USD"]["OPEN24HOUR"];
			// block["24hHigh"] = data["DISPLAY"]["BLOCK"]["USD"]["HIGH24HOUR"];
			// block["24hLow"] = data["DISPLAY"]["BLOCK"]["USD"]["LOW24HOUR"];
			// block["marketCap"] = data["DISPLAY"]["BLOCK"]["USD"]["MKTCAP"];
			// console.log("loadPriceData: " + block["marketCap"]);
			$("#open").html("&#36;" + data["RAW"]["BLOCK"]["USD"]["OPEN24HOUR"].toPrecision(4));
			$("#range").html("&#36;" + data["RAW"]["BLOCK"]["USD"]["LOW24HOUR"].toPrecision(4) + " - &#36;" + data["RAW"]["BLOCK"]["USD"]["HIGH24HOUR"].toPrecision(4));
			$("#cap").html(data["DISPLAY"]["BLOCK"]["USD"]["MKTCAP"]);
		}
	});
};

// Works - Done
function loadSocial() {
	$.ajax({
		type: "GET",
		// url: "https://www.cryptocompare.com/api/data/socialstats/?id=5305",
		url: "https://api.cryptocallback.com/assetsocial/block",
		dataType: 'JSON',
		jsonpCallback: 'callback',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			$("#ccfollowers").html(numberPretty(data[0]["CryptoCompare"]["Followers"]));
			$("#ccviews").html(numberPretty(data[0]["CryptoCompare"]["PageViews"]));
			$("#twitfollowers").html(numberPretty(data[0]["Twitter"]["followers"]));
			$("#twittweets").html(numberPretty(data[0]["Twitter"]["statuses"]));
		}
	});
};

// Works - Done
function loadCMC() {
	$.ajax({
		type: "GET",
		url: "https://api.coinmarketcap.com/v1/ticker/blocknet/?convert=USD",
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			// block["cmcPriceUSD"] = data[0]["price_usd"];
			// block["cmcPriceBTC"] = data[0]["price_btc"];
			// block["cmc24hVolUSD"] = data[0]["24h_volume_usd"];
			// block["cmcSupply"] = data[0]["available_supply"];
			// block["1hPChange"] = data[0]["percent_change_1h"];
			// block["24hPChange"] = data[0]["percent_change_24h"];
			// block["7dPChange"] = data[0]["percent_change_7d"];
			// console.log("loadCMC: " + block["cmcSupply"]);
			var supply =data[0]["available_supply"].replace(".0","");
			$("#priceusd").html("&#36;" + Number(data[0]["price_usd"]).toPrecision(4));
			$("#pricebtc").html(Number(data[0]["price_btc"]).toPrecision(3) + " &#x0E3F;");
			$("#volume").html("&#36;" + numberPretty(data[0]["24h_volume_usd"]+"0"));
			$("#supply").html(numberPretty(supply));
			$("#supply2").html(numberPretty(supply));
			$("#hourchange").html(data[0]["percent_change_1h"] + "&#37;");
			$("#daychange").html(data[0]["percent_change_24h"] + "&#37;");
			$("#weekchange").html(data[0]["percent_change_7d"] + "&#37;");
			percentChangeColor();
		}
	});
};

// Works - Done
function loadReddit() {
	$.ajax({
		type: "GET",
		url: "https://www.reddit.com/r/theblocknet/about.json",
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			// block["redHandle"] = data["data"]["display_name"];
			// block["redActiveUsers"] = data["data"]["accounts_active"];
			$("#redditsubs").html(data["data"]["subscribers"]);
		}
	});
};

// Doesn't work - no error
function loadStaking() {
	$.ajax({
		type: "GET",
		url: "https://chainz.cryptoid.info/explorer/index.stakes.dws?coin=block",
		dataType: 'JSON',
		error: function(jqXHR, textStatus, errorThrown){
			console.log("request failed: " + textStatus + ", " + errorThrown);
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			var serviceblocks = Number(servicenodes)*5000;
			var stakes = data["stakes"];
			var stakingblocks = 0;
			for (var i = 0; i < stakes.length; i++) {
				stakingblocks += stakes[i]["amount"];
			}
			blockstaked = stakingblocks - serviceblocks;
			$("#blockstaked").html(data[0]["ServiceNodeTotal"]);
			
		}
	});
}

// Error - No 'Access-Control-Allow-Origin' header, mini-api sub not available
// function loadSocial2() {
// 	$.ajax({
// 		type: "GET",
// 		// url: "https://www.cryptocompare.com/api/data/socialstats/?id=5305",
// 		url: "https://api.cryptocallback.com/assetsocial/block",
// 		dataType: 'JSONP',
// 		jsonpCallback: 'callback',
// 		error: function(){
// 			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
// 		},
// 		success: function(data){
// 			// block["ccFollowers"] = data["Data"]["CryptoCompare"]["Followers"];
// 			// block["ccPoints"] = data["Data"]["CryptoCompare"]["Points"];
// 			// block["ccPosts"] = data["Data"]["CryptoCompare"]["Posts"];
// 			// block["ccComments"] = data["Data"]["CryptoCompare"]["Comments"];
// 			// block["ccViews"] = data["Data"]["CryptoCompare"]["PageViews"];
// 			// block["twitFollowers"] = data["Data"]["Twitter"]["followers"];
// 			// block["twitFollowing"] = data["Data"]["Twitter"]["following"];
// 			// block["twitLists"] = data["Data"]["Twitter"]["lists"];
// 			// block["twitTweets"] = data["Data"]["Twitter"]["statuses"];
// 			// console.log(block["twitTweets"]);
// 			console.log("loadSocial: " + data);
// 		}
// 	});
// };

function loadChartData() {
	$.ajax({
		type: "GET",
		url: "http://coincap.io/history/1day/BLOCK",
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			var prices = [];
			// for 
			console.log(data["price"]);

			new Chart(document.getElementById("price-chart"), {
			  type: 'line',
			  data: {
			    labels: [1500,1600,1700,1750,1800,1850,1900],
			    datasets: [{ 
			        data: [86,114,106,106,107,111,133],
			        borderColor: "#3e95cd",
			        fill: false
			      }
			    ]
			  },
			  options: {
			    title: {
			      display: true
			    },
			    legend: {
			        display: false
			    },
			    scales: {
			      xAxes: [{
			        display: true,
			        gridLines: {
			          display: true,
			          color: "#888"
			        }
			      }],
			      yAxes: [{
			        display: true,
			        gridLines: {
			          display: true,
			          color: "#888"
			        }
			      }]
			    }
			  }
			});
		}
	});
};

// Doesn't work - Cross-Origin
function loadGithub() {
	$.ajax({
		type: "GET",
		url: "https://github.com/BlocknetDX/BlockDX/graphs/contributors-data.json",
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			// console.log(data[0]["author"]);
			console.log("loadGithub: " + data);

			// [{
			// 	"author":{
			// 		"login":"thelazier",
			// 		"avatar":"https://avatars1.gith..."
			// 	},
			// 	"weeks":[{
			// 		"w":1251590400,"a":0,"d":0,"c":0},{......},
			// 	{
			// 	"author":{
			// 		......

			// 	data to graph github commits
			// 	A = # of additions
			// 	B = # of deletions
			// 	C = # of commits
		}
	});
};



function percentChangeColor() {
	if (Number($("#hourchange").html().replace("%",""))>0) {
		$("#hourchange").css("color","green");
	} else {
		$("#hourchange").css("color","red");
	};
	if (Number($("#daychange").html().replace("%",""))>0) {
		$("#daychange").css("color","green");
		$("#priceusd").css("color","green");
	} else {
		$("#daychange").css("color","red");
		$("#priceusd").css("color","red");
	};
	if (Number($("#weekchange").html().replace("%",""))>0) {
		$("#weekchange").css("color","green");
	} else {
		$("#weekchange").css("color","red");
	};
};










// new Chart(document.getElementById("price-chart"), {
//   type: 'line',
//   data: {
//     labels: [1500,1600,1700,1750,1800,1850,1900],
//     datasets: [{ 
//         data: [86,114,106,106,107,111,133],
//         borderColor: "#3e95cd",
//         fill: false
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true
//     },
//     legend: {
//         display: false
//     },
//     scales: {
//       xAxes: [{
//         display: true,
//         gridLines: {
//           display: true,
//           color: "#888"
//         }
//       }],
//       yAxes: [{
//         display: true,
//         gridLines: {
//           display: true,
//           color: "#888"
//         }
//       }]
//     }
//   }
// });