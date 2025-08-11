import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.get("/users", (req, res) => {
    const users = readData();
    res.json(users);
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const users = readData();
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.json(user);
});

app.use(express.json());

const filePath = "./data.json";

function readData() {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    let users = readData();
    let userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    if (name) users[userIndex].name = name;
    if (age) users[userIndex].age = age;

    writeData(users);

    res.json({ message: "Ma'lumot yangilandi", user: users[userIndex] });
});

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    let users = readData();
    const newUsers = users.filter(u => u.id !== parseInt(id));

    if (users.length === newUsers.length) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    writeData(newUsers);

    res.json({ message: "Foydalanuvchi o'chirildi" });
});

app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlayapti`);
});
