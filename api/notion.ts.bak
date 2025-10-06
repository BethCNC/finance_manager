import {Client} from '@notionhq/client';
import type {VercelRequest, VercelResponse} from '@vercel/node';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const INCOMES_DB = '18986edc-ae2c-81b8-8f77-e19036368d99';
const EXPENSES_DB = '18986edc-ae2c-815f-b56c-ed1964dccaf5';
const MONTHS_DB = '18986edc-ae2c-81ca-a41c-cde295ea544f';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const {type} = req.query;

  try {
    if (type === 'transactions') {
      // Get both incomes and expenses
      const [incomes, expenses] = await Promise.all([
        notion.databases.query({
          database_id: INCOMES_DB,
          sorts: [{property: 'Date', direction: 'descending'}],
          page_size: 20,
        }),
        notion.databases.query({
          database_id: EXPENSES_DB,
          sorts: [{property: 'Date', direction: 'descending'}],
          page_size: 20,
        }),
      ]);

      const transactions = [
        ...incomes.results.map((page: any) => ({
          id: page.id,
          name: page.properties.Name?.title[0]?.plain_text || 'Untitled Income',
          amount: page.properties.Amount?.number || 0,
          date: page.properties.Date?.date?.start || new Date().toISOString(),
          type: 'income',
          category: 'Income',
        })),
        ...expenses.results.map((page: any) => ({
          id: page.id,
          name: page.properties.Name?.title[0]?.plain_text || 'Untitled Expense',
          amount: -(page.properties.Amount?.number || 0),
          date: page.properties.Date?.date?.start || new Date().toISOString(),
          type: 'expense',
          category: 'Expense',
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return res.status(200).json({transactions});
    }

    if (type === 'summary') {
      const months = await notion.databases.query({
        database_id: MONTHS_DB,
        sorts: [{property: 'Date', direction: 'descending'}],
        page_size: 1,
      });

      const currentMonth = months.results[0] as any;
      
      const totalIncome = currentMonth?.properties['Incomes Amount']?.rollup?.number || 0;
      const totalExpenses = currentMonth?.properties['Expenses amount']?.rollup?.number || 0;
      const profit = currentMonth?.properties['Profite']?.formula?.number || 0;

      return res.status(200).json({
        totalIncome,
        totalExpenses,
        profit,
      });
    }

    return res.status(400).json({error: 'Invalid type parameter. Use ?type=transactions or ?type=summary'});
  } catch (error: any) {
    console.error('Notion API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch data from Notion',
      details: error.message,
    });
  }
}
