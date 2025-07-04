document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tag-create");
  const tagList = document.getElementById("tagList");

  async function loadTags() {
    const res = await fetch("/api/tags");
    const tags = await res.json();

    tagList.innerHTML = "";
    tags.forEach(tag => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tag.label}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-id="${tag._id}">Supprimer</button>
        </td>
      `;
      tagList.appendChild(row);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const label = document.getElementById("tagLabel").value.trim();

    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });

    if (res.ok) {
      form.reset();
      await loadTags();
    } else {
      alert("Erreur création tag");
    }
  });

  tagList.addEventListener("click", async (e) => {
    if (e.target.matches(".btn-danger")) {
      const id = e.target.dataset.id;
      if (confirm("Supprimer ce tag ?")) {
        const res = await fetch(`/api/tags/${id}`, { method: "DELETE" });
        if (res.status === 204) {
          await loadTags();
        } else {
          alert("Erreur suppression");
        }
      }
    }
  });

  loadTags();
});
