const signupEmail = document.getElementById("signup_email");
const signupPassword = document.getElementById("signup_password");
const signupNickname = document.getElementById("signup_nickname");

const signupButton = document.getElementById("signup_button");

signupButton.addEventListener("click", async () => {
  const user = {
    email: signupEmail.value,
    password: signupPassword.value,
    nickname: signupNickname.value,
  };
  console.log(user);
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

      // 회원가입 후 닉네임을 localStorage에 저장
      localStorage.setItem("nickname", user.nickname);

      // 회원가입 후 로그인 페이지로 이동
      window.location.href = "http://localhost:7999/signin";
    } else {
      alert("(!)회원가입 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
