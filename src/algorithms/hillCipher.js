const {
  toMatrix,
  matrixMult,
  inversMatrix,
} = require("../utils/operationMatrix");

function hillCipherEncrypt(message, key) {
  messageMatrix = toMatrix(message);
  keyMatrix = toMatrix(key);

  let ciphertextMatrixArr = matrixMult(messageMatrix, keyMatrix);
  let ciphertextArr = [];

  ciphertextMatrixArr.map((ciphertextMatrix) => {
    for (i = 0; i < 3; i++) {
      ciphertextArr.push(ciphertextMatrix[i]);
    }
  });

  let ciphertext = ciphertextArr.join("/");

  return ciphertext;
}

function hillCipherDecrypt(ciphertext, key) {
  let cipherText = ciphertext.split("/");
  let ciphertextMatrix = [];
  let k = 0;
  for (i = 0; i < Math.ceil(cipherText.length / 3); i++) {
    ciphertextMatrix[i] = new Array(3);
    for (j = 0; j < 3; j++) {
      ciphertextMatrix[i][j] = cipherText[k];
      k++;
    }
  }

  let keyMatrix = toMatrix(key);
  // console.log(keyMatrix);
  let invMatrix = inversMatrix(keyMatrix);
  // console.log(invMatrix);

  let messageMatrixArr = matrixMult(ciphertextMatrix, invMatrix);

  let messageArr = "";

  messageMatrixArr.map((message) => {
    for (i = 0; i < 3; i++) {
      if (message[i] != 0) {
        messageArr += String.fromCharCode(message[i]);
      }
    }
  });

  return messageArr;
}

module.exports = { hillCipherEncrypt, hillCipherDecrypt };
