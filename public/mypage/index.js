// 토큰 유효성 검사 함수
async function getUserNickname() {
  const getResult = await fetch("/api/user/me", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  if (getResult.ok) {
    const result = await getResult.json();
    const nickname = result.nickname;
    return nickname;
  }
  return "";
}

async function handleTokenVerification(response) {
  if (response.isVerify) {
    console.log("Token is valid. Access granted.");
    const nickname = await getUserNickname();
    console.log(nickname);
    const nicknameDisplay = document.getElementById("nickname-display");
    nicknameDisplay.innerHTML = nickname;
  } else {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    window.location.href = "http://localhost:7999/signin";
  }
}

// 페이지가 로드되었을 때 실행되는 코드
window.addEventListener("DOMContentLoaded", async () => {
  try {
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

    // localStorage에서 닉네임을 가져와서 표시
    const nicknameDisplay = document.getElementById("nickname-display");
    // const storedNickname = localStorage.getItem("nickname");

    // if (storedNickname) {
    // nicknameDisplay.textContent = storedNickname;
    // }
  } catch (err) {
    console.error(err);
  }
});

// 닉네임 수정 관련 코드
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
  const nicknameDisplay = document.getElementById("nickname-display");
  const nicknameInput = document.getElementById("nickname-input");

  if (nicknameInput.style.display === "none") {
    nicknameInput.value = nicknameDisplay.textContent;
    nicknameDisplay.style.display = "none";
    nicknameInput.style.display = "block";
    nicknameInput.focus();
  } else {
    const newNickname = nicknameInput.value;
    nicknameDisplay.textContent = newNickname;
    // localStorage.setItem("nickname", newNickname);

    nicknameInput.style.display = "none";
    nicknameDisplay.style.display = "block";
  }
}

// 장바구니 버튼 클릭 시 장바구니 페이지로 이동
document.addEventListener("DOMContentLoaded", function () {
  const orderButton = document.querySelector(".order");

  orderButton.addEventListener("click", function () {
    window.location.href = "/cart";
  });
});
