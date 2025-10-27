import React, {useState} from 'react';
import {Edit, Trash2, AlertTriangle} from 'lucide-react';
import TransactionForm from './TransactionForm';

interface TransactionEditModalProps {
  transaction: any;
  onEdit: () => void;
  onDelete: () => void;
}

const TransactionEditModal: React.FC<TransactionEditModalProps> = ({transaction, onEdit, onDelete}) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/notion?type=delete_transaction&id=${transaction.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        onDelete();
        setIsDeleteConfirmOpen(false);
      } else {
        alert('Failed to delete transaction: ' + data.error);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Edit/Delete Options */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditFormOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        
        <button
          onClick={() => setIsDeleteConfirmOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {/* Edit Form Modal */}
      <TransactionForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSuccess={() => {
          onEdit();
          setIsEditFormOpen(false);
        }}
        initialData={transaction}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Transaction</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this transaction?
              </p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="font-medium text-gray-900">{transaction.name}</p>
                <p className="text-sm text-gray-600">
                  ${Math.abs(transaction.amount).toFixed(2)} • {transaction.category}
                </p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionEditModal;
