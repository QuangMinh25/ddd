import dynamic from 'next/dynamic';

const SalesReportPlot = dynamic(() => import('../components/SalesReportPlot'), { ssr: false });

const SalesReport = () => {
  return (
    <div>
      <h2>Sales Report</h2>
      <SalesReportPlot />
    </div>
  );
};

export default SalesReport;
