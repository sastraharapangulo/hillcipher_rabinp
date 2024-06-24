function extendedEuclidean(a, b) {
  let i = 0;
  let j = 1;
  let x = 1;
  let y = 0;

  while (b !== 0) {
    let q = Math.floor(a / b);
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

function toMatrix(text) {
  let k = 0;
  textMatrix = [];
  for (i = 0; i < Math.ceil(text.length / 3); i++) {
    textMatrix[i] = new Array(3);
    for (j = 0; j < 3; j++) {
      textMatrix[i][j] = (text[k] ?? "\0").charCodeAt(0) % 256;
      k++;
    }
  }
  return textMatrix;
}

function matrixMult(matrixA, matrixB) {
  matrixMultArr = [];
  for (i = 0; i < matrixA.length; i++) {
    matrixMultArr[i] = new Array(3);
    for (j = 0; j < 3; j++) {
      matrixMultArr[i][j] = 0;
      for (x = 0; x < 3; x++) {
        matrixMultArr[i][j] += matrixA[i][x] * matrixB[x][j];
      }
      matrixMultArr[i][j] = matrixMultArr[i][j] % 256;
    }
  }
  return matrixMultArr;
}

function transposeMatrix(matrix) {
  transpose = [];
  for (i = 0; i < 3; i++) {
    transpose[i] = new Array(3);
    for (j = 0; j < 3; j++) {
      transpose[i][j] = matrix[j][i];
    }
  }
  return transpose;
}

function determinantMinor(matrix, row, col) {
  const subMatrix = matrix
    .filter((_, r) => r !== row)
    .map((r) => r.filter((_, c) => c !== col));

  return subMatrix[0][0] * subMatrix[1][1] - subMatrix[0][1] * subMatrix[1][0];
}

function cofactorMatrix(matrix) {
  const cofMatrix = Array.from({ length: 3 }, () => Array(3).fill(0));

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const minorDet = determinantMinor(matrix, i, j);
      cofMatrix[i][j] = (((Math.pow(-1, i + j) * minorDet) % 256) + 256) % 256; // Terapkan modul 256
    }
  }
  return cofMatrix;
}

function getDetMatrix(matrix) {
  let cofMatrix = cofactorMatrix(matrix);
  let detMatrix =
    (matrix[0][0] * cofMatrix[0][0] +
      matrix[1][0] * cofMatrix[1][0] +
      matrix[2][0] * cofMatrix[2][0]) %
    256;
  return detMatrix;
}

function inversMatrix(matrix) {
  let adjMatrix = transposeMatrix(cofactorMatrix(matrix));
  let detMatrix = getDetMatrix(matrix);
  let invDetMatrix = extendedEuclidean(detMatrix, 256);

  let invMatrix = new Array(3);
  for (i = 0; i < 3; i++) {
    invMatrix[i] = new Array(3);
    for (j = 0; j < 3; j++) {
      invMatrix[i][j] =
        (((invDetMatrix[0] * adjMatrix[i][j]) % 256) + 256) % 256;
    }
  }
  return invMatrix;
}

module.exports = { toMatrix, matrixMult, inversMatrix, getDetMatrix };
