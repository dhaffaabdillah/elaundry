var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");


module.exports = {
    crypt(items){
        return SHA256(items).toString();
    }
}
