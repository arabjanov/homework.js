terminal:
1 pnpm dev
Server 3000-portda ishlayapti

Postman:

get http://localhost:3000/user/1
id:1 malumoti
get http://localhost:3000/users
barcha user parametirlari

Put:http://localhost:3000/user/1
namuna
{
  "name": "Xojiakbar",
  "age": 17
}
natija:
{
    "message": "Ma'lumot yangilandi",
    "user": {
        "id": 1,
        "name": "Xojiakbar",
        "age": 17
    }
}
Delete:http://localhost:3000/user/1
{
    "message": "Foydalanuvchi o'chirildi"
}

