document.addEventListener("DOMContentLoaded", function () {

    // *========== Load Google Charts ==========
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        const chartContainer = document.getElementById('department_chart');
        if (!chartContainer) return; // Safety check

        var data = google.visualization.arrayToDataTable([
            ['Division', 'Population'],
            ['Students', 708],
            ['Teaching Staff', 180],
            ['Non-Teaching Staff', 120],
            ['Others', 80]
        ]);

        const options = {
            is3D: false,
            backgroundColor: 'transparent',
            colors: ['#0b7b09', '#030303', '#225405', '#6dc36d'],
            fontName: 'Poppins',
            fontSize: 14,
            legend: 'none',
            tooltip: { textStyle: { color: '#030303' } },
            chartArea: { width: '80%', height: '80%' }
        };

        const chart = new google.visualization.PieChart(chartContainer);
        chart.draw(data, options);

        // ========== Custom Legend ==========
        const legendData = [
            { label: 'Students', value: 708, color: '#0b7b09' },
            { label: 'Teaching Staff', value: 180, color: '#030303' },
            { label: 'Non-Teaching Staff', value: 120, color: '#225405' },
            { label: 'Others', value: 80, color: '#6dc36d' }
        ];

        const total = legendData.reduce((sum, item) => sum + item.value, 0);
        const totalEl = document.getElementById('legend_total');
        const legend = document.getElementById('custom_legend');

        if (totalEl) totalEl.textContent = `Total: ${total.toLocaleString()}`;
        if (legend) {
            legend.innerHTML = '';
            legendData.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="legend-color" style="background-color: ${item.color};"></span>
                    <span>${item.label}: ${item.value.toLocaleString()}</span>
                `;
                legend.appendChild(li);
            });
        }
    }

    // *========== Redraw chart when collapse opens ==========
    const collapsePopulation = document.getElementById('collapsepopulation');
    if (collapsePopulation) {
        collapsePopulation.addEventListener('shown.bs.collapse', () => {
            drawChart(); // Redraw on open
        });
    }
});