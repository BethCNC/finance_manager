import React, {useState} from 'react';
import {Upload, FileText, Database, Users, Tag, CheckCircle, AlertCircle, Loader} from 'lucide-react';

interface ProcessingResult {
  processed: number;
  added: number;
  transactions?: any[];
  normalized?: any[];
  categorized?: any[];
  assigned?: any[];
}

export const AIDataProcessor = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('import');

  const processFile = async (action: string, filePath?: string, account?: string, person?: string) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/ai-data-processor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action, filePath, account, person})
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-black mb-4">AI Data Processor</h2>
        <p className="text-gray-600 mb-6">
          Automatically process raw financial data using AI to complete your family finance database.
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'import'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Import Data
          </button>
          <button
            onClick={() => setActiveTab('cleanse')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'cleanse'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Database className="w-4 h-4 inline mr-2" />
            Cleanse Data
          </button>
        </div>

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CSV Processing */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Process CSV Files
                </h3>
                <p className="text-gray-600 mb-4">
                  Process existing CSV files from Cash App and other sources.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Path
                    </label>
                    <input
                      type="text"
                      placeholder="/data/raw/beth/cash_app/cash_app_2025.csv"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      id="csvPath"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      id="csvAccount"
                    >
                      <option value="Cash App">Cash App</option>
                      <option value="Apple Cash">Apple Cash</option>
                      <option value="SECU">SECU</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Person
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      id="csvPerson"
                    >
                      <option value="Beth">Beth</option>
                      <option value="Bryan">Bryan</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      const path = (document.getElementById('csvPath') as HTMLInputElement)?.value;
                      const account = (document.getElementById('csvAccount') as HTMLSelectElement)?.value;
                      const person = (document.getElementById('csvPerson') as HTMLSelectElement)?.value;
                      if (path && account && person) {
                        processFile('process_csv', path, account, person);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : null}
                    Process CSV File
                  </button>
                </div>
              </div>

              {/* PDF Processing */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Process PDF Files
                </h3>
                <p className="text-gray-600 mb-4">
                  Extract transactions from bank statement PDFs using AI Vision.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Path
                    </label>
                    <input
                      type="text"
                      placeholder="/data/raw/beth/secu/ncsecu_july_2025.pdf"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      id="pdfPath"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      id="pdfAccount"
                    >
                      <option value="SECU">SECU</option>
                      <option value="Cash App">Cash App</option>
                      <option value="Apple Cash">Apple Cash</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Person
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      id="pdfPerson"
                    >
                      <option value="Beth">Beth</option>
                      <option value="Bryan">Bryan</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      const path = (document.getElementById('pdfPath') as HTMLInputElement)?.value;
                      const account = (document.getElementById('pdfAccount') as HTMLSelectElement)?.value;
                      const person = (document.getElementById('pdfPerson') as HTMLSelectElement)?.value;
                      if (path && account && person) {
                        processFile('process_pdf', path, account, person);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : null}
                    Process PDF File
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Import Buttons */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Import - Missing Accounts</h3>
              <p className="text-blue-700 mb-4">
                Import data for accounts that are currently missing from your database.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => processFile('process_csv', '/data/raw/beth/cash_app/cash_app_2025.csv', 'Cash App', 'Beth')}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  Beth Cash App
                </button>
                
                <button
                  onClick={() => processFile('process_pdf', '/data/raw/beth/secu/ncsecu_july_2025.pdf', 'SECU', 'Beth')}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  Beth SECU July
                </button>
                
                <button
                  onClick={() => processFile('process_pdf', '/data/raw/bryan/cash_app/Cash_App_July_2025_Account_Statement.pdf', 'Cash App', 'Bryan')}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  Bryan Cash App
                </button>
                
                <button
                  onClick={() => processFile('process_pdf', '/data/raw/bryan/secu/july_PDF document-147F61C542C4-1.pdf', 'SECU', 'Bryan')}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  Bryan SECU July
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cleanse Tab */}
        {activeTab === 'cleanse' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Merchant Normalization */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Normalize Merchants
                </h3>
                <p className="text-gray-600 mb-4">
                  Use AI to standardize merchant names (e.g., "AMZN" → "Amazon").
                </p>
                <button
                  onClick={() => processFile('normalize_merchants')}
                  disabled={loading}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : null}
                  Normalize Merchants
                </button>
              </div>

              {/* Transaction Categorization */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Categorize Transactions
                </h3>
                <p className="text-gray-600 mb-4">
                  Use AI to categorize uncategorized transactions.
                </p>
                <button
                  onClick={() => processFile('categorize_transactions')}
                  disabled={loading}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : null}
                  Categorize Transactions
                </button>
              </div>

              {/* Person Assignment */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Assign People
                </h3>
                <p className="text-gray-600 mb-4">
                  Use AI to assign transactions to Beth or Bryan.
                </p>
                <button
                  onClick={() => processFile('assign_people')}
                  disabled={loading}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : null}
                  Assign People
                </button>
              </div>
            </div>

            {/* Bulk Cleanse */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Complete Data Cleansing</h3>
              <p className="text-green-700 mb-4">
                Run all AI cleansing operations to complete your data quality.
              </p>
              <button
                onClick={async () => {
                  await processFile('normalize_merchants');
                  await processFile('categorize_transactions');
                  await processFile('assign_people');
                }}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-50"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : null}
                Run Complete Cleansing
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Processing Results
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{results.processed}</div>
                <div className="text-sm text-gray-600">Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{results.added || results.normalized || results.categorized || results.assigned}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>

            {results.transactions && (
              <div className="space-y-2">
                <h4 className="font-semibold text-black">Sample Transactions:</h4>
                {results.transactions.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{transaction.description}</span>
                    <span className="text-sm font-medium">{formatCurrency(transaction.amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Processing Error
            </h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
