var atob = require('./atob');

class base64 {
    static decode(str) {
        var output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += "==";
                break;
            case 3:
                output += "=";
                break;
            default:
                throw "Illegal base64url string!";
        }

        try {
            return decodeURIComponent(atob(output).replace(/(.)/g, function (m, p) {
                var code = p.charCodeAt(0).toString(16).toUpperCase();
                if (code.length < 2) {
                    code = '0' + code;
                }
                return '%' + code;
            }));
        } catch (error) {
            return atob(output);
        }
    }
}

export default base64;