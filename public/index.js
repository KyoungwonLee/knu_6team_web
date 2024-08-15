window.addEventListener("load", () => {
  console.log("메인 페이지 로딩 완료.");
});

// 로그인 화면 이동
document.getElementById("move_sign_in").onclick = function () {
  window.location.href = "http://localhost:7999/signin";
};

// 마이페이지 이동
document.getElementById("move_my_page").onclick = function () {
  window.location.href = "http://localhost:7999/mypage";
};

// 회원가입 화면 이동
document.getElementById("move_sign_up").onclick = function () {
  window.location.href = "http://localhost:7999/signup";
};

// 상품 리스트 화면 이동
document.getElementById("move_product").onclick = function () {
  window.location.href = "http://localhost:7999/product";
};

// 로그인 상태 체크
const token = localStorage.getItem("token");
if (token) {
  document.getElementById("move_sign_in").style.display = "none";
  document.getElementById("move_sign_up").style.display = "none";
  document.getElementById("logout_button").style.display = "inline-block";
  document.getElementById("move_my_page").style.display = "inline-block";
} else {
  document.getElementById("move_sign_in").style.display = "inline-block";
  document.getElementById("move_sign_up").style.display = "inline-block";
  document.getElementById("move_my_page").style.display = "none";
}

document.getElementById("logout_button").onclick = function () {
  localStorage.removeItem("token");

  window.location.href = "http://localhost:7999/";
};
