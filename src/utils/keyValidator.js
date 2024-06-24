function isPrime(num) {
  if (num <= 1n) return false;
  if (num <= 3n) return true;

  if (num % 2n === 0n || num % 3n === 0n) return false;
  for (let i = 5n; i * i <= num; i += 6n) {
    if (num % i === 0n || num % (i + 2n) === 0n) return false;
  }
  return true;
}

function validateKeyRabinP(p, q) {
  if (p == q) {
    return false;
  }
  let keyP = isPrime(BigInt(p));
  let keyQ = isPrime(BigInt(q));
  console.log(keyP, keyQ);

  if (keyP != true || keyQ != true) {
    return false;
  }

  return true;
}

module.exports = validateKeyRabinP;
