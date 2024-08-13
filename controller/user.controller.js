const bcrypt = require("bcryptjs");
const { createUser } = require("../service/user.service");
const userController = require("express").Router();

userController.post("/", async (req, res) => {
    const { email, password, nickname } = req.body;
    // const email = req.body.email;

    // 1) email 검증
    if (!email.includes("@")) {
        return res
        .status(400)
        .json({ isError: true, message: "잘못된 email 입니다." });
    }

    // 2) password 검증
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if(!passwordRegex.test(password)) {
        return res
        .status(400)
        .json({ isError: true, mexxage: "잘못된 password 입니다. "});
    }


    // 3) nickname 검증
    if (nickname.length < 2) {
        return res
        .status(400)
        .json({ isError: true, message: "잘못된 nickname 입니다." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
        email,
        nickname,
        // email: email,
        // nickname = nickname,
        password: hashedPassword
    };
    try{
        await createUser(user);
        return true;
    } catch (err) {
        return false;
    }
});

// 404 NotFound
// 400 BadRequest
// 401 Unauthorized

module.exports = userController;