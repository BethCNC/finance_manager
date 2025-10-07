import {useState, useEffect} from 'react';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  subscription?: boolean;
  business?: boolean;
  account?: string;
  person?: string;
}

interface Summary {
  totalIncome: number;
  totalExpenses: number;
  profit: number;
}

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalIncome: 0,
    totalExpenses: 0,
    profit: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [txRes, summaryRes] = await Promise.all([
          fetch('/api/notion?type=transactions'),
          fetch('/api/notion?type=summary'),
        ]);

        if (!txRes.ok || !summaryRes.ok) {
          console.error('API Error:', txRes.status, summaryRes.status);
          setLoading(false);
          return;
        }

        const txData = await txRes.json();
        const summaryData = await summaryRes.json();

        setTransactions(txData.transactions || []);
        setSummary({
          totalIncome: summaryData.totalIncome || 0,
          totalExpenses: summaryData.totalExpenses || 0,
          profit: summaryData.profit || 0,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return {transactions, summary, loading};
};
