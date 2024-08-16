const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinButton = document.getElementById("signin_button");

signinButton.addEventListener("click", async () => {
  const email = signinEmail.value;
  const password = signinPassword.value;
  try {
    const signinResult = await fetch("/api/user/signin", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (signinResult.ok) {
      const result = await signinResult.json();
      console.log(result);
      localStorage.setItem("token", result.token);
      // 로그인 후 메인 페이지로 이동
      window.location.href = "/";
    } else {
      alert("(!)로그인 오류");
    }
  } catch (err) {
    console.error(err);
    alert("(!) 로그인 오류");
  }
});
