const elements = {
    totalBalance: document.getElementById('totalBalance'),
    totalDays: document.getElementById('totalDays'),
    chartsContainer: document.getElementById('chartContainer'),
    totalExpense: document.getElementById('totalExpense'),
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Error in the JSON');
      }
      const data = await response.json();
      dataHandler(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  const dataHandler = (data) => {
    const maxAmount = data.reduce((max, expense) => Math.max(max, expense.amount), 0);
    const totalAmount = data.reduce((sum, obj) => sum + obj.amount, 0);
    const totalDays = data.length;
  
    data.forEach((expense) => {
      renderData(expense, maxAmount, totalAmount, totalDays);
    });
  };
  
  const renderData = (data, max, total, days) => {
    const chartContainer = document.createElement('article');
    const chart = document.createElement('div');
    const dayLabel = document.createElement('span');
    const expenseLabel = document.createElement('span');
    const ratio = data.amount / max;
    const chartHeight = ratio * 150 + 'px';
    const initialChartheight = '5px';
  
    chart.style.height = initialChartheight;
  
    setTimeout(() => {
      chart.style.height = chartHeight;
    }, 200);
  
    expenseLabel.classList = 'expense';
    expenseLabel.innerText = data.amount;
    chart.className = 'expenses-info_chart-container_chart';
    dayLabel.innerText = data.day;
  
    if (data.amount === max) chart.classList.add('max');
  
    elements.chartsContainer.appendChild(chartContainer);
    chartContainer.appendChild(expenseLabel);
    chartContainer.appendChild(chart);
    chartContainer.appendChild(dayLabel);
    elements.totalExpense.innerText = '$' + total;
    elements.totalDays.innerText = days;
  };
  
  window.onload = () => {
    fetchData();
  };
  