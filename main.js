window.onload = () => {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        render(data);
    })
}

const render = (data) => {
    const chartCont = document.getElementById('chart_container');
    const total = document.querySelector('.total');

    const maxAmount = data.reduce((max, obj) => Math.max(max, obj.amount), 0);
    const totalSum = data.reduce((sum, obj) => sum + obj.amount, 0);
    
    data.forEach(obj => {

        const contentContainer = document.createElement('div');
        const bar = document.createElement('div');
        const days = document.createElement('span');
        const cost = document.createElement('span');
        
        const ratio = obj.amount / maxAmount;
        const barHeight = ratio * 100 + 'px';

        const initialBarHeight = "5px"; // Tamaño inicial de la barra
        const finalBarHeight = barHeight; // Tamaño final de la barra

        // Establecer la altura inicial de la barra
        bar.style.height = initialBarHeight;

        setTimeout(() => {
            bar.style.height = barHeight;
        }, 100);
        days.innerText = obj.day;
        cost.innerText = '$'+obj.amount;
        total.innerText = '$'+totalSum.toFixed(2);

        bar.className = 'bar';
        days.className = 'days';
        cost.className = 'cost';
        contentContainer.className = 'content_container';

        chartCont.appendChild(contentContainer);
        contentContainer.appendChild(cost);
        contentContainer.appendChild(bar);
        contentContainer.appendChild(days);

        bar.addEventListener('mouseenter', () => {
            cost.style.visibility = 'visible';
        });

        bar.addEventListener('mouseleave', () => {
            cost.style.visibility = 'hidden';
        });
    });
}