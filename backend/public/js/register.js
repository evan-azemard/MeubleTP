document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;
  const confirmPassword = document.getElementById('inputPasswordConfirm').value;

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Erreur serveur');
    } else {
      alert('Inscription réussie, connectez-vous');
      window.location.href = '/login';
    }
  } catch (err) {
    alert('Erreur réseau ou serveur');
    console.error(err);
  }
});
