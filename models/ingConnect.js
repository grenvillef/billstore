const https = require('https');

var crypto = require('crypto');

var dateFormat = require('dateformat');

const fs = require('fs')

const privateKey = fs.readFileSync('example_client_signing.key', 'utf-8')


signingString="(request-target): post /security-means/app-certificate/authenticate\ndate: Wed, 11 Apr 2018 15:07:23 GMT\ndigest: SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=\nx-ing-reqid: e86bf09b-d772-4528-af83-ba42aa594ac4"

var signer = crypto.createSign('sha256')
   .update(signingString);

var signature = signer.sign(privateKey, 'base64');  

var accessToken;
/*

var reqHeaders =  {
	'Accept': 'application/json',
	'Scopes': 'granting',
	'Content-Length': '0',
	'Digest': 'SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
	'Date': 'Wed, 11 Apr 2018 15:07:23 GMT',
	'X-ING-ReqID': 'e86bf09b-d772-4528-af83-ba42aa594ac4',
	'Authorization: Signature: keyId="example_client_id",algorithm="rsa-sha256",headers="(request-target) date digest x-ing-reqid",signature="Z5tNCxEIJiUar8MXZVOJc1AC58dXgU95SWFJrLfcWd828fuG4sK/yIK4ZXGDLfzKldYQCt5IuxciKpr2+n6Qnq6FiYtdEpsOymZMIaKvXMeSCRUU9CF+T1GP8wxV8tBeooHCmt1fnNWZ9gG2AUwZacdC36MFctR1kAFXn0ymKK4xgVDgF7FJc4Gbydysl6B2K7UbkleKXEcYIy+QVHvpfUV+0XIzJhpm1DDCGdkiI6KugWPy+2hZ+IBnfbNWQIjI7wgWj2L8WYqWxyLtGTmleChmYYKInpC8sWozqPTQvbbEsXtJI7k20rEnqdlSKniUJ+fWFiQ1jS+THMPYuSzWbg=="'
	
};
*/

var options = {
  host:'api.sandbox.ing.com',
  path: '/security-means/app-certificate/authenticate',
  method: 'POST',
  headers: {
        'Accept': 'application/json',
        'Scopes': 'granting',
        'Content-Length': '0',
        'Digest': 'SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
        'Date': 'Wed, 11 Apr 2018 15:07:23 GMT',
        'X-ING-ReqID': 'e86bf09b-d772-4528-af83-ba42aa594ac4',
        'Authorization': 'Signature: keyId="example_client_id",algorithm="rsa-sha256",headers="(request-target) date digest x-ing-reqid",signature='+signature
	},
	key: fs.readFileSync('example_client_tls.key', 'utf-8'),
	cert: fs.readFileSync('example_client_tls.cer', 'utf-8')
};




var req = https.request(options, function(res) {
  res.setEncoding('utf8');

  var responseString = '';

  res.on('data', function(data) {
	responseString += data;
	
});


  res.on('end', function() {
	
	var responseObject = JSON.parse(responseString);
	accessToken = responseObject.accessTokens.accessToken;

  });
});


req.on('error', (e) => {
  console.error(e);
});

//req.write(dataString);
req.end();


reqDate = "Mon, 30 Jul 2018 14:33:44 GMT";

signingString="(request-target): get /grants/preflight-auth-url\ndate: "+reqDate+"\ndigest: SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=\nx-ing-reqid: 0cb675aa-81d5-4b45-b9ba-453d5c2fc5a3"

var signer = crypto.createSign('sha256')
   .update(signingString);
signature = signer.sign(privateKey, 'base64');  

