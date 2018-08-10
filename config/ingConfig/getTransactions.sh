#! /usr/bin/env sh


## These should be modified per endpoint
METHOD="GET"
PATHWITHOUTQUERY="/v1/accounts/7de0041d-4f25-4b6c-a885-0bbeb1eab220/balances"

## Change things below with care
reqIdRandom=`uuidgen`

HOST=${HOST:-"api.sandbox.ing.com"}
methodUpperCase=`echo $METHOD | awk '{print toupper($0)}'`
methodLowerCase=`echo $METHOD | awk '{print tolower($0)}'`

base64Command="openssl base64 -A"

httpDate=`LANG=en_US date -u +%a,\ %d\ %b\ %Y\ %H:%M:%S\ GMT`
reqId="$reqIdRandom"

digest="SHA-256=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
bearerToken="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidHN0LTRjOGI1Mzk3LTFhYjgtNDFhOC1hNTViLWE3MTk5MTJiODNkMiIsImN0eSI6IkpXVCJ9..l1zXiDpgb255uCrflmc8bw.wSzxRR4LcrGh1ImzhlabioHRZawFcTMyDRlz4M80TuOTRq4gTN50vVxW9JRA6v1qn7kwI-P5ZR-Q7lERAv6viLQrD06S_dxqzH2GyJj8HRwOtL6msZ_DZtJwTCmKC558I47tp6bGcsj9qcW2vmIoWpWrdMDu2kKm6rjuRZo0LRbknuTCD0udXbSC0MWsQH14AN_ZFF3gwO89TOQzz5dzb8Q_VjkPVRRfeEmexW2l0xZA9zLn42-zGexUGprl3EpO_UMH2Wurum-rBQfSsXgHZ2R1DN0tkOlNcOoHx5tIagKxv7Nw4XNIqDe-R2iSPoDu9Fxw_YBxbO0QyI_CI1QkMpHPqjMH6wJFx7K816VR_nGJ8UeiJ-MjyJO6pMujv-4bqmB03NkzdMwff_lWx2B9rJTeRG-tZG9XaBBZWDXHRmtX1bvHPWCAgjwlcGL8U6pTpiX5g2cCMz_1l60afQ901TVfZWKed1cChCOIK7rtn4v4Tv_m4jB_o8sJ8F2mpvAgFJ1NtgAWE3c-h5eRRw-kgXaDKhtgsprSDypeKeNO4RMHy_W5Jja_BVcNDydVbeTjHzX8sZU5GtcEV7tmPOwV84fFSKkiCqzlkV0yKGTJBcWeMz6GM0Y675oZQlqCuaTnhDzsQaK2VTfr67AVqc_u5rkazd9A9Ku6c7kS7dQyt_NbTeNVhAitm5mH_t30gOafXlTZinKMJ2EcrYIK4tKT740we2cSR3POKaf4Sdlf3bxL3sjkzSnzkvfFK2k-piQu0YrjV0laWF-xfwt_srbEsTr-S9fnDFmImGGhkoJ8qzDWqHuyC81rpd3qnWT2iMZecjhoie_w3elFqs0eobilUSo4MbIBH_XHctTGKn-WivnpWv-Y_ObdHD5PXrk-KkboNGsAs7RmwPQ6C5RiyEjtT7NQeURzIFckh4BFk0K9loecl-Ne6axOw4raWhDX06lhcVIINHaz1bWIp4xO0mP5wrx8JMK7aI1uKiAEUjQ1bhOR__YMJzX3dDQg5KPuDL3gejI7U2eop5yQBaSKe8pxDReSorwZP8Wsajph4MaTepFaNzlKYmQtWe8UUGG8KtIqj1DxmOTwJQQmLnGdn8d-yGbFUju21Vaf2hS9zTkV9-FOOiJoxX9Jwo1qQnCqPQD5XLM8k8YPFenmP86ukPuUccM0JcLwOJxsS8OUwY7a77a2ECiqXgMry0MS-1A9_HeRtc3_fVzlks2Ma6o-nX0Ou3SZRdRXYxwpTypkxSrfynNbdehBiQb4SXBlNhzVshq_OI3BR7YcejzFDWPatfX0K8KF5D972qYb6aBphSwSLnFunx36HnBrvob7Ino-0_X7Kkc1DZgQSVAY-Cp4Jf-dGJ-Y5MWkhPvJsFN4lr9kqkw9t_jlYYO8m7KjedFgx0rLXnxhpeXZfmrLLcJ77whWuvv-yummK2i2rRysTUiDQEIaTMkO-UQOhtkFsnzdzR292V0qxCJi8egUifRdpzF4jKIROQ6ivooNhDzW56DA-8nj3UiF0WfHx1bPPL8HOdqjW-fzd1o-OpC6pN2FtJxBOkybOMEfhfVemE7rhTwyeg1CL_jKSm0YIEayNTiE4xGbSwm_XHlifOLAJsbU7sUHHMe16MUmdDyYH2arne12o7iUD9luJDhoCfCJl3DJYz-bzcbUViiMNXu2fwXqr-WJrTB-i8S6gs0pqi8GxWrwJKofKvoo1tFSbQw6ZbOXvXQV5ihkR716fsiLLmAo-qz00R98akIui_vGAp4_H5CySkYbUw3vTOEFAGcSFCGrpW04-YgQUho-RDQwtuYqt11k0NUNTWaYu3apgh7iBt3iB_5C9zoqXyOlb5XCd6d88-I_u8ptw0VbgNnvlf9ZZZ5EmFsqFpGm8ArOmoTfk88IIf3hq-aEfd8c5NTrz4KlN11CfRfzsxbrup_qqmYt1CyT5XtevbazkHplGWsDs70pcaydhnSVlKn9izWDTBQL_UQHJg7THY19FOGfGOguWEiOPwntvjVKemZS5v0lPM8YaPJGNml6Gk2ek4SMlHgBRsWd2KlHgnLaAQaRlw33XmeM5XK1xjB4ljjFRvUOJLl5fN_1QURSDnErg_7QYRJhUoJRdPsdW0NcH96klkFSjaMtKXYctCs19zGvmBNpfc5o32Fg7Q1wjcb4SVBnd3q0X4LY2lFFmL4Ka01fIUFTWPDTgYlcfIWWFaLmyzW4KoplPvfZc3F1B0L71hjvgncV7AObCBhNZkVZwVC_ObEWcmMM4IypdIIVJg5AEkC5NDiKFyg-hugsIhh3e3ZvmQZ2Su5H01euswa7cKQLyH4t3HISFiCa6sa9cW2A5Eplp74ymuo1rdGKqD_pEZRdZrsadlNvjeT6uj1IAiJKVtNPypANPpMA0WcmlTJkgDGure70NbW4GwptIhBFGUQl18fAeydiYS1fXjhZXKxE-uvefKSOxlHQ1d__qasKAtTejW9wG0fsXeMSXtF0f6ZKs_qfMio6y0rVsG88QGUOKX7Xctmlpm4axna4DdlshM0KpcnIDW-4GTEfzLU_u7M-EyjB7XNiubUAegso9eIZwnGJO-oLSCUv8UQCqvtrETZ_V_rWCaWndfw-fYU6qQXUsetvhoG3kBx-ka1Etc8O54FqIVfsJ4yPt5HR2u9GPZPNjTeDniqmOluR9d_vE9boXoPB8JPPF-ZDD4oPqm5UyX8V_aUn2A.IBB0WFt_Ev8pjr7LtSQ75_uGJnJ6v0EjW48fknfrmDg"

