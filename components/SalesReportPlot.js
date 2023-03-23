import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const SalesReportPlot = ({ total, monthlySales }) => {
  const data = [{
    x: Object.keys(monthlySales).map(key => `Tháng ${key}`),
    y: Object.values(monthlySales),
    type: 'bar',
    marker: { color: 'red' },
  }];

  const layout = {
    width: 800,
    height: 400,
    title: `Báo cáo doanh số (Tổng doanh thu: ${total})`,
    xaxis: {
      title: 'Tháng',
    },
    yaxis: {
      title: 'Doanh thu (VNĐ)',
    },
  };

  return <Plot data={data} layout={layout} />;
};

const SalesReport = () => {

  const [total, setTotal] = useState(0);
  const [monthlySales, setMonthlySales] = useState({ 1: 0, 2: 0, /* các giá trị mặc định cho các tháng khác */});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/order/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fromDate: '2023-01-01',
            toDate: '2023-12-31'
          })
        });
        const orders = await response.json();
        const total = orders.reduce((accumulator, order) => accumulator + order.total, 0);
        const fullYearSales = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
          12: 0,
        };
        orders.forEach(order => {
          const month = order.dateOfPayment.getMonth() + 1;
          fullYearSales[month] += order.total;
        });
        setMonthlySales(fullYearSales);
        setTotal(total);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    
    
    
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h2>Sales Report</h2>
      <SalesReportPlot total={total} monthlySales={monthlySales} />
    </div>
  );
};

export default SalesReport;
