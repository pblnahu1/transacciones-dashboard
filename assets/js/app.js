

// datos de ej para la tabla
const transactions = JSON.parse(localStorage.getItem('transactions')) || [
    {date: '2022-01-01', category: 'Alimentación', amount: 20000, description: 'Compra en supermercado'},
    {date: '2022-01-02', category: 'Transporte', amount: 370, description: 'Sube del Colectivo'},
    { date: '2022-01-03', category: 'Casa', amount: 15000, description: 'Paga la luz' },
    { date: '2022-01-04', category: 'Vivienda', amount: 200, description: 'Casa en venta' },
    { date: '2022-01-05', category: 'Comida', amount: 12000, description: 'Comida en supermercado' },
    { date: '2022-01-06', category: 'Transporte', amount: 370, description: 'Sube del Colectivo' },
    { date: '2022-01-07', category: 'Casa', amount: 9000, description: 'Paga la luz' },
]

// renderizo la tabla de transacciones
const transactionsTable = document.getElementById('transactionTable');

function renderTransactions() {
    transactionsTable.innerHTML = ''; // limpiar la tabla

    // validar si hay transacciones
    if (transactions.length === 0) {
        const noData = document.createElement('tr');
        noData.innerHTML = `<td colspan="4" style="text-align: center;">No hay transacciones disponibles.</td>`;
        transactionsTable.appendChild(noData);
        return;
    }

    // renderizar las transacciones en la tabla, con el formato deseado
    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        const formattedAmount = transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${formattedAmount}</td>
            <td>${transaction.description}</td>
            <td class="td-btn-delete"><button class="delete-btn" data-index="${index}">Eliminar</button></td>
        `;
        transactionsTable.appendChild(row);
    })  

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            //transactions.splice(index, 1); // eliminar la transacción del array
            // renderTransactions(); // volver a renderizar la tablA
            deleteTransaction(index);
        });
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLocalStorage();
    renderTransactions();
}

function updateLocalStorage() {
    // actualizar el localStorage con el array de transacciones
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// grafico, son los datos q puedo elegir ver
const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
        {
            label: 'Ingresos',
            data: [1200, 1500, 1300, 1700, 1600],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderWidth: 1
        },
        {
            label: 'Gastos',
            data: [1000, 1200, 1100, 1400, 1300],
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderWidth: 1
        }
    ]
};

// config del grafico
const config = {
    maintainAspectRatio: false,
    type: 'line',
    data: data,
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
                    }
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        },
        onClick: (e) => {
            const points = financialChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
            if (points.length) {
                const firstPoint = points[0];
                const datasetIndex = firstPoint.datasetIndex;
                const meta = financialChart.getDatasetMeta(datasetIndex);
                meta.hidden = meta.hidden === null ? !financialChart.data.datasets[datasetIndex].hidden : null;
                financialChart.update();
            }
        }
    }
};

// renderizo el grafico
const ctx = document.getElementById('financialChart').getContext('2d');
const financialChart = new Chart(ctx, config);

renderTransactions();

