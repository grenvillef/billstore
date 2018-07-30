#! /usr/bin/env sh

 

# (digest in this case The Base64 encoded SHA-256 hash of the empty string)

digest='SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='

 

#Host and path

host=api.sandbox.ing.com

httpMethod=get

reqPath="/grants/preflight-auth-url?scope=viewbalance&country_code=nl"

 

#actual request date (example; reqDate='Sun, 17 Jun 2018 09:23:51 GMT')

reqDate=`LC_TIME=en_US.UTF-8 date -u "+%a, %d %b %Y %H:%M:%S GMT"`

#reqDate='Sat, 30 June 2018 19:09:00 GMT'

 

#ref UUID

reqId=0cb675aa-81d5-4b45-b9ba-453d5c2fc5a3

 

#signing the request

signingString="(request-target): $httpMethod $reqPath

date: $reqDate

digest: $digest

x-ing-reqid: $reqId"

signature=`printf "$signingString" | openssl dgst -sha256 -sign example_client_signing.key -passin "pass:changeit" | openssl base64 -A`

 

printf "************************************************************************************** %s\n"

printf "signingString: $signingString %s\n"

printf "************************************************************************************** %s\n"

printf "signature: $signature %s\n"

printf "************************************************************************************** %s\n"

 
