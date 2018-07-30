#! /usr/bin/env sh


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
bearerToken="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidHN0LTRjOGI1Mzk3LTFhYjgtNDFhOC1hNTViLWE3MTk5MTJiODNkMiIsImN0eSI6IkpXVCJ9..R_29igVH8--ldMZlQcCOvQ.XE-8mzZxopmzGXAEV3YFUd7JixUXY0UMzRKkCmPmu_KjV8KzeCZ5d5UC12Cb3xumY0cn5Bjf_z5_0nRUHZ8ntEicP9vVqpl_da5SAagu2q-xRyvlJDXeioD0LIaFP8K-h22pf9rKmcIo7qvVBdU7qrn8_Fj9aFWJ4goNDvZsnm3VgWTBK8RiZ3EORE8tRtCdvsrIn2iUHszTE-BoD7OYRZS5vtMNQAQP0LRPnVNDua8A-IHuAsVkJ4N8nQRYLYTixGT5tLu8K89PR-GrKFw0dG5aBRs-FboIu1k7oHCwHVopJAfyFEz2R5LFXrILWbxzHG__RKFF9rasUEeR13rYrRegxGWm16e6YLcrlEan8hLMVMh0QU0tjYnxzfs4rYqYFv_RDy1pTaEtldclvymsEul_CNN-DNVgXbpvuN2W2zKsi1Ti4AOONLlFDc740QfGPHKySvirGxow8dd4O8SYzfK0bLUfzwArjWpIUVPhDJjFqhrK4JcsJN7zCby4Nlxb-NPEALQQUbDu6ZebH8hi2zsPBRrbz6pRTiO7Y2_XnpnYfayDM7c-2sUolrmU5vPHOlsN_2FEFR8GWi00MveHaIppuxnNxOzeVKIwa6HWKYnVW0Puu8gE2Q82tRRepIeagySNr7hyu9Myo_WZd6w6DzrgqflMg-b3QuXTf11sM-YjVB2DlhivPlPQB-3E9mf_8DtMaXHfV8wDtujdye2QUDatW-ifrojqSvSwXOFnA0FEPnOQswaRlXoiOEUt557fPXZlD7wKfhPdvwyN9XBeBMbAiN3RwL30UvMYx4gXvpHe8ZZIzLhyC5uEAR1l_LvQhoPtrHkbI9Nfev7VfRFz_Jlj7yxw3ZNTGWptitp8Xl9Hcyw0EWahykTd5ERSwmp4L9oBxxpp5tW6YrbFWhxWDRgrw6ato1rmkI-DEc4BdtErsLPfidspv1Sq65eNr6Dqk4gGsajsteRdVBbFvY0P-IrOqmmv6CXbtR_88QPAEqjY8dsxVTq6dex9Ezl--0ONZd1oX2N_B7lPxxSZQQJI8Yj448cmBtw_eQIzEY3_W42-atxR9CQlw-qAj4bTvql4xrsAhiFDfT02MvNII-_9U_ilVI9KZn7t3DkkS5OVdktSw5c8ow-bz2R4SHHhnXgWST_Xv-KvyZsYs7Akq8hNowxXXv78Y5WH3P9zw7Y3b1F-vcS8XcuNxsGOolfT5DAUEHYxtU0fl4NtjD0RVNo50XZBaApg3nJuBJE3_XNMitWe7xIi9GCuJLi1QVWmCbqodynblcoLmb6BJsyfMZ8gVy9-RgHA0WGzk_weZGA9htpHJWCudoHpgq2QzcqvO0wG8R5ZYGt8-5cu4KT1ZUV5RYWmzgnZWmytY5wwTqNkT7WD1rCc8hUhSvnsYrLRls1jIBczb3iw_Zyx5oq5sYwJD676xD_wHDy9K7rmWmKC5sRCYbvs2w2RZMw7zzCk-3bWJ32VpYHu_RqaP32kb67Uy5mdy_bdyWSQb_qYLRAamPXg_ssIVdWltrokxhnOguJ_7z1E6bwkHno14zQ2Y76k5Fz1JTcF4gdB3cTRQ4Fp2fPZ5wLd0F-Q28qRXDg950DIFUvusi2LbdCZy11TeKAKi1ogS85-YEogegZ3cXNh2aQOzw_OAJAidXyNHFweQqTieo9xCSoUeKDgiTuxPbFeRtGIEzIJWCIp-ca1d3_bhgZio0t0T9kNm_ihQe--_yNBG9XUNjzdB6res424s04BT7uLz4cvpmnorEFEl_79E0mJ1xycnjhcUUF5HEdLAXgWOatdSxJYDVXt5EEa5Shz4nX85VaYQ3uVC20Wpb0JWwEASCRHSbiexGCDa1YuwlKzwI3LNb1e88SZEfbWEva_2Q0ijCjP1fiqNEMYdZliznjT0FOMvdgG23oCusZfbIQbQQc7VOylzRJoDoXtz6ReaG3FVeAWDXMfN1K-Yb-gVowH_fr4g-HXgXIWTkXCLeg_FpSiCX1lFuZEx0w1BtFuSHBlrlEdKFJ0aqm7v-LhRPETMPVTFBGpE8tz9VqSvPO4xXWLwXxEIMPUCPeWjfA8csmiBxenqzam-F0ufHybNeD9AzF43rkAdR5_1lS4XxmzZ9cfnD0JnQzM9klW0cAq-qMPY0245feOrSCHxfySn_WW-fXc0YUIiJ_v1HyT-HqXJC3iw0q7A_6HycQLwPoz1UrEn6oWKT4v0S_P5cZS-cWjd_87aNB-_JqdWzBtAk2l.wtI5S9iJVN8lIqvlzrlgNgBsgIuQ1V0Aw930SvfQ0Qw"

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
