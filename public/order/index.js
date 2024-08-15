const buyerName = document.getElementById("buyer_name");
const buyerEmail = document.getElementById("buyer_email");
const buyerPhoneNum = document.getElementById("buyer_phoneNum");
const recipientName = document.getElementById("recipient_name");
const recipientAddress = document.getElementById("recipient_address");
const recipientPhoneNum = document.getElementById("recipient_phoneNum");

const orderButton = document.getElementById("order_button");

orderButton.addEventListener("click", async () => {
  const order = {
    buyerName: buyerName.value,
    buyerEmail: buyerEmail.value,
    buyerPhoneNum: buyerPhoneNum.value,
    recipientName: recipientName.value,
    recipientAddress: recipientAddress.value,
    recipientPhoneNum: recipientPhoneNum.value,
  };
  console.log(order);
  try {
    const orderResult = await fetch("/api/order/", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // http status code === 2XX
    if (orderResult.ok) {
      alert("결제 성공");
    } else {
      alert("(!)결제 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
