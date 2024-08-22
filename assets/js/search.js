document.getElementById('searchInput').addEventListener('keyup', (event) => {
    const filter = event.target.value.toLowerCase();
    const rows = transactionsTable.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const date = rows[i].getElementsByTagName('td')[0]?.textContent.toLowerCase();
        const category = rows[i].getElementsByTagName('td')[1]?.textContent.toLowerCase();
        const amount = rows[i].getElementsByTagName('td')[2]?.textContent.toLowerCase();
        const description = rows[i].getElementsByTagName('td')[3]?.textContent.toLowerCase();

        if (
            date.includes(filter) ||
            category.includes(filter) ||
            amount.includes(filter) ||
            description.includes(filter)
        ) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
});