document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('inputEmail').value.trim();
  const password = document.getElementById('inputPassword').value;

  if (!email || !password) {
    alert("Merci de remplir tous les champs.");
    return;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erreur lors de la connexion");
      return;
    }

    alert("Connexion réussie !");
    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert("Erreur réseau, réessayez plus tard.");
  }
});
