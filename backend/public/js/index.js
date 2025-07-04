    async function loadFurniture() {
      try {
        const res = await fetch('/api/furnitures');
        if (!res.ok) throw new Error('Erreur ' + res.status);
        const furnitures = await res.json();

        const tbody = document.getElementById('furnitureList');
        tbody.innerHTML = '';

        furnitures.forEach(f => {
          const tr = document.createElement('tr');

          const materialsText = f.materials
            .map(m => `${m.materialId?.name || '??'} (${m.quantityUsed})`)
            .join(', ');

          const tagsText = f.tags.map(t => t.label || '??').join(', ');

          tr.innerHTML = `
            <td>${f.name}</td>
            <td>${f.category?.name || '-'}</td>
            <td>${f.quantity}</td>
            <td>${materialsText}</td>
            <td>${tagsText}</td>
          `;
          tbody.appendChild(tr);
        });
      } catch (e) {
        alert('Erreur chargement meubles : ' + e.message);
      }
    }

    document.addEventListener('DOMContentLoaded', loadFurniture);