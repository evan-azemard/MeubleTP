document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("#logout");
  logoutBtn.addEventListener("click", async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      alert("Déconnecté");
      window.location.href = "/login";
    } else {
      alert("Erreur lors de la déconnexion");
    }
  });
});
