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
