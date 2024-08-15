const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../service/user.service");
const userController = require("express").Router();

/* front로부터 토큰을 전달받아 유효성을 판단하는 부분 */
userController.post("/token", (req, res) => {
  const { userToken } = req.body;
  console.log("", userToken); // token 확인
  try {
    const tokenVerify = jwt.verify(userToken, process.env.JWT_SECRET); //검증
    console.log(tokenVerify);
    if (tokenVerify) {
      return res
        .status(200)
        .json({ isVerify: true, message: "토큰이 일치합니다." });
    } else {
      return res
        .status(400)
        .json({ isVerify: false, message: "토큰이 일치하지 않습니다." });
    }
  } catch (err) {
    // err
  }
});

userController.post("/signup", async (req, res) => {
  const body = req.body;
  const email = body.email;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.json({
      result: true,
      message: "중복된 이메일이 없습니다. 회원가입 가능.",
    });
  } else {
    return res.json({
      result: false,
      message: "중복된 이메일이 있습니다. 다른 이메일로 입력하세요",
    });
  }
});

userController.post("/signin", async (req, res) => {
  const body = req.body;
  // 사용자로부터 email과 password를 받음
  const email = body.email;
  const password = body.password;
  // email 혹은 password 둘중에 하나라도 없으면? 나가라
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "(!)로그인 정보가 올바르지 않습니다." });
  }
  // email을 기준으로 DB에서 유저 데이터를 꺼내와야 한다.
  const user = await getUserByEmail(email);
  // 만약 유저 정보가 없다면 나가라.
  if (!user) {
    return res
      .status(404)
      .json({ result: false, message: "(!)회원정보가 없습니다." });
  }

  // User가 실제 있는 구간
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (isValidPassword) {
    const token = jwt.sign(
      { email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ result: true, message: "로그인 성공", token });
  } else {
    return res
      .status(400)
      .json({ result: false, message: "(!)비밀번호가 올바르지 않습니다." });
  }
});

userController.post("/", async (req, res) => {
  const { email, password, nickname } = req.body;
  console.log(req.body);

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 email 입니다." });
  }
  // 2) password 검증
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 비밀번호 형식입니다." });
  }
  // 3) nickname 검증
  if (nickname.length < 2) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 비밀번호 형식입니다." });
  }
  //  비밀번호 암호화
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = {
    email,
    nickname,
    password: hashedPassword,
  };
  try {
    await createUser(user);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

// [client] [get] /api/user/me
userController.get("/me", (req, res) => {
  try {
    const token = req.headers["authorization"];
    console.log({ token });
    const userData = jwt.decode(token);
    console.log(userData);

    return res.json({ result: true, nickname: userData.nickname });
  } catch (err) {
    console.log(err);
    return res.json({ result: false, nickname: null });
  }
});

module.exports = userController;
