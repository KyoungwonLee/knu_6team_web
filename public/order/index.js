document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("order_button")
    .addEventListener("click", function () {
      // 입력 필드에서 값 수집
      const buyerName = document.getElementById("buyer_name").value;
      const buyerPhoneNum = document.getElementById("buyer_phoneNum").value;
      const buyerEmail = document.getElementById("buyer_email").value;
      const recipientName = document.getElementById("recipient_name").value;
      const recipientAddress =
        document.getElementById("recipient_address").value;

      // 유효성 검사
      if (
        !buyerName ||
        !buyerPhoneNum ||
        !buyerEmail ||
        !recipientName ||
        !recipientAddress
      ) {
        alert("모든 필드를 입력하세요.");
        return;
      }

      // 서버로 데이터 전송
      fetch("/submit_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer_name: buyerName,
          buyer_phoneNum: buyerPhoneNum,
          buyer_email: buyerEmail,
          recipient_name: recipientName,
          recipient_address: recipientAddress,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("결제가 성공적으로 처리되었습니다.");
        })
        .catch((error) => {
          console.error("결제 처리 중 오류가 발생했습니다:", error);
        });
    });
});
