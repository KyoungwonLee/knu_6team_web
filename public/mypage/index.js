function handleTokenVerification(response) {
  if (response.isVerify) {
    console.log("Token is valid. Access granted.");
  } else {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    window.location.href = "http://localhost:7999/signin";
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userToken = await localStorage.getItem("token");
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
      // result = {isVerify: true }()
      handleTokenVerification(result);
    } else {
      console.log("유효성 검사 실패");
    }
  } catch (err) {}
});
