  async function loadData() {
      const res = await fetch('/api/furnitures');
      const furnitures = await res.json();
      return furnitures.length;
    }

    async function renderChart() {
      const total = await loadData();

      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Meubles'],
          datasets: [{
            label: 'Nombre total',
            data: [total],
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true, precision: 0 }
          }
        }
      });
    }

    renderChart();
