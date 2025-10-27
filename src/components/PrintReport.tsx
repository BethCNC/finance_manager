import React from 'react';

interface PrintReportProps {
  data: any;
}

export const PrintReport = ({data}: PrintReportProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!data) return null;

  return (
    <div className="print-report">
      <style>{`
        @media print {
          .print-report {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
          }
          
          .print-report h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          
          .print-report h2 {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
          
          .print-report h3 {
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 8px;
          }
          
          .print-report .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
          }
          
          .print-report .summary-card {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
          }
          
          .print-report .summary-card .label {
            font-size: 10px;
            margin-bottom: 5px;
          }
          
          .print-report .summary-card .value {
            font-size: 16px;
            font-weight: bold;
          }
          
          .print-report table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          
          .print-report th,
          .print-report td {
            border: 1px solid #000;
            padding: 5px;
            text-align: left;
          }
          
          .print-report th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          
          .print-report .action-item {
            border: 1px solid #000;
            padding: 10px;
            margin-bottom: 10px;
            page-break-inside: avoid;
          }
          
          .print-report .action-item .priority {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .print-report .action-item .impact {
            font-weight: bold;
            color: #000;
          }
          
          .print-report .page-break {
            page-break-before: always;
          }
        }
      `}</style>

      <div className="print-report">
        <h1>Family Finance Meeting Report</h1>
        <p style={{textAlign: 'center', marginBottom: '30px'}}>
          July - September 2025 Analysis
        </p>

        {/* Executive Summary */}
        <h2>Executive Summary</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="label">Total Income</div>
            <div className="value">{formatCurrency(data.monthlyComparison?.summary?.totalIncome || 0)}</div>
          </div>
          <div className="summary-card">
            <div className="label">Total Expenses</div>
            <div className="value">{formatCurrency(data.monthlyComparison?.summary?.totalExpenses || 0)}</div>
          </div>
          <div className="summary-card">
            <div className="label">Net Profit</div>
            <div className="value">{formatCurrency(data.monthlyComparison?.summary?.totalNetProfit || 0)}</div>
          </div>
          <div className="summary-card">
            <div className="label">Avg Daily Spending</div>
            <div className="value">{formatCurrency(data.monthlyComparison?.summary?.averageDailySpending || 0)}</div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <h2>Monthly Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Net Profit</th>
              <th>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {data.monthlyComparison?.monthlyData?.map((month: any) => (
              <tr key={month.month}>
                <td>{month.month}</td>
                <td>{formatCurrency(month.income)}</td>
                <td>{formatCurrency(month.expenses)}</td>
                <td>{formatCurrency(month.netProfit)}</td>
                <td>{month.transactionCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Top Categories */}
        <h2>Top Spending Categories</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Amount</th>
              <th>Percentage</th>
              <th>Monthly Average</th>
              <th>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {data.categoryAnalysis?.topExpenseCategories?.slice(0, 10).map((category: any) => (
              <tr key={category.category}>
                <td>{category.category}</td>
                <td>{formatCurrency(category.totalExpenses)}</td>
                <td>{category.percentage}%</td>
                <td>{formatCurrency(category.monthlyAverage)}</td>
                <td>{category.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Subscription Analysis */}
        <div className="page-break">
          <h2>Subscription Analysis</h2>
          <table>
            <thead>
              <tr>
                <th>Subscription</th>
                <th>Monthly Cost</th>
                <th>Frequency</th>
                <th>Status</th>
                <th>Failed Payments</th>
              </tr>
            </thead>
            <tbody>
              {data.subscriptionAnalysis?.subscriptions?.map((sub: any, index: number) => (
                <tr key={index}>
                  <td>{sub.name}</td>
                  <td>{formatCurrency(sub.monthlyAmount)}</td>
                  <td>{sub.frequency}</td>
                  <td>{sub.status}</td>
                  <td>{sub.failedPayments}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Subscription Summary</h3>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="label">Total Subscriptions</div>
              <div className="value">{data.subscriptionAnalysis?.summary?.totalSubscriptions || 0}</div>
            </div>
            <div className="summary-card">
              <div className="label">Monthly Cost</div>
              <div className="value">{formatCurrency(data.subscriptionAnalysis?.summary?.totalMonthlyCost || 0)}</div>
            </div>
            <div className="summary-card">
              <div className="label">Failed Payments</div>
              <div className="value">{data.subscriptionAnalysis?.summary?.totalFailedPayments || 0}</div>
            </div>
            <div className="summary-card">
              <div className="label">Potential Savings</div>
              <div className="value">{formatCurrency(data.subscriptionAnalysis?.potentialSavings?.total || 0)}</div>
            </div>
          </div>
        </div>

        {/* Cost-Cutting Opportunities */}
        <h2>Cost-Cutting Opportunities</h2>
        {data.categoryAnalysis?.costCuttingOpportunities?.slice(0, 10).map((opportunity: any, index: number) => (
          <div key={index} className="action-item">
            <div className="priority">Priority: {opportunity.priority.toUpperCase()}</div>
            <h3>{opportunity.category}</h3>
            <p><strong>Reason:</strong> {opportunity.reason}</p>
            <p><strong>Current Spending:</strong> {formatCurrency(opportunity.monthlySpending)}/month</p>
            <p className="impact"><strong>Potential Savings:</strong> {formatCurrency(opportunity.potentialSavings)}/month</p>
          </div>
        ))}

        {/* Action Items */}
        <div className="page-break">
          <h2>Recommended Actions</h2>
          {data.subscriptionAnalysis?.recommendations?.slice(0, 10).map((rec: any, index: number) => (
            <div key={index} className="action-item">
              <div className="priority">Priority: {rec.priority.toUpperCase()}</div>
              <h3>{rec.action} {rec.subscription}</h3>
              <p><strong>Reason:</strong> {rec.reason}</p>
              <p className="impact"><strong>Monthly Savings:</strong> {formatCurrency(rec.monthlySavings)}</p>
            </div>
          ))}
        </div>

        {/* Data Quality */}
        <h2>Data Quality Status</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="label">Data Completeness</div>
            <div className="value">{data.verification?.status?.dataQualityScore || 0}%</div>
          </div>
          <div className="summary-card">
            <div className="label">Total Transactions</div>
            <div className="value">{data.verification?.totalTransactions || 0}</div>
          </div>
          <div className="summary-card">
            <div className="label">Missing Accounts</div>
            <div className="value">{data.verification?.status?.missingAccounts?.length || 0}</div>
          </div>
          <div className="summary-card">
            <div className="label">Empty Months</div>
            <div className="value">{data.verification?.status?.emptyMonths?.length || 0}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{marginTop: '40px', textAlign: 'center', fontSize: '10px', color: '#666'}}>
          <p>Generated on {new Date().toLocaleDateString()}</p>
          <p>Family Finance Meeting Report - July-September 2025</p>
        </div>
      </div>
    </div>
  );
};
