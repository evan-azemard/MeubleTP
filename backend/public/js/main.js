document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM ready, début fetch email");

  const res = await fetch("/api/auth/me", { credentials: "include" });
  console.log("Status fetch:", res.statu, res);

  if (res.ok) {
    const data = await res.json();
    console.log("Email reçu :", data.email);
    document.getElementById("user-email").textContent = `Connecté en tant que : ${data.email}`;
    sessionStorage.setItem("userEmail", data.email);
  } else {
    console.log("Fetch non ok");
    document.getElementById("user-email").textContent = "Non connecté";
    sessionStorage.removeItem("userEmail");
  }
});
