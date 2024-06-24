const crt = require("../utils/chineseRemainderTherem");

function rabinPEncrypt(message, p, q) {
  q = BigInt(q);
  n = p * q;
  let ciphertextArr = [];
  for (i = 0; i < message.length / 3; i++) {
    let text = message.slice(i * 3, (i + 1) * 3);
    let ciphertext = [];
    for (j = 0; j < text.length; j++) {
      let m = text[j].charCodeAt(0).toString(2).padStart(8, "0");
      ciphertext.push(m);
    }
    ciphertext = ciphertext.join("");
    ciphertext += ciphertext;
    ciphertext = BigInt(parseInt(ciphertext, 2));
    ciphertext = (ciphertext * ciphertext) % n;
    ciphertextArr.push(ciphertext);
  }
  return ciphertextArr;
}

function rabinPDecrypt(ciphertext, p, q) {
  n = p * q;
  messageArr = [];
  for (i = 0; i < ciphertext.length; i++) {
    let message = crt(ciphertext[i], p, q);
    for (j = 0; j < message.length; j++) {
      let binerMessege = message[j].toString(2).padStart(48, "0");
      if (binerMessege.length % 2 == 0) {
        let middleIndex = Math.floor(binerMessege.length / 2);
        let firstHalf = binerMessege.slice(0, middleIndex);
        let lastHalf = binerMessege.slice(middleIndex);
        if (firstHalf == lastHalf) {
          for (let k = 0; k < 3; k++) {
            let text = firstHalf.slice(k * 8, (k + 1) * 8);
            messageArr.push(String.fromCharCode(parseInt(text, 2)));
          }
        }
      }
    }
  }
  return messageArr;
}

// console.log(rabinPEncrypt("satrahspo", 925789379n, 904318643n));
// console.log(rabinPDecrypt(177822979953799282n, 925789379n, 904318643n));

// a = 2000000000000179;
// b = a.toString(2);
// console.log(b.length);

module.exports = { rabinPEncrypt, rabinPDecrypt };
