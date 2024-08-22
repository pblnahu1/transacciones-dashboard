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
        }
    }
};

// renderizo el grafico
const ctx = document.getElementById('financialChart').getContext('2d');
const financialChart = new Chart(ctx, config);

// datos de ejemplo para la tabla
const transactions = [
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
transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>$${transaction.amount}</td>
        <td>${transaction.description}</td>
    `;
    transactionsTable.appendChild(row);
})  