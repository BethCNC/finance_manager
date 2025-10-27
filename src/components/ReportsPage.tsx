import React, {useState, useEffect} from 'react';
import {Download, FileText, BarChart3, Calendar, Filter, RefreshCw, TrendingUp, DollarSign, PieChart} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: 'spending' | 'income' | 'budget' | 'goals' | 'subscriptions' | 'custom';
  dateRange: {
    start: string;
    end: string;
  };
  generatedAt: string;
  data: any;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    topCategories: Array<{category: string; amount: number; percentage: number}>;
    insights: string[];
  };
}

interface ExportOptions {
  format: 'pdf' | 'csv' | 'excel';
  includeCharts: boolean;
  includeInsights: boolean;
  dateRange: {
    start: string;
    end: string;
  };
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'generate' | 'history' | 'export'>('overview');
  const [selectedReportType, setSelectedReportType] = useState<string>('spending');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeCharts: true,
    includeInsights: true,
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    }
  });

  // Mock reports data
  const mockReports: ReportData[] = [
    {
      id: '1',
      title: 'Monthly Spending Report',
      description: 'Comprehensive analysis of spending patterns for December 2024',
      type: 'spending',
      dateRange: {
        start: '2024-12-01',
        end: '2024-12-31'
      },
      generatedAt: '2024-12-31T10:30:00Z',
      data: {},
      summary: {
        totalIncome: 5000,
        totalExpenses: 3200,
        netIncome: 1800,
        topCategories: [
          {category: 'Food & Groceries', amount: 800, percentage: 25},
          {category: 'Transportation', amount: 600, percentage: 18.75},
          {category: 'Entertainment', amount: 400, percentage: 12.5},
          {category: 'Home & Utilities', amount: 350, percentage: 10.9},
          {category: 'Healthcare', amount: 300, percentage: 9.4}
        ],
        insights: [
          'Food spending increased by 15% compared to last month',
          'Transportation costs are within budget',
          'Consider reducing entertainment spending to increase savings'
        ]
      }
    },
    {
      id: '2',
      title: 'Budget Performance Report',
      description: 'Analysis of budget adherence and variance for Q4 2024',
      type: 'budget',
      dateRange: {
        start: '2024-10-01',
        end: '2024-12-31'
      },
      generatedAt: '2024-12-31T14:15:00Z',
      data: {},
      summary: {
        totalIncome: 15000,
        totalExpenses: 9600,
        netIncome: 5400,
        topCategories: [
          {category: 'Food & Groceries', amount: 2400, percentage: 25},
          {category: 'Transportation', amount: 1800, percentage: 18.75},
          {category: 'Entertainment', amount: 1200, percentage: 12.5},
          {category: 'Home & Utilities', amount: 1050, percentage: 10.9},
          {category: 'Healthcare', amount: 900, percentage: 9.4}
        ],
        insights: [
          'Overall budget adherence: 85%',
          'Food category consistently over budget',
          'Transportation and utilities within targets'
        ]
      }
    },
    {
      id: '3',
      title: 'Subscription Analysis Report',
      description: 'Review of subscription services and optimization opportunities',
      type: 'subscriptions',
      dateRange: {
        start: '2024-01-01',
        end: '2024-12-31'
      },
      generatedAt: '2024-12-30T09:45:00Z',
      data: {},
      summary: {
        totalIncome: 0,
        totalExpenses: 1200,
        netIncome: -1200,
        topCategories: [
          {category: 'Software & Subscriptions', amount: 600, percentage: 50},
          {category: 'Entertainment', amount: 300, percentage: 25},
          {category: 'News & Media', amount: 150, percentage: 12.5},
          {category: 'Health & Fitness', amount: 100, percentage: 8.3},
          {category: 'Other', amount: 50, percentage: 4.2}
        ],
        insights: [
          'Total annual subscription cost: $1,200',
          'Potential savings: $300 by canceling unused services',
          'Consider annual plans for 20% savings'
        ]
      }
    }
  ];

  useEffect(() => {
    setReports(mockReports);
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Simulate API call to generate report
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReport: ReportData = {
        id: Date.now().toString(),
        title: `${selectedReportType.charAt(0).toUpperCase() + selectedReportType.slice(1)} Report`,
        description: `Generated report for ${selectedReportType} analysis`,
        type: selectedReportType as any,
        dateRange,
        generatedAt: new Date().toISOString(),
        data: {},
        summary: {
          totalIncome: 5000,
          totalExpenses: 3200,
          netIncome: 1800,
          topCategories: [
            {category: 'Food & Groceries', amount: 800, percentage: 25},
            {category: 'Transportation', amount: 600, percentage: 18.75},
            {category: 'Entertainment', amount: 400, percentage: 12.5}
          ],
          insights: [
            'Generated report with current data',
            'Analysis completed successfully',
            'Ready for export'
          ]
        }
      };
      
      setReports(prev => [newReport, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = async (report: ReportData, options: ExportOptions) => {
    try {
      // Simulate export process
      const exportData = {
        report,
        options,
        timestamp: new Date().toISOString()
      };
      
      if (options.format === 'csv') {
        // Generate CSV content
        const csvContent = generateCSVContent(report);
        downloadFile(csvContent, `report-${report.id}.csv`, 'text/csv');
      } else if (options.format === 'pdf') {
        // Generate PDF content (simplified)
        const pdfContent = generatePDFContent(report, options);
        downloadFile(pdfContent, `report-${report.id}.pdf`, 'application/pdf');
      }
      
      alert(`Report exported successfully as ${options.format.toUpperCase()}`);
    } catch (err: any) {
      setError(`Export failed: ${err.message}`);
    }
  };

  const generateCSVContent = (report: ReportData): string => {
    const headers = ['Category', 'Amount', 'Percentage'];
    const rows = report.summary.topCategories.map(cat => [
      cat.category,
      cat.amount.toString(),
      `${cat.percentage}%`
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const generatePDFContent = (report: ReportData, options: ExportOptions): string => {
    // Simplified PDF content generation
    return `PDF Report: ${report.title}\n\nGenerated: ${new Date(report.generatedAt).toLocaleString()}\n\nSummary:\nTotal Income: $${report.summary.totalIncome}\nTotal Expenses: $${report.summary.totalExpenses}\nNet Income: $${report.summary.netIncome}`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'spending': return <TrendingUp className="w-5 h-5" />;
      case 'income': return <DollarSign className="w-5 h-5" />;
      case 'budget': return <BarChart3 className="w-5 h-5" />;
      case 'goals': return <FileText className="w-5 h-5" />;
      case 'subscriptions': return <PieChart className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'spending': return 'text-red-600 bg-red-100';
      case 'income': return 'text-green-600 bg-green-100';
      case 'budget': return 'text-blue-600 bg-blue-100';
      case 'goals': return 'text-purple-600 bg-purple-100';
      case 'subscriptions': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Financial Reports</h2>
            <p className="text-gray-600 mt-1">Generate and export comprehensive financial reports</p>
          </div>
          <button
            onClick={() => setActiveTab('generate')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            New Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            {id: 'overview', label: 'Overview', icon: BarChart3},
            {id: 'generate', label: 'Generate', icon: FileText},
            {id: 'history', label: 'History', icon: Calendar},
            {id: 'export', label: 'Export', icon: Download}
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Total Reports</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{reports.length}</p>
                <p className="text-sm text-blue-700">generated reports</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">This Month</span>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {reports.filter(r => new Date(r.generatedAt).getMonth() === new Date().getMonth()).length}
                </p>
                <p className="text-sm text-green-700">reports generated</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Exports</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">12</p>
                <p className="text-sm text-purple-700">files downloaded</p>
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {reports.slice(0, 3).map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getReportTypeColor(report.type)}`}>
                          {getReportTypeIcon(report.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(report.generatedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Income: ${report.summary.totalIncome.toLocaleString()}</span>
                        <span>Expenses: ${report.summary.totalExpenses.toLocaleString()}</span>
                        <span>Net: ${report.summary.netIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => exportReport(report, exportOptions)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Report</h3>
            
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {id: 'spending', label: 'Spending Analysis', icon: TrendingUp},
                  {id: 'income', label: 'Income Report', icon: DollarSign},
                  {id: 'budget', label: 'Budget Performance', icon: BarChart3},
                  {id: 'goals', label: 'Goals Progress', icon: FileText},
                  {id: 'subscriptions', label: 'Subscription Analysis', icon: PieChart},
                  {id: 'custom', label: 'Custom Report', icon: FileText}
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      selectedReportType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <type.icon className="w-5 h-5" />
                      <span className="font-medium text-gray-900">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate Report
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report History</h3>
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getReportTypeColor(report.type)}`}>
                      {getReportTypeIcon(report.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{report.title}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(report.generatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Period: {report.dateRange.start} to {report.dateRange.end}</span>
                    <span>Net Income: ${report.summary.netIncome.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportReport(report, exportOptions)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
            
            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
              <div className="grid grid-cols-3 gap-3">
                {['pdf', 'csv', 'excel'].map(format => (
                  <button
                    key={format}
                    onClick={() => setExportOptions(prev => ({...prev, format: format as any}))}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      exportOptions.format === format
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium text-gray-900 uppercase">{format}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Include in Export</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeCharts}
                    onChange={(e) => setExportOptions(prev => ({...prev, includeCharts: e.target.checked}))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Charts and Visualizations</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeInsights}
                    onChange={(e) => setExportOptions(prev => ({...prev, includeInsights: e.target.checked}))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">AI Insights and Recommendations</span>
                </label>
              </div>
            </div>

            {/* Export Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Export Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={exportOptions.dateRange.start}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      dateRange: {...prev.dateRange, start: e.target.value}
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={exportOptions.dateRange.end}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      dateRange: {...prev.dateRange, end: e.target.value}
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                if (reports.length > 0) {
                  exportReport(reports[0], exportOptions);
                } else {
                  alert('No reports available to export. Generate a report first.');
                }
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Export Reports
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
