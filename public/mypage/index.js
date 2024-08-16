async function getUserInfo() {
  const getResult = await fetch("/api/user/me", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  if (getResult.ok) {
    const result = await getResult.json();
    return result.data;
  }
  return "";
}

async function handleTokenVerification(response) {
  if (response.isVerify) {
    console.log("Token is valid. Access granted.");
    const userInfo = await getUserInfo();

    const emailDisplay = document.getElementById("email-display");
    const nicknameDisplay = document.getElementById("nickname-display");

    emailDisplay.innerHTML = userInfo.email;
    nicknameDisplay.innerHTML = userInfo.nickname;
  } else {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    window.location.href = "/signin";
  }
}

// 페이지가 로드되었을 때 실행되는 코드
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const btn = document.getElementById("cart-btn");
    btn.addEventListener("click", () => {
      window.location.href = "/cart";
    });
    const userToken = localStorage.getItem("token");
    console.log("token", userToken);

    const sendResult = await fetch("/api/user/token", {
      method: "post",
      body: JSON.stringify({ userToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (sendResult.ok) {
      const result = await sendResult.json();
      handleTokenVerification(result);
    } else {
      console.log("유효성 검사 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
