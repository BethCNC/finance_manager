import React, {useState} from 'react';
import {Sparkles, TrendingUp, DollarSign, AlertCircle, HelpCircle, Send} from 'lucide-react';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';

interface PromptSuggestion {
  id: string;
  title: string;
  description: string;
  icon: 'chart' | 'dollar' | 'alert';
  color: string;
}

interface AIInsight {
  id: string;
  question: string;
}

/**
 * AI Advisor Page Component
 * Based on Figma design: node-id=60:22503
 *
 * Features:
 * - AI Financial Advisor hero card
 * - Prompt suggestions with colored icons
 * - AI insights in blue container
 * - Chat input interface
 */
const AdvisorPage = () => {
  const [inputValue, setInputValue] = useState('');

  const suggestions: PromptSuggestion[] = [
    {
      id: '1',
      title: 'Spending Pattern Detected',
      description: 'I analyze you spending patterns and provide actionable recommendations to help you achieve your financial goals.',
      icon: 'chart',
      color: 'bg-pink-300'
    },
    {
      id: '2',
      title: 'Savings Opportunity',
      description: 'You could save $128 a year switching to annual subscriptions for Netflix and Amazon Prime.',
      icon: 'dollar',
      color: 'bg-purple-300'
    },
    {
      id: '3',
      title: 'Budget Alert',
      description: 'Your utilities budget is at 90%. Consider reviewing energy usage.',
      icon: 'alert',
      color: 'bg-orange-300'
    }
  ];

  const insights: AIInsight[] = [
    {
      id: '1',
      question: 'Your subscriptions rose 12%. Want me to investigate your recent transactions to determine why and find a solution?'
    },
    {
      id: '2',
      question: 'Your subscriptions rose 12%. Want me to investigate your recent transactions to determine why and find a solution?'
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'chart':
        return <TrendingUp className="w-5 h-5 text-white" />;
      case 'dollar':
        return <DollarSign className="w-5 h-5 text-white" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-white" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('Sending message:', inputValue);
      // TODO: Integrate with AI backend
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleGridClick = () => {
    console.log('Grid clicked');
    // TODO: Open grid view or settings
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader
        title="Advisor"
        showGrid
        onGridClick={handleGridClick}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 space-y-6">
      {/* Hero Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <div className="flex gap-3 items-center mb-1">
          <div className="w-8 h-8 overflow-hidden flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-slate-800" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-800">
            AI Financial Advisor
          </h1>
        </div>
        <p className="text-base font-medium text-slate-700 pl-11">
          I analyze you spending patterns and provide actionable recommendations to help you achieve your financial goals.
        </p>
      </div>

      {/* Prompt Suggestions Section */}
      <div className="space-y-3">
        <div className="bg-slate-700 border border-gray-600 rounded-md px-3 py-3">
          <h2 className="text-2xl font-semibold text-white">
            Prompt Suggestions
          </h2>
        </div>

        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-slate-50 border border-gray-400 rounded-xl px-3 py-6 hover:border-gray-500 transition-colors cursor-pointer"
          >
            <div className="flex gap-3 items-center mb-2">
              <div className={`${suggestion.color} rounded p-2 flex items-center justify-center`}>
                {getIcon(suggestion.icon)}
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                {suggestion.title}
              </h3>
            </div>
            <p className="text-base text-slate-700 pl-12">
              {suggestion.description}
            </p>
          </div>
        ))}
      </div>

      {/* AI Insights Section */}
      <div className="space-y-3 rounded-2xl">
        <div className="bg-slate-700 border border-gray-600 rounded-md px-3 py-3">
          <h2 className="text-2xl font-semibold text-white">
            AI Insights
          </h2>
        </div>

        <div className="bg-blue-500 border border-gray-300 rounded-2xl p-6 space-y-6">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="border border-gray-400 rounded-md p-6"
            >
              <div className="bg-white border border-gray-300 rounded flex gap-1 items-start px-3 py-2">
                <div className="flex items-center pt-0.5">
                  <HelpCircle className="w-6 h-6 text-slate-700" />
                </div>
                <p className="flex-1 text-base font-medium text-slate-700">
                  {insight.question}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-blue-200 border-t border-gray-300 px-6 py-6 -mx-6 -mb-6">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Input"
            className="flex-1 bg-slate-50 border-2 border-gray-600 rounded-xl px-4 py-3 text-base font-medium text-slate-700 focus:border-gray-700 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`rounded-full p-2 flex items-center justify-center border-2 border-gray-600 transition-colors ${
              inputValue.trim()
                ? 'bg-fuchsia-400 hover:bg-fuchsia-500'
                : 'bg-fuchsia-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default AdvisorPage;
