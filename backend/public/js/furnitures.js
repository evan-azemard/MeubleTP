document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-furniture-create");
  const nameInput = document.getElementById("furnitureName");
  const qtyInput = document.getElementById("furnitureQty");
  const categorySelect = document.getElementById("furnitureCategory");
  const tagSelect = document.getElementById("furnitureTags");
  const materialsSection = document.getElementById("materialsSection");
  const furnitureList = document.getElementById("furnitureList");

  let allMaterials = [];

  async function loadOptions() {
    const [categories, tags, materials] = await Promise.all([
      fetch("/api/categories").then(res => res.json()),
      fetch("/api/tags").then(res => res.json()),
      fetch("/api/materials").then(res => res.json()),
    ]);

    // Catégories
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat._id;
      opt.textContent = cat.name;
      categorySelect.appendChild(opt);
    });

    // Tags
    tags.forEach(tag => {
      const opt = document.createElement("option");
      opt.value = tag._id;
      opt.textContent = tag.name;
      tagSelect.appendChild(opt);
    });

    allMaterials = materials;
    updateMaterialSelects();
  }

  function updateMaterialSelects() {
    const selects = materialsSection.querySelectorAll(".material-select");
    selects.forEach(select => {
      select.innerHTML = "";
      allMaterials.forEach(mat => {
        const opt = document.createElement("option");
        opt.value = mat._id;
        opt.textContent = mat.name;
        select.appendChild(opt);
      });
    });
  }

  document.getElementById("addMaterial").addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "row g-2 mb-2";
    row.innerHTML = `
      <div class="col-md-6">
        <select class="form-select material-select"></select>
      </div>
      <div class="col-md-4">
        <input type="number" class="form-control material-qty" placeholder="Quantité utilisée" min="1" />
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-danger remove-material">Supprimer</button>
      </div>
    `;
    materialsSection.appendChild(row);
    updateMaterialSelects();
  });

  materialsSection.addEventListener("click", (e) => {
    if (e.target.matches(".remove-material")) {
      e.target.closest(".row").remove();
    }
  });

  // Soumission du formulaire
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const materials = Array.from(materialsSection.querySelectorAll(".row")).map(row => {
      const materialId = row.querySelector(".material-select").value;
      const quantityUsed = parseInt(row.querySelector(".material-qty").value);
      return { materialId, quantityUsed };
    });

    const payload = {
      name: nameInput.value.trim(),
      quantity: parseInt(qtyInput.value),
      category: categorySelect.value,
      tags: Array.from(tagSelect.selectedOptions).map(opt => opt.value),
      materials,
    };

    const res = await fetch("/api/furnitures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      form.reset();
      furnitureList.innerHTML = "";
      await loadFurniture();
    } else {
      alert("Erreur création meuble");
    }
  });

  async function loadFurniture() {
    const res = await fetch("/api/furnitures");
    const furnitures = await res.json();

    furnitureList.innerHTML = "";
    furnitures.forEach(f => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${f.name}</td>
        <td>${f.category?.name || "-"}</td>
        <td>${f.quantity}</td>
        <td>${f.materials.map(m => `${m.materialId?.name} (${m.quantityUsed})`).join(", ")}</td>
        <td>${f.tags.map(t => t.name).join(", ")}</td>
        <td><button class="btn btn-sm btn-danger" data-id="${f._id}">Supprimer</button></td>
      `;
      furnitureList.appendChild(row);
    });
  }

  furnitureList.addEventListener("click", async (e) => {
    if (e.target.matches(".btn-danger")) {
      const id = e.target.dataset.id;
      if (confirm("Confirmer suppression ?")) {
        const res = await fetch(`/api/furnitures/${id}`, {
          method: "DELETE",
        });
        if (res.status === 204) {
          await loadFurniture();
        } else {
          alert("Erreur suppression");
        }
      }
    }
  });

  loadOptions();
  loadFurniture();
});
