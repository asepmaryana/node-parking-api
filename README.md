# NodejsParkingAPI

Aplikasi REST-API parkir berbasis NodeJS, ExpressJS, MySQL dan JSON Web Token (JWT)

## Setting database

Lakukan pembuatan database pada MySQL yang dilanjutkan dengan melakukan import file sql kedalam database yang baru dibuat.
File tersebut yaitu :
1. schema.sql
2. data.sql

## Ubah variable environment

Lakukan perubahan setting sesuai dengan account database yang akan digunakan pada file `.env` :

APP_PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=ptba
JWT_SECRET=parkir2020
SALT_LENGTH=10

## Install library nodejs

Jalankan perintah `npm install` pada command prompt untuk mendownload semua library yang diperlukan

## Running aplikasi

Jalankan perintah `node main.js` pada command prompt sampai ada pesan muncul seperti berikut :

Server started on port 3000 ...
MySQL Connected.

Jika sudah tampil pesan tersebut, server aplikasi sudah siap diakses dari client.
