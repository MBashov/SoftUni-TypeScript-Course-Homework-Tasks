type httpResponseType = {
    code: 200 | 201 | 400 | 404 | 500,
    text: string,
    printChars?: number
}

function httpsCodes(httpResponse: httpResponseType) {

    if (httpResponse.printChars) {
        return console.log(httpResponse.text.slice(0, httpResponse.printChars));
    }

    console.log(httpResponse.text);
}

httpsCodes({ code: 200, text: 'OK' });
httpsCodes({ code: 201, text: 'Created' });
httpsCodes({ code: 400, text: 'Bad Request', printChars: 4 });
httpsCodes({ code: 404, text: 'Not Found' });
httpsCodes({ code: 404, text: 'Not Found', printChars: 3 });
httpsCodes({ code: 500, text: 'Internal Server Error', printChars: 1 });