//console.log(dateformat(now, "ddd, dd mmm yyyy HH:MM:SS GMT"));
var options = {
  host:'api.sandbox.ing.com',
  path: '/grants/preflight-auth-url?scope=viewbalance&country_code=nl',
  method: 'GET',
  headers: {
        'Accept': 'application/json',
        'Scopes': 'granting',
        'Content-Length': '0',
        'Digest': 'SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
        'Date': reqDate,
        'X-ING-ReqID': '0cb675aa-81d5-4b45-b9ba-453d5c2fc5a3',
        'Authorization': 'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidHN0LTRjOGI1Mzk3LTFhYjgtNDFhOC1hNTViLWE3MTk5MTJiODNkMiIsImN0eSI6IkpXVCJ9..Jbe55EZeSs6plqolU_3TjA.AbfrScJRXeET8dzHxxZVzHd7JPbsCGS4mwagSBsxdIgDSQHSJIlk9-CtOhaWXM2t0hA2PlxRKluFSOErrF9tay2JQ1DpMN-ctp4sYrMqteILcwcphBqBHqB4IfhVDNOukPcXrxbLwfMl10YuU_WleSF7Is7vARxAmwlN3-42PPXNvGNFGFurpcAPi9ytY75V298CJBxlILSSKYJUEW2tzXRT9IJznFYmH8B7OJ3hpjMozBioGyo3raNlNob34gOIPN9WyMRXv0jsT4D0U1hl-p-EajXyZY5-1F9mCwq3TX87VoclVqJNcljSlppyCGUYROZWNiA6vOlkks--Ym-AOtihTi0JMnoMet7r0_iKWMbtrvp1_hwB117Dpi4kOT5MBSuNFR8ek0HOtlpYjsUCkOH63iv_01BFugRfSl3bC8H0kyETywnFjDvPbytbLjIxbeuzmoZWerbDyda2mkIEsH0dQvfxS2jDuo-icdJjR5tgus6AYSqrHDZxu5JlU8QoUpOmc8jRgZLOi3Di14nZ6evZ8IsB8Pu-aJFzI3WiWr3fNLDS0PdS2z-0syOuNIX2qd1nI20bOlB26eIrNZGwUPoZlR-lMJZK0WKNJLQSDq3Vc-lMAWGIwTlMdBJjjHL29vS8yBIFul94ubAwyUIsOJNaotsfM2sM39cvc9Z1nRw3DiiGrqgzqOUPnw4syMsGQk819MEQmjP9Q8YMNF3MB4XzHaWs4Bnh3pCV_QliVja_kQiv9ebc_Rll4nA9-496XTBd79bLhB7OqXukrTNEr65NNz099XXWEfQOQtMjC1upMhbM_ad8B4k3_8HVjDIVBvXuxhs4hYbPC5Ueby5fRh-E1h_RD5q5BER4AznTGSa0SSXUKDA5jdnJnodIKLsOdoUiQbklFS5Pn8bIrqIUMcfGWWgbVdhNMOAm_caBxIQiNbNfWO0FAIqw7tjIbEYaQe0f3HWQ4J43XcdIdXlVyJjJlaH6x3RrGBvhYtIg551FtoEhxTRv2zZOQIirvnP932INtwsWlIg6qz1za2rlHe8VwfE2Iy3_pPQ3LrFJ9FF6JogmzIkIz1tuuGtYVyGhqFqihFoz15VO1oZP-OFLtnPfOMUzCFWPY4h64qz-61H4JVjleoxtXoCyxyXEAn5COmPyYi_fwZes48bStLns4T0DjjF0d-veyxqsZNzvdYvEdPue1YupzXkoAwA-Q2iVVjZdcZKsdbdJqstODhc1Rn8Kzm_NF3QNs0aHHd7aS7bnFOaScOtexbpghLY6jmcEIawNA_ijs9_bytFScH4fjHfXX4xtvgss3FpFgysDyMQzrF0iwiT54s53MYj7TZtfZUfYAf-bPgG8dSyRzePf175l6-hl8ZfZ2zedSdVQyatChs8l8Rb4wxlgqrDC6SETI3CKoKhnyK-m84pXcmrIQ-xueutyYusOXkZaSHw_7sKWihkU5NZEQ-SmQY4j8_DlUG_Q90X77x32xYu4v5QczdwSI1_5yxKjnA_CvB5jJoUbbqPVfL9Or1Nb-TWSTwXAka0QuegAEx3Rs0nuGRQZ9EReYzLqFDTueH4p60nT68_eW79uApRuHP-E7PZq2OIqSP_bgLWJ0445mkubhKbdmobWcu__66Z_Nt1HnX1ZdRQnJj_dNTZ1cxHhAm436i0CgSSpmQqWKQ4BrEfv--dJd1tKWvq1Q3fN0h_dHYtBRoTmaAYOWpj11_Fg1yOIVMLorhu29ev6Hl8suvNys9F07ccGUO3hUoHmhboGs1Eg0dQH11BpV713cSWJu8D2k6XeU8--O9AWaAHJteMQhPO6eYT3f8fApsuzkeWI5hTd9_4JOCvNpwZ8tuAxaI5iMSRzQe3VLlHSCv3eif-mi_SgibgB8mxLLZ8A7A1V7rGI-e51YT37FOrXUjxOmVPJk8wnMRq8N4y18rtVCXX4fxSbp7-ca_ve9WZB-7z3gs7m-dGdMZJenOiKu-Hh2tuTevWiAjTe0_5WWh7OVoFL-2crqZ6HZx5uWHYKL2jiuOimEsgIw7K77e-5pi_jROSZRagDD2ymPml5D9EybTyn6KZcfZadUP2zHB0SFJj4htSMrSCZ6dyOfZokjBOeBL07wDFFJkhjy-gyLrTasFu9S6lMNqSOHoPb3bVqlHRfog268gPunMNwoFjoPmafGHDqc57o79LjBsBCq2CpJRYUe5wsBRCigfpUi3XShjs21747pTRqteLqs3gMlOQhY6pJOD6s58rFQMeAWEpjbzqyHRAIMw.U6LFZ8I-BdEqVf7AzuKYsYKTOGCKZm5Ed8d728cc0zQ',
	'Signature': 'keyId="example_client_id",algorithm="rsa-sha256",headers="(request-target) date digest x-ing-reqid",signature='+signature
	},
	key: fs.readFileSync('example_client_tls.key', 'utf-8'),
	cert: fs.readFileSync('example_client_tls.cer', 'utf-8')
};

