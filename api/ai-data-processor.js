const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const {Client} = require('@notionhq/client');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Use the Transactions database (single source of truth)
const TRANSACTIONS_DB = process.env.Transactions_database_id || '82fc50e5b6b343a5a2ad1904f47404c0';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const {action, filePath, account, person} = req.body;

    if (action === 'process_csv') {
      const result = await processCSVFile(filePath, account, person);
      return res.status(200).json({success: true, data: result});
    }

    if (action === 'process_pdf') {
      const result = await processPDFFile(filePath, account, person);
      return res.status(200).json({success: true, data: result});
    }

    if (action === 'normalize_merchants') {
      const result = await normalizeMerchants();
      return res.status(200).json({success: true, data: result});
    }

    if (action === 'categorize_transactions') {
      const result = await categorizeTransactions();
      return res.status(200).json({success: true, data: result});
    }

    if (action === 'assign_people') {
      const result = await assignPeople();
      return res.status(200).json({success: true, data: result});
    }

    return res.status(400).json({error: 'Invalid action'});

  } catch (error) {
    console.error('AI Data Processor Error:', error);
    return res.status(500).json({
      error: 'Failed to process data',
      details: error.message
    });
  }
};

// Process CSV files with AI
async function processCSVFile(filePath, account, person) {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(filePath, 'utf8');
    
    // Use AI to parse and structure the CSV data
    const prompt = `
    Parse this CSV bank statement data and extract all transactions. 
    Account: ${account}
    Person: ${person}
    
    CSV Content:
    ${csvContent}
    
    Return a JSON array of transactions with this structure:
    [
      {
        "date": "YYYY-MM-DD",
        "description": "Transaction description",
        "amount": -123.45, // negative for expenses, positive for income
        "account": "${account}",
        "person": "${person}",
        "rawMerchant": "Original merchant name",
        "category": "Suggested category"
      }
    ]
    
    Rules:
    - Extract ALL transactions
    - Convert amounts to numbers (negative for expenses)
    - Suggest appropriate categories
    - Keep original merchant names in rawMerchant field
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{role: 'user', content: prompt}],
      max_tokens: 4000,
    });

    const transactions = JSON.parse(response.choices[0].message.content);
    
    // Add transactions to Notion
    const addedTransactions = [];
    for (const transaction of transactions) {
      try {
        const notionResponse = await notion.pages.create({
          parent: {database_id: TRANSACTIONS_DB},
          properties: {
            'Name': {
              title: [{text: {content: transaction.description}}]
            },
            'Amount': {number: transaction.amount},
            'Date': {date: {start: transaction.date}},
            'Account': {select: {name: transaction.account}},
            'Person': {select: {name: transaction.person}},
            'Normalized Merchant': {rich_text: [{text: {content: transaction.rawMerchant}}]},
            'Category': {select: {name: transaction.category}},
            'Type': {select: {name: transaction.amount < 0 ? 'expense' : 'income'}}
          }
        });
        addedTransactions.push(notionResponse);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    }

    return {
      processed: transactions.length,
      added: addedTransactions.length,
      transactions: transactions
    };

  } catch (error) {
    console.error('CSV Processing Error:', error);
    throw error;
  }
}

// Process PDF files with AI Vision
async function processPDFFile(filePath, account, person) {
  try {
    // Read PDF file as base64
    const pdfBuffer = fs.readFileSync(filePath);
    const base64PDF = pdfBuffer.toString('base64');
    
    // Use AI Vision to extract text from PDF
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Extract all transactions from this bank statement PDF. 
              Account: ${account}
              Person: ${person}
              
              Return a JSON array of transactions with this structure:
              [
                {
                  "date": "YYYY-MM-DD",
                  "description": "Transaction description",
                  "amount": -123.45, // negative for expenses, positive for income
                  "account": "${account}",
                  "person": "${person}",
                  "rawMerchant": "Original merchant name",
                  "category": "Suggested category"
                }
              ]
              
              Rules:
              - Extract ALL transactions
              - Convert amounts to numbers (negative for expenses)
              - Suggest appropriate categories
              - Keep original merchant names in rawMerchant field`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
    });

    const transactions = JSON.parse(response.choices[0].message.content);
    
    // Add transactions to Notion
    const addedTransactions = [];
    for (const transaction of transactions) {
      try {
        const notionResponse = await notion.pages.create({
          parent: {database_id: TRANSACTIONS_DB},
          properties: {
            'Name': {
              title: [{text: {content: transaction.description}}]
            },
            'Amount': {number: transaction.amount},
            'Date': {date: {start: transaction.date}},
            'Account': {select: {name: transaction.account}},
            'Person': {select: {name: transaction.person}},
            'Normalized Merchant': {rich_text: [{text: {content: transaction.rawMerchant}}]},
            'Category': {select: {name: transaction.category}},
            'Type': {select: {name: transaction.amount < 0 ? 'expense' : 'income'}}
          }
        });
        addedTransactions.push(notionResponse);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    }

    return {
      processed: transactions.length,
      added: addedTransactions.length,
      transactions: transactions
    };

  } catch (error) {
    console.error('PDF Processing Error:', error);
    throw error;
  }
}

