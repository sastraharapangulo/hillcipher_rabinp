const generateKeyBBS = require("./utils/blumBlumShub");
const {
  hillCipherEncrypt,
  hillCipherDecrypt,
} = require("./algorithms/hillCipher");
const { rabinPEncrypt, rabinPDecrypt } = require("./algorithms/rabinP");
const validateKeyRabinP = require("./utils/keyValidator");

function encryp(datas, p, q) {
  const startTime = performance.now();
  const keyValid = validateKeyRabinP(p, q);
  if (!keyValid) {
    throw new Error(
      "p & q harus bilangan prima dengan syarat p ≠ q → p ≡ q ≡ 3 mod 4."
    );
  }
  const key = generateKeyBBS(p, q);

  const startTime2 = performance.now();
  function splitData(datas) {
    for (const data in datas) {
      if (typeof datas[data] == "object") {
        splitData(datas[data]);
      } else {
        datas[data] = String(datas[data]);
        datas[data] = hillCipherEncrypt(datas[data], key);
      }
    }
  }
  splitData(datas);
  const endTime2 = performance.now();
  const executionTime2 = endTime2 - startTime2;

  console.log(`Execution time hill: ${executionTime2} ms`);
  const startTime3 = performance.now();
  let ciphertext = rabinPEncrypt(key, p, q);
  datas.key = ciphertext.join("/");
  const endTime = performance.now();
  const executionTime3 = endTime - startTime3;

  console.log(`Execution time rabin: ${executionTime3} ms`);

  return datas;
}

function decrypt(datas, p, q) {
  const startTime = performance.now();
  const keyValid = validateKeyRabinP(p, q);
  if (!keyValid) {
    throw new Error(
      "p & q harus bilangan prima dengan syarat p ≠ q → p ≡ q ≡ 3 mod 4."
    );
  }

  let datasKey = datas.key.split("/");
  let key = rabinPDecrypt(datasKey, p, q);
  const endTime = performance.now();

  const executionTime = endTime - startTime;

  console.log(`Execution time: ${executionTime} ms`);
  const startTime2 = performance.now();
  function splitData(datas) {
    for (const data in datas) {
      if (data === "key") {
        continue;
      }
      if (typeof datas[data] == "object") {
        splitData(datas[data]);
      } else {
        datas[data] = hillCipherDecrypt(datas[data], key);
      }
    }
  }
  splitData(datas);
  const endTime2 = performance.now();
  const executionTime2 = endTime2 - startTime2;

  console.log(`Execution time2: ${executionTime2} ms`);

  return datas;
}

module.exports = { encryp, decrypt };
