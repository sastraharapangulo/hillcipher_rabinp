const extendedEuclidean = require("./extendedEuclidean");

function modExp(base, exp, mod) {
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);

  if (mod === BigInt(1)) return BigInt(0);
  let result = BigInt(1);
  base = base % mod;

  while (exp > 0) {
    if (exp % BigInt(2) === BigInt(1)) {
      result = (result * base) % mod;
    }
    exp = exp >> BigInt(1);
    base = (base * base) % mod;
  }

  return result;
}

function mp_mq(c, p, q) {
  x = (p + 1n) / 4n;
  y = (q + 1n) / 4n;
  mp = modExp(c, x, p);
  mq = modExp(c, y, q);
  arr = [mp, mq];
  return arr;
}

function crt(c, p, q) {
  inv = extendedEuclidean(p, q);
  p = BigInt(p);
  q = BigInt(q);
  c = BigInt(c);
  n = p * q;
  m = mp_mq(c, p, q);

  v = BigInt(inv[0]) * p * m[1];
  w = BigInt(inv[1]) * q * m[0];

  r = (((v + w) % n) + n) % n;
  s = (((v - w) % n) + n) % n;
  t = (((-v + w) % n) + n) % n;
  u = (((-v - w) % n) + n) % n;

  arr = [r, s, t, u];
  return arr;
}

module.exports = crt;
