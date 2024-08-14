window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료.");
});

// 초기 로그인 코드
/* const emailInput = document.getElementById("user_email");
const passwordInput = document.getElementById("user_password");
const loginButton = document.getElementById("login_button");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log(email, password);

  const fetchLogin = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchLogin.ok) {
    const loginResult = await fetchLogin.json();
    console.log(loginResult);
  }
}); */

//  로그인 화면 이동
const moveSignin = (document.getElementById("move_sign_in").onclick =
  function () {
    window.location.href = "http://localhost:7999/signin";
  });
//  마이페이지 이동
const moveMypage = (document.getElementById("move_my_page").onclick =
  function () {
    window.location.href = "http://localhost:7999/mypage";
  });

//  회원가입
const moveSignup = (document.getElementById("move_sign_up").onclick =
  function () {
    window.location.href = "http://localhost:7999/signup";
  });
//로그인 화면 이동
document.getElementById("move_sign_in").onclick = function () {
  window.location.href = "http://localhost:7999/signin";
};

//마이페이지 이동
document.getElementById("move_my_page").onclick = function () {
  window.location.href = "http://localhost:7999/mypage";
};

// 회원가입
document.getElementById("move_sign_up").onclick = function () {
  window.location.href = "http://localhost:7999/signuop";
};
