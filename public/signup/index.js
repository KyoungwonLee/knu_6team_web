const signupEmail = document.getElementById("signup_email");
const signupPassword = document.getElementById("signup_password");
const signupNickname = document.getElementById("signup_nickname");

const signupButton = document.getElementById("signup_button");

const fetchUser = async (email) => {
  const check = await fetch("/api/user/signup", {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (check.ok) {
    const result = await check.json();
    return result;
  }
};

signupButton.addEventListener("click", async () => {
  const user = {
    email: signupEmail.value,
    password: signupPassword.value,
    nickname: signupNickname.value,
  };

  const v = await fetchUser(user["email"]);
  console.log(v.result);

  // 중복된 이메일이 없을 때
  if (v.result) {
    try {
      const signupResult = await fetch("/api/user/", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (signupResult.ok) {
        alert("회원가입 성공");
        // 회원가입 후 로그인 페이지로 이동
        window.location.href = "http://localhost:7999/signin";
      } else {
        alert("(!)회원가입 실패");
      }
    } catch (err) {
      console.error(err);
    }
  }
  // 중복된 이메일이 있을 때
  else {
    alert("이메일이 이미 사용 중입니다. 다른 이메일을 입력해주세요.");
    window.location.href = "http://localhost:7999/signup";
  }
});
