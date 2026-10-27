import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Auth from './Auth'

const transactions = [
  { icon: '🛒', name: 'Grocery Shopping', category: 'Food', date: 'Oct 26, 2026', amount: '-₹2,450', type: 'expense' },
  { icon: '💻', name: 'Freelance Project', category: 'Income', date: 'Oct 25, 2026', amount: '+₹12,000', type: 'income' },
  { icon: '🚕', name: 'Uber Ride', category: 'Transport', date: 'Oct 24, 2026', amount: '-₹380', type: 'expense' },
  { icon: '🎬', name: 'Movie Night', category: 'Entertainment', date: 'Oct 23, 2026', amount: '-₹650', type: 'expense' },
  { icon: '💰', name: 'Monthly Salary', category: 'Income', date: 'Oct 22, 2026', amount: '+₹35,000', type: 'income' },
]

const categories = [
  { name: 'Food & Dining', amount: '₹8,450', width: '82%', color: '' },
  { name: 'Shopping', amount: '₹5,200', width: '61%', color: 'c2' },
  { name: 'Transport', amount: '₹2,800', width: '39%', color: 'c3' },
  { name: 'Entertainment', amount: '₹1,900', width: '27%', color: 'c4' },
  { name: 'Bills & Utilities', amount: '₹1,250', width: '18%', color: 'c5' },
]


function App() {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem('spendwise_token')
  );

  function handleLogin(newToken: string) {
    localStorage.setItem('spendwise_token', newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem('spendwise_token');
    setToken(null);
  }

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }


  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">S</div>
          <div className="logo-name">Spend<span>Wise</span></div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <button className="nav-item active"><span className="nav-icon">▦</span> Dashboard</button>
        <button className="nav-item"><span className="nav-icon">↔</span> Transactions</button>
        <button className="nav-item"><span className="nav-icon">▤</span> Budgets</button>
        <button className="nav-item"><span className="nav-icon">◔</span> Analytics</button>

        <div className="nav-label" style={{ marginTop: 30 }}>PREFERENCES</div>
        <button className="nav-item"><span className="nav-icon">⚙</span> Settings</button>
        <div className="sidebar-bottom">
          <div style={{ fontSize: 22 }}>✦</div>
          <p><strong>Make your money work smarter.</strong><br />Track every rupee and build better habits.</p>
          
<button className="upgrade" onClick={() => alert('Budget planning is coming soon!')}>Explore features ↗</button>
<button className="upgrade" onClick={handleLogout}>Log out</button>

        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow">YOUR FINANCIAL OVERVIEW</div>
            <h1>Dashboard</h1>
          </div>
          <div className="top-actions">
            <select className="month-select" defaultValue="October 2026">
              <option>October 2026</option>
              <option>September 2026</option>
              <option>August 2026</option>
            </select>
            <div className="avatar">S</div>
          </div>
        </header>

        <div className="welcome">Welcome back! Here's what's happening with your money.</div>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-head"><span>Total Balance</span><span className="stat-icon purple">◈</span></div>
            <div className="amount">₹48,560.00</div>
            <div className="trend">↗ 12.8% <span className="trend muted">vs. last month</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-head"><span>Total Income</span><span className="stat-icon green">↙</span></div>
            <div className="amount">₹52,000.00</div>
            <div className="trend">↗ 8.2% <span className="trend muted">vs. last month</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-head"><span>Total Expenses</span><span className="stat-icon orange">↗</span></div>
            <div className="amount">₹18,600.00</div>
            <div className="trend" style={{ color: '#ffbd85' }}>↘ 3.4% <span className="trend muted">vs. last month</span></div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-heading">
              <h2>Income vs Expenses</h2>
              <span>Last 6 months</span>
            </div>
            <div className="chart">
              {[
                ['May', 45, 32], ['Jun', 62, 40], ['Jul', 53, 35],
                ['Aug', 75, 48], ['Sep', 64, 39], ['Oct', 88, 45],
              ].map(([month, income, expense]) => (
                <div className="bar-group" key={String(month)}>
                  <div className="bar-pair">
                    <div className="bar" style={{ height: `${income}%` }} />
                    <div className="bar secondary" style={{ height: `${expense}%` }} />
                  </div>
                  <div className="bar-label">{month}</div>
                </div>
              ))}
            </div>
            <div className="legend"><span><i className="dot" />Income</span><span><i className="dot green-dot" />Expenses</span></div>
          </div>

          <div className="panel">
            <div className="panel-heading"><h2>Spending by Category</h2><span>This month</span></div>
            <div className="category-list">
              {categories.map(category => (
                <div className="category-row" key={category.name}>
                  <div className="category-info"><span>{category.name}</span><strong>{category.amount}</strong></div>
                  <div className="progress"><div className={`progress-fill ${category.color}`} style={{ width: category.width }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel transactions">
          <div className="panel-heading">
            <h2>Recent Transactions</h2>
            <button className="primary" onClick={() => alert('Transaction management will be connected next!')}>+ Add Transaction</button>
          </div>
          <table className="transaction-table">
            <thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th style={{ textAlign: 'right' }}>AMOUNT</th></tr></thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.name}>
                  <td><div className="transaction-name"><span className="tx-icon">{transaction.icon}</span>{transaction.name}</div></td>
                  <td><span className="pill">{transaction.category}</span></td>
                  <td>{transaction.date}</td>
                  <td className={transaction.type === 'income' ? 'positive' : 'negative'} style={{ textAlign: 'right' }}>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="footer">SpendWise · Make every rupee count.</div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
