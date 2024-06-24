function extendedEuclidean(a, b) {
  // Pastikan a dan b adalah BigInt
  a = BigInt(a);
  b = BigInt(b);

  let i = BigInt(0);
  let j = BigInt(1);
  let x = BigInt(1);
  let y = BigInt(0);

  while (b !== BigInt(0)) {
    let q = a / b;

    let temp1 = a % b;
    a = b;
    b = temp1;

    let temp2 = i;
    i = x - q * i;
    x = temp2;

    let temp3 = j;
    j = y - q * j;
    y = temp3;
  }

  let arr = [x, y];
  return arr;
}

module.exports = extendedEuclidean;
