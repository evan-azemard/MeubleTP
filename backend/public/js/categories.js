document.addEventListener("DOMContentLoaded", () => {
  const formCreate = document.getElementById("form-category-create");
  const formEdit = document.getElementById("form-category-edit");
  const categoryList = document.getElementById("categoryList");
  const editCard = document.getElementById("edit-card");

  const inputCreate = document.getElementById("categoryName");
  const inputEdit = document.getElementById("editCategoryName");
  const inputEditId = document.getElementById("editCategoryId");
  const cancelEdit = document.getElementById("cancelEdit");

  // Charger toutes les catégories
  async function loadCategories() {
    categoryList.innerHTML = "";
    const res = await fetch("/api/categories");
    const categories = await res.json();

    categories.forEach(cat => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cat.name}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" data-id="${cat._id}" data-name="${cat.name}">Modifier</button>
          <button class="btn btn-sm btn-danger" data-id="${cat._id}">Supprimer</button>
        </td>
      `;
      categoryList.appendChild(row);
    });
  }

  // Création
  formCreate.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = inputCreate.value.trim();
    if (!name) return;

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      formCreate.reset();
      loadCategories();
    } else {
      alert("Erreur lors de la création.");
    }
  });

  // Modifier
  categoryList.addEventListener("click", (e) => {
    const btn = e.target;
    if (btn.matches(".btn-warning")) {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      inputEdit.value = name;
      inputEditId.value = id;
      editCard.classList.remove("d-none");
    }
  });

  formEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = inputEditId.value;
    const name = inputEdit.value.trim();

    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      editCard.classList.add("d-none");
      formEdit.reset();
      loadCategories();
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  });

  // Annuler modif
  cancelEdit.addEventListener("click", () => {
    formEdit.reset();
    editCard.classList.add("d-none");
  });

  // Supprimer
  categoryList.addEventListener("click", async (e) => {
    const btn = e.target;
    if (btn.matches(".btn-danger")) {
      const id = btn.dataset.id;
      if (confirm("Confirmer la suppression ?")) {
        const res = await fetch(`/api/categories/${id}`, {
          method: "DELETE",
        });
        if (res.status === 204) {
          loadCategories();
        } else {
          alert("Erreur lors de la suppression.");
        }
      }
    }
  });

  loadCategories(); // initial load
});