var req = https.request(options, function(res) {
  res.setEncoding('utf8');

  var responseString = '';

  res.on('data', function(data) {
	responseString += data;
	
});


  res.on('end', function() {
	
	var responseObject = JSON.parse(responseString);
	console.log(responseObject.location);
  });
});


req.on('error', (e) => {
  console.error(e);
});

//req.write(dataString);
req.end();





/*

var user={

	getUserByEmail: function(email,callback){
 		console.log('in getUserByEmail:'+email);
		return  db.query("select * from Customers where CustEmailAddress = ?",[email], callback);
	}
};

module.exports = user;
/*
## These should be modified per endpoint
METHOD="POST"
PATHWITHOUTQUERY="/security-means/app-certificate/authenticate"
#QUERY="scope=viewbalance&country_code=nl"
QUERY="scope=viewbalance&country_code=nl"

## Change things below with care
reqIdRandom=`uuidgen`

HOST=${HOST:-"api.sandbox.ing.com"}
methodUpperCase=`echo $METHOD | awk '{print toupper($0)}'`
methodLowerCase=`echo $METHOD | awk '{print tolower($0)}'`

pathWithQuery="$PATHWITHOUTQUERY?$QUERY"
base64Command="openssl base64 -A"

httpDate=`LANG=en_US date -u +%a,\ %d\ %b\ %Y\ %H:%M:%S\ GMT`
reqId="$reqIdRandom"

# Body will be empty in the examples below so same digest everywhere
digest="SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
bearerToken="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidHN0LTRjOGI1Mzk3LTFhYjgtNDFhOC1hNTViLWE3MTk5MTJiODNkMiIsImN0eSI6IkpXVCJ9..R_29igVH8--ldMZlQcCOvQ.XE-8mzZxopmzGXAEV3YFUd7$

signingString="(request-target): $methodLowerCase $PATHWITHOUTQUERY\ndate: $httpDate\ndigest: $digest\nx-ing-reqid: $reqId"

signature=`printf "$signingString" | openssl dgst -sha256 -sign example_client_signing.key -passin "pass:changeit" | $base64Command`

echo "String to be signed for signature: \n$signingString"
echo "Resulting signature: $signature"

echo "Executing cURL command"

/usr/local/bin/curl -i -X $methodUpperCase \
'https://api.sandbox.ing.com/security-means/app-certificate/authenticate'\ #$HOST$pathWithQuery \
-H 'Accept: application/json, application/json, application/*+json, application/*+json' \
-H 'Scopes: granting' \
-H 'Content-Length: 0' \
-H "Digest: $digest" \
-H "Date: $httpDate" \
-H "X-ING-ReqID: $reqId" \
-H 'Authorization: Signature: keyId="example_client_id",algorithm="rsa-sha256",headers="(request-target) date digest x-ing-reqid",signature="'$signature'"' \
--cert example_client_tls.cer \
--key example_client_tls.key

*/
