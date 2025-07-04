document.addEventListener("DOMContentLoaded", () => {
  const formCreate = document.getElementById("form-material-create");
  const inputName = document.getElementById("materialName");
  const inputType = document.getElementById("materialType");
  const selectCompany = document.getElementById("materialCompany");
  const materialList = document.getElementById("materialList");

  // Charger les compagnies dans le select
  async function loadCompanies() {
    const res = await fetch("/api/companies");
    const companies = await res.json();

    selectCompany.innerHTML = '<option value="">Choisir une compagnie</option>';
    companies.forEach(company => {
      const opt = document.createElement("option");
      opt.value = company._id;
      opt.textContent = company.name;
      selectCompany.appendChild(opt);
    });
  }

  // Charger les matériaux
  async function loadMaterials() {
    materialList.innerHTML = "";
    const res = await fetch("/api/materials");
    const materials = await res.json();

    materials.forEach(mat => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${mat.name}</td>
        <td>${mat.type}</td>
        <td>${mat.company?.name || "N/A"}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-id="${mat._id}">Supprimer</button>
        </td>
      `;
      materialList.appendChild(row);
    });
  }

  // Création d’un matériau
  formCreate.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    const type = inputType.value.trim();
    const company = selectCompany.value;

    if (!name || !type || !company) {
      alert("Tous les champs sont requis");
      return;
    }

    const res = await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, company }),
    });

    if (res.status === 409) {
      alert("Nom de matériau déjà utilisé");
    } else if (res.ok) {
      formCreate.reset();
      await loadMaterials();
    } else {
      alert("Erreur création matériau");
    }
  });

  // Suppression
  materialList.addEventListener("click", async (e) => {
    if (e.target.matches(".btn-danger")) {
      const id = e.target.dataset.id;
      if (confirm("Confirmer la suppression ?")) {
        const res = await fetch(`/api/materials/${id}`, {
          method: "DELETE",
        });
        if (res.status === 204) {
          await loadMaterials();
        } else {
          alert("Erreur lors de la suppression");
        }
      }
    }
  });

  // Initialisation
  loadCompanies();
  loadMaterials();
});
