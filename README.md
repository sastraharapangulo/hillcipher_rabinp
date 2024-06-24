## PENGAMANAN DATABASE FIELD-LEVEL ENCRYPTION MENGGUNAKAN HYBRID CRYPTOSYSTEM ALGORITMA HILL CIPHER DAN ALGORITMA RABIN P

Sastra Harapan Gulo

201401066


PROGRAM STUDI S1 ILMU KOMPUTER

FAKULTAS ILMU KOMPUTER DAN TEKNOLOGI  INFORMASI

UNIVERSITAS SUMATERA UTARA

MEDAN

2024

## Penggunaan Library

### Install Library
Untuk penggunaan library dalam pengamanan database, lakukan penginstalan library pada proyek node.js anda dengan menggunakan
```gradle
npm intasll hillcipher_rabinp
```
### Import Fungsi
Setelah instalasi library, anda haru memanggil fungsi yang tersedia dalam library terlebih dahulu yakni {encrypt, decrypt}.

fungsi encrypt digunakan untuk enkripsi data agar sulit dimengerti sbelum disimpan ke databse, fungsi decrypt digunakan untuk dekripsi data dari database agar kembali kebentuk semua.
```gradle
const { encrypt, decrypt } = require("hillcipher_rabinp");
```

## #Kunci Algoritma Rabin P
Siapkanlah kunci privat (p dan q) algoritma Rabin P dengan syarat `p,q adalah bil. prima dan p ≠ q → p ≡ q ≡ 3 mod 4`.

Kunci dapat disimpan dalam file enviromen variabel `.env` untuk keamanan

### Contoh Data
```gradle
{
    "soal": "Kunci enkripsi yang sama dengan proses dekripsi disebut?",
    "pilihana": "password",
    "pilihanb": "simetri",
    "pilihanc": "asimetri",
    "jawaban": "b"
}
```

### Creta Data
Berikut adalah contoh penggunaan fungsi encrypt untuk membuat data baru dalam database
```gradle
create(req, res) {
    data = {
      soal: req.body.soal,
      pilihana: req.body.pilihana,
      pilihanb: req.body.pilihanb,
      pilihanc: req.body.pilihanc,
      jawaban: req.body.jawaban,
    };
    encrypData = encryp(data, 925789379n, 904318643n);
    console.log(encrypData);

    Soal.create(encrypData)
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(201).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
```
### List Data
Berikut adalah contoh penggunaan fungsi decrypt untuk menampilkan data dari database
```gradle
list(req, res) {
    SoalBaru.findAll()
      .then((soal) => {
        soal.forEach((soals) => {
          data = {
            soal: soals.soal,
            pilihana: soals.pilihana,
            pilihanb: soals.pilihanb,
            pilihanc: soals.pilihanc,
            jawaban: soals.jawaban,
            key: soals.key,
          };

          dataDecrypt = decrypt(data, KEY_RABINP_P, KEY_RABINP_Q);

          Object.assign(soals, dataDecrypt);
        });
        res.status(200).json({
          status: "OK",
          data: {
            soal,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
```

### Update Kunci Rabin P
Berikut adalah contoh untuk memperbaharui kunci Rabin P yang digunakan
```gradle
rabinPKeyUpdate(req, res) {
    Soal.findAll()
      .then((soal) => {
        soal.forEach((soals) => {
          data = {
            soal: soals.soal,
            pilihana: soals.pilihana,
            pilihanb: soals.pilihanb,
            pilihanc: soals.pilihanc,
            jawaban: soals.jawaban,
            key: soals.key,
          };

          dataDecrypt = decrypt(data, KEY_RABINP_P, KEY_RABINP_Q);
          delete dataDecrypt.key;
          dataEncrypt = encryp(dataDecrypt, KEY_RABINP_P_NEW, KEY_RABINP_Q_NEW);
          Object.assign(data, dataEncrypt);
          data.id = soals.id;
          console.log(data);
          SoalBaru.create(data)
            .then((post) => {
              soals = data;
            })
            .catch((err) => {
              res.status(201).json({
                status: "FAIL",
                message: err.message,
              });
            });
        });
        res.status(201).json({
          status: "OK",
          data: soal,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
```
