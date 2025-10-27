import React, {useState, useEffect, useRef} from 'react';
import {Send, Bot, User, DollarSign, TrendingUp, Target, AlertCircle} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

const AIAdvisorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'analyze-spending',
      label: 'Analyze Spending',
      icon: <TrendingUp className="w-4 h-4" />,
      prompt: 'Can you analyze my spending patterns and suggest areas where I can save money?'
    },
    {
      id: 'budget-optimization',
      label: 'Optimize Budget',
      icon: <Target className="w-4 h-4" />,
      prompt: 'Help me optimize my budget allocation based on my current spending habits.'
    },
    {
      id: 'find-savings',
      label: 'Find Savings',
      icon: <DollarSign className="w-4 h-4" />,
      prompt: 'What are some specific ways I can reduce my monthly expenses?'
    },
    {
      id: 'subscription-review',
      label: 'Review Subscriptions',
      icon: <AlertCircle className="w-4 h-4" />,
      prompt: 'Review my recurring subscriptions and suggest which ones I should consider canceling.'
    }
  ];

  useEffect(() => {
    // Load conversation history from localStorage
    const savedHistory = localStorage.getItem('ai-conversation-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setConversationHistory(parsed);
        // Convert to messages for display
        const displayMessages = parsed.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date()
        }));
        setMessages(displayMessages);
      } catch (error) {
        console.error('Error loading conversation history:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const saveConversationHistory = (history: any[]) => {
    setConversationHistory(history);
    localStorage.setItem('ai-conversation-history', JSON.stringify(history));
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, aiMessage]);
        saveConversationHistory(data.conversationHistory);
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.prompt);
  };

  const clearConversation = () => {
    setMessages([]);
    setConversationHistory([]);
    localStorage.removeItem('ai-conversation-history');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI Financial Advisor</h1>
              <p className="text-sm text-gray-500">Your personal finance coach</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 0 && (
        <div className="p-4 bg-white border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {action.icon}
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to your AI Financial Advisor!</h3>
            <p className="text-gray-500 mb-6">
              I can help you analyze your spending, optimize your budget, and find ways to save money.
            </p>
            <p className="text-sm text-gray-400">
              Try one of the quick actions above or ask me anything about your finances.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorPage;