signingString="(request-target): $methodLowerCase $PATHWITHOUTQUERY\ndate: $httpDate\ndigest: $digest\nx-ing-reqid: $reqId"

signature=`printf "$signingString" | openssl dgst -sha256 -sign example_client_signing.key -passin "pass:changeit" | $base64Command`


printf "************************************************************************************** %s\n\n"

printf "signingString: $signingString %s\n\n"

printf "************************************************************************************** %s\n\n"

printf "signature: $signature %s\n\n"

printf "************************************************************************************** %s\n\n"

printf "Executing cURL command ......\n\n"

printf "************************************************************************************** %s\n\n"

printf "Response received ......\n\n"

/usr/local/bin/curl -i -X $methodUpperCase \
'https://'$HOST"$PATHWITHOUTQUERY" \
-H 'Accept: application/json, application/json, application/*+json, application/*+json' \
-H "Authorization: Bearer $bearerToken" \
-H 'Content-Length: 0' \
-H "Digest: $digest" \
-H "Date: $httpDate" \
-H "X-ING-ReqID: $reqId" \
-H 'Signature: keyId="example_client_id",algorithm="rsa-sha256",headers="(request-target) date digest x-ing-reqid",signature="'$signature'"' \
--cert example_client_tls.cer \
--key example_client_tls.key

printf "************************************************************************************** %s\n\n"