// AI-powered merchant normalization
async function normalizeMerchants() {
  try {
    // Get all transactions with missing or poor merchant names
    const response = await notion.databases.query({
      database_id: TRANSACTIONS_DB,
      filter: {
        or: [
          {property: 'Normalized Merchant', rich_text: {is_empty: true}},
          {property: 'Normalized Merchant', rich_text: {contains: 'TBD'}}
        ]
      },
      page_size: 100
    });

    const transactions = response.results;
    const normalized = [];

    for (const transaction of transactions) {
      const description = transaction.properties.Name?.title[0]?.plain_text || '';
      const currentMerchant = transaction.properties['Normalized Merchant']?.rich_text[0]?.plain_text || '';

      if (description && !currentMerchant) {
        const prompt = `
        Normalize this transaction description into a clean merchant name:
        
        Description: "${description}"
        
        Return only the normalized merchant name, nothing else.
        Examples:
        - "AMZN Mktp US*1234" → "Amazon"
        - "STARBUCKS STORE #12345" → "Starbucks"
        - "UBER TRIP HELP" → "Uber"
        - "PAYPAL *MERCHANT" → "PayPal"
        `;

        const aiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{role: 'user', content: prompt}],
          max_tokens: 50,
        });

        const normalizedMerchant = aiResponse.choices[0].message.content.trim();

        // Update the transaction in Notion
        await notion.pages.update({
          page_id: transaction.id,
          properties: {
            'Normalized Merchant': {
              rich_text: [{text: {content: normalizedMerchant}}]
            }
          }
        });

        normalized.push({
          id: transaction.id,
          original: description,
          normalized: normalizedMerchant
        });
      }
    }

    return {
      processed: transactions.length,
      normalized: normalized.length,
      results: normalized
    };

  } catch (error) {
    console.error('Merchant Normalization Error:', error);
    throw error;
  }
}

// AI-powered transaction categorization
async function categorizeTransactions() {
  try {
    // Get all transactions with missing categories
    const response = await notion.databases.query({
      database_id: TRANSACTIONS_DB,
      filter: {
        or: [
          {property: 'Category', select: {is_empty: true}},
          {property: 'Category', select: {equals: 'Uncategorized'}}
        ]
      },
      page_size: 100
    });

    const transactions = response.results;
    const categorized = [];

    for (const transaction of transactions) {
      const description = transaction.properties.Name?.title[0]?.plain_text || '';
      const merchant = transaction.properties['Normalized Merchant']?.rich_text[0]?.plain_text || '';
      const amount = transaction.properties.Amount?.number || 0;

      if (description) {
        const prompt = `
        Categorize this transaction into one of these categories:
        - Food & Groceries
        - Dining Out
        - Entertainment
        - Transportation
        - Shopping
        - Subscriptions
        - Healthcare
        - Utilities
        - Personal Care
        - Insurance
        - Income
        - Transfer
        - Other
        
        Transaction: "${description}"
        Merchant: "${merchant}"
        Amount: ${amount}
        
        Return only the category name, nothing else.
        `;

        const aiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{role: 'user', content: prompt}],
          max_tokens: 50,
        });

        const category = aiResponse.choices[0].message.content.trim();

        // Update the transaction in Notion
        await notion.pages.update({
          page_id: transaction.id,
          properties: {
            'Category': {select: {name: category}}
          }
        });

        categorized.push({
          id: transaction.id,
          description: description,
          category: category
        });
      }
    }

    return {
      processed: transactions.length,
      categorized: categorized.length,
      results: categorized
    };

  } catch (error) {
    console.error('Categorization Error:', error);
    throw error;
  }
}

// AI-powered person assignment
async function assignPeople() {
  try {
    // Get all transactions with missing person assignments
    const response = await notion.databases.query({
      database_id: TRANSACTIONS_DB,
      filter: {
        property: 'Person', select: {is_empty: true}
      },
      page_size: 100
    });

    const transactions = response.results;
    const assigned = [];

    for (const transaction of transactions) {
      const description = transaction.properties.Name?.title[0]?.plain_text || '';
      const merchant = transaction.properties['Normalized Merchant']?.rich_text[0]?.plain_text || '';
      const account = transaction.properties.Account?.select?.name || '';

      if (description) {
        const prompt = `
        Determine which person (Beth or Bryan) this transaction belongs to based on:
        - Account type and patterns
        - Merchant names
        - Transaction descriptions
        
        Transaction: "${description}"
        Merchant: "${merchant}"
        Account: "${account}"
        
        Return only "Beth" or "Bryan", nothing else.
        `;

        const aiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{role: 'user', content: prompt}],
          max_tokens: 10,
        });

        const person = aiResponse.choices[0].message.content.trim();

        // Update the transaction in Notion
        await notion.pages.update({
          page_id: transaction.id,
          properties: {
            'Person': {select: {name: person}}
          }
        });

        assigned.push({
          id: transaction.id,
          description: description,
          person: person
        });
      }
    }

    return {
      processed: transactions.length,
      assigned: assigned.length,
      results: assigned
    };

  } catch (error) {
    console.error('Person Assignment Error:', error);
    throw error;
  }
}
