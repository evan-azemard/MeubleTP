document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-company-create");
  const input = document.getElementById("companyName");
  const tableBody = document.getElementById("companyList");

  // Charger les entreprises
  async function loadCompanies() {
    const res = await fetch("/api/companies");
    const companies = await res.json();

    tableBody.innerHTML = "";
    companies.forEach(comp => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${comp.name}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-id="${comp._id}">Supprimer</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Créer une entreprise
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;

    const res = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.status === 409) {
      alert("Nom déjà utilisé");
    } else if (res.ok) {
      form.reset();
      loadCompanies();
    } else {
      alert("Erreur lors de la création");
    }
  });

  // Supprimer une entreprise
  tableBody.addEventListener("click", async (e) => {
    if (e.target.matches(".btn-danger")) {
      const id = e.target.dataset.id;
      if (confirm("Supprimer cette entreprise ?")) {
        const res = await fetch(`/api/companies/${id}`, {
          method: "DELETE",
        });
        if (res.status === 204) {
          loadCompanies();
        } else {
          alert("Erreur suppression");
        }
      }
    }
  });

  loadCompanies();
});
