#! /usr/bin/env sh


## These should be modified per endpoint
METHOD="GET"
PATHWITHOUTQUERY="/grants/preflight-auth-url"
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
bearerToken="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidHN0LTRjOGI1Mzk3LTFhYjgtNDFhOC1hNTViLWE3MTk5MTJiODNkMiIsImN0eSI6IkpXVCJ9..Jbe55EZeSs6plqolU_3TjA.AbfrScJRXeET8dzHxxZVzHd7JPbsCGS4mwagSBsxdIgDSQHSJIlk9-CtOhaWXM2t0hA2PlxRKluFSOErrF9tay2JQ1DpMN-ctp4sYrMqteILcwcphBqBHqB4IfhVDNOukPcXrxbLwfMl10YuU_WleSF7Is7vARxAmwlN3-42PPXNvGNFGFurpcAPi9ytY75V298CJBxlILSSKYJUEW2tzXRT9IJznFYmH8B7OJ3hpjMozBioGyo3raNlNob34gOIPN9WyMRXv0jsT4D0U1hl-p-EajXyZY5-1F9mCwq3TX87VoclVqJNcljSlppyCGUYROZWNiA6vOlkks--Ym-AOtihTi0JMnoMet7r0_iKWMbtrvp1_hwB117Dpi4kOT5MBSuNFR8ek0HOtlpYjsUCkOH63iv_01BFugRfSl3bC8H0kyETywnFjDvPbytbLjIxbeuzmoZWerbDyda2mkIEsH0dQvfxS2jDuo-icdJjR5tgus6AYSqrHDZxu5JlU8QoUpOmc8jRgZLOi3Di14nZ6evZ8IsB8Pu-aJFzI3WiWr3fNLDS0PdS2z-0syOuNIX2qd1nI20bOlB26eIrNZGwUPoZlR-lMJZK0WKNJLQSDq3Vc-lMAWGIwTlMdBJjjHL29vS8yBIFul94ubAwyUIsOJNaotsfM2sM39cvc9Z1nRw3DiiGrqgzqOUPnw4syMsGQk819MEQmjP9Q8YMNF3MB4XzHaWs4Bnh3pCV_QliVja_kQiv9ebc_Rll4nA9-496XTBd79bLhB7OqXukrTNEr65NNz099XXWEfQOQtMjC1upMhbM_ad8B4k3_8HVjDIVBvXuxhs4hYbPC5Ueby5fRh-E1h_RD5q5BER4AznTGSa0SSXUKDA5jdnJnodIKLsOdoUiQbklFS5Pn8bIrqIUMcfGWWgbVdhNMOAm_caBxIQiNbNfWO0FAIqw7tjIbEYaQe0f3HWQ4J43XcdIdXlVyJjJlaH6x3RrGBvhYtIg551FtoEhxTRv2zZOQIirvnP932INtwsWlIg6qz1za2rlHe8VwfE2Iy3_pPQ3LrFJ9FF6JogmzIkIz1tuuGtYVyGhqFqihFoz15VO1oZP-OFLtnPfOMUzCFWPY4h64qz-61H4JVjleoxtXoCyxyXEAn5COmPyYi_fwZes48bStLns4T0DjjF0d-veyxqsZNzvdYvEdPue1YupzXkoAwA-Q2iVVjZdcZKsdbdJqstODhc1Rn8Kzm_NF3QNs0aHHd7aS7bnFOaScOtexbpghLY6jmcEIawNA_ijs9_bytFScH4fjHfXX4xtvgss3FpFgysDyMQzrF0iwiT54s53MYj7TZtfZUfYAf-bPgG8dSyRzePf175l6-hl8ZfZ2zedSdVQyatChs8l8Rb4wxlgqrDC6SETI3CKoKhnyK-m84pXcmrIQ-xueutyYusOXkZaSHw_7sKWihkU5NZEQ-SmQY4j8_DlUG_Q90X77x32xYu4v5QczdwSI1_5yxKjnA_CvB5jJoUbbqPVfL9Or1Nb-TWSTwXAka0QuegAEx3Rs0nuGRQZ9EReYzLqFDTueH4p60nT68_eW79uApRuHP-E7PZq2OIqSP_bgLWJ0445mkubhKbdmobWcu__66Z_Nt1HnX1ZdRQnJj_dNTZ1cxHhAm436i0CgSSpmQqWKQ4BrEfv--dJd1tKWvq1Q3fN0h_dHYtBRoTmaAYOWpj11_Fg1yOIVMLorhu29ev6Hl8suvNys9F07ccGUO3hUoHmhboGs1Eg0dQH11BpV713cSWJu8D2k6XeU8--O9AWaAHJteMQhPO6eYT3f8fApsuzkeWI5hTd9_4JOCvNpwZ8tuAxaI5iMSRzQe3VLlHSCv3eif-mi_SgibgB8mxLLZ8A7A1V7rGI-e51YT37FOrXUjxOmVPJk8wnMRq8N4y18rtVCXX4fxSbp7-ca_ve9WZB-7z3gs7m-dGdMZJenOiKu-Hh2tuTevWiAjTe0_5WWh7OVoFL-2crqZ6HZx5uWHYKL2jiuOimEsgIw7K77e-5pi_jROSZRagDD2ymPml5D9EybTyn6KZcfZadUP2zHB0SFJj4htSMrSCZ6dyOfZokjBOeBL07wDFFJkhjy-gyLrTasFu9S6lMNqSOHoPb3bVqlHRfog268gPunMNwoFjoPmafGHDqc57o79LjBsBCq2CpJRYUe5wsBRCigfpUi3XShjs21747pTRqteLqs3gMlOQhY6pJOD6s58rFQMeAWEpjbzqyHRAIMw.U6LFZ8I-BdEqVf7AzuKYsYKTOGCKZm5Ed8d728cc0zQ"

signingString="(request-target): $methodLowerCase $PATHWITHOUTQUERY\ndate: $httpDate\ndigest: $digest\nx-ing-reqid: $reqId"

signature=`printf "$signingString" | openssl dgst -sha256 -sign example_client_signing.key -passin "pass:changeit" | $base64Command`


printf "************************************************************************************** %s\n"

printf "signingString: $signingString %s\n"

printf "************************************************************************************** %s\n"

printf "signature: $signature %s\n"

printf "************************************************************************************** %s\n"

#echo "================================================================================="
#echo "String to be signed for signature: \n$signingString\n\n"
#echo "Resulting signature: $signature\n\n"

#echo "Executing cURL command \n\n"

/usr/local/bin/curl -i -X $methodUpperCase \
'https://'$HOST$pathWithQuery \
-H 'Accept: application/json, application/json, application/*+json, application/*+json' \
-H "Authorization: Bearer $bearerToken" \
-H 'Content-Length: 0' \
-H "Digest: $digest" \
-H "Date: $httpDate" \
-H "X-ING-ReqID: $reqId" \
-H 'Signature: keyId="example_client_id",algorithm="rsa-sha256",headers="(request-target) date digest x-ing-reqid",signature="'$signature'"' \
--cert example_client_tls.cer \
--key example_client_tls.key
