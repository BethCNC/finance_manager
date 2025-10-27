import React, {useState, useEffect} from 'react';
import {X, Calendar, DollarSign, Tag, User, Building, CreditCard, FileText} from 'lucide-react';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

const TransactionForm: React.FC<TransactionFormProps> = ({isOpen, onClose, onSuccess, initialData}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Debit',
    category: '',
    account: '',
    person: '',
    business: false,
    subscription: false,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Categories from the schema
  const categories = [
    'Food & Groceries',
    'Transportation',
    'Entertainment',
    'Home & Utilities',
    'Healthcare',
    'Shopping',
    'Education',
    'Travel',
    'Personal Care',
    'Gifts & Donations',
    'Insurance',
    'Taxes',
    'Investments',
    'Savings',
    'Debt Payment',
    'Business Expenses',
    'Software & Subscriptions',
    'Family',
    'Transfer Fee',
    'Income',
    'Other',
    'Uncategorized'
  ];

  const accounts = ['SECU', 'Apple Cash', 'Cash App'];
  const people = ['Beth', 'Bryan'];
  const types = ['Debit', 'Credit'];

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.name || '',
        amount: Math.abs(initialData.amount || '').toString(),
        date: initialData.date || new Date().toISOString().split('T')[0],
        type: initialData.type === 'income' ? 'Credit' : 'Debit',
        category: initialData.category || '',
        account: initialData.account || '',
        person: initialData.person || '',
        business: initialData.business || false,
        subscription: initialData.subscription || false,
        notes: ''
      });
    } else {
      // Reset form for new transaction
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Debit',
        category: '',
        account: '',
        person: '',
        business: false,
        subscription: false,
        notes: ''
      });
    }
    setError('');
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const url = initialData 
        ? `/api/notion?type=update_transaction`
        : `/api/notion?type=create_transaction`;
      
      const method = initialData ? 'PATCH' : 'POST';
      
      const requestBody = initialData 
        ? {id: initialData.id, ...formData}
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.error || `Failed to ${initialData ? 'update' : 'create'} transaction`);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter transaction description"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                required
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account
            </label>
            <select
              value={formData.account}
              onChange={(e) => handleInputChange('account', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
            >
              <option value="">Select account</option>
              {accounts.map((account) => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>
          </div>

          {/* Person */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Person
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.person}
                onChange={(e) => handleInputChange('person', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
              >
                <option value="">Select person</option>
                {people.map((person) => (
                  <option key={person} value={person}>{person}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.business}
                onChange={(e) => handleInputChange('business', e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-700">Business expense</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.subscription}
                onChange={(e) => handleInputChange('subscription', e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-700">Subscription</span>
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Saving...' : (initialData ? 'Update' : 'Add Transaction')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
