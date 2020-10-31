export function PostData(type, userData){
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let BaseUrl = 'https://www.breathconductor.com/api_v1/';

    var myHeaders = new Headers();
    myHeaders.append("device-id", "1");
    myHeaders.append("timezone", "UTC");
    myHeaders.append("device-type", "1");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "Jim2");
    urlencoded.append("password", "qwertytest");
    urlencoded.append("firebase_token", "BD43813E-CFC5-4EEB-ABE2-94562A6E76CA");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    return new Promise((resolve, reject) => {
        fetch(proxyurl + BaseUrl+type, requestOptions)
        .then((response) => response.json())
        .then((responsejson) => {
            resolve(responsejson);
        })
        .catch((error) => {
            reject(error);
        })
    })
}