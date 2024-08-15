/* Backend로부터 토큰이 유효한지 여부를 받아 그 여부를 프론트로 반환한다. */
function handleTokenVerification(response) {
  if (response.isVerify) {
    console.log("Token is valid. Access granted.");
  }
}

/* front --> back 토큰 전송 과정 */
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userToken = await localStorage.getItem("token");
    // console.log("token", userToken);

    // 토큰이 없을 때 (즉, 로그인을 하지 않았을 때)
    if (!userToken) {
      alert("로그인을 해주세요!");
      window.location.href = "http://localhost:7999/signin";
    }

    // 토큰을 Backend로 보내준다.
    const sendResult = await fetch("/api/user/token", {
      method: "post",
      body: JSON.stringify({ userToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 올바르게 완료되면 handleTokenVerifiation 함수를 이용하여 여부를 프론트로 전달
    if (sendResult.ok) {
      const result = await sendResult.json();
      // result = {isVerify: true }()
      handleTokenVerification(result);
    } else {
      console.log("유효성 검사 실패");
    }
  } catch (err) {
    // err 처리
  }
});

document
  .getElementById("edit-nickname-button")
  .addEventListener("click", function () {
    toggleNicknameEdit();
  });

document
  .getElementById("nickname-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      toggleNicknameEdit();
    }
  });

function toggleNicknameEdit() {
  const nicknameDisplay = document.getElementById("nickname");
  const emailDisplay = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname-input");
  const editButton = document.getElementById("edit-nickname-button");
  const cartButton = document.getElementById("cart");

  if (nicknameInput.style.display === "none") {
    nicknameInput.value = nicknameDisplay.textContent;
    nicknameDisplay.style.display = "none";
    emailDisplay.style.display = "none";
    editButton.style.display = "none";
    cartButton.style.display = "none";
    nicknameInput.style.display = "block";
    nicknameInput.focus();
  } else {
    nicknameDisplay.textContent = nicknameInput.value;
    nicknameInput.style.display = "none";
    nicknameDisplay.style.display = "block";
    emailDisplay.style.display = "block";
    editButton.style.display = "block";
    cartButton.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const orderButton = document.querySelector(".order");

  orderButton.addEventListener("click", function () {
    window.location.href = "/cart";
  });
});
