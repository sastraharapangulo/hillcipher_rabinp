const { toMatrix, getDetMatrix } = require("./operationMatrix");

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function isCoprime(a, b) {
  return gcd(a, b) === 1;
}

function generateRandomSeed(n) {
  let seed;
  do {
    seed = Math.floor(Math.random() * (n - 1)) + 1; // Bilangan acak antara 1 dan n-1
  } while (!isCoprime(seed, n)); // Ulangi jika tidak relatif prima dengan `n`
  return seed;
}

function generateKeyBBS() {
  let startTime = performance.now();
  let n = 547 * 571;
  let s = generateRandomSeed(n);
  let key = [];
  let x = (s * s) % n;
  let i = 0;
  let det = 1;
  do {
    i++;
    if (i > 5) {
      s = generateRandomSeed(n);
      x = (s * s) % n;
      i = 0;
    }
    for (i = 0; i < 9; i++) {
      x = (x * x) % n;
      if (x % 256 == 0) {
        x = (x * x) % n;
      }
      key[i] = String.fromCharCode(x % 256);
    }
    keyMatrix = toMatrix(key);
    det = getDetMatrix(keyMatrix);
  } while (det === 0 || !isCoprime(det, 256));
  let endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Execution BBS: ${executionTime} ms`);
  return key;
}

module.exports = generateKeyBBS;
