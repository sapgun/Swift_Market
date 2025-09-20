import React, { useMemo, useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import VerifiedBadge from '../components/VerifiedBadge';

const TABS = ['My Sales', 'My Purchases', 'Settings'] as const;
type DashboardTab = (typeof TABS)[number];

interface TableRow {
  id: string;
  title: string;
  counterparty: string;
  amount: string;
  status: 'in-escrow' | 'shipped' | 'completed' | 'cancelled';
  updatedAt: string;
}

const sampleSales: TableRow[] = [
  {
    id: 'esc-19A21F',
    title: 'Tokenized Art Series #12',
    counterparty: 'Jane Miller',
    amount: 'USD 2,450',
    status: 'in-escrow',
    updatedAt: '2 minutes ago',
  },
  {
    id: 'esc-27B44Q',
    title: 'Rare XRPL Domain',
    counterparty: 'Ahmed Ali',
    amount: 'XRP 880',
    status: 'shipped',
    updatedAt: '1 hour ago',
  },
];

const samplePurchases: TableRow[] = [
  {
    id: 'esc-77C92K',
    title: 'Hardware Wallet Bundle',
    counterparty: 'Swift Vaults',
    amount: 'USD 320',
    status: 'completed',
    updatedAt: 'Yesterday',
  },
  {
    id: 'esc-45D11P',
    title: 'XRPL Validator Node Support',
    counterparty: 'Validator Labs',
    amount: 'USD 1,200',
    status: 'in-escrow',
    updatedAt: 'Just now',
  },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('My Sales');

  const tableData = useMemo(() => {
    switch (activeTab) {
      case 'My Sales':
        return sampleSales;
      case 'My Purchases':
        return samplePurchases;
      default:
        return [];
    }
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="space-y-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-inner sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Swift Market Account</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your trading cockpit</h1>
            <p className="mt-2 text-sm text-slate-500">
              Monitor escrow progress, fulfill shipments, and configure trust preferences for global XRPL trades.
            </p>
          </div>
          <div className="space-y-2 text-right">
            <VerifiedBadge label="Seller Verified" />
            <p className="text-xs text-slate-400">Connected wallet: rXRP…1F</p>
          </div>
        </header>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-swift-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Settings' ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
                <h2 className="text-sm font-semibold text-slate-900">Settlement preferences</h2>
                <p className="mt-2 text-xs text-slate-500">
                  Choose default currencies and automatic settlement times to streamline future escrows.
                </p>
                <button className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-swift-blue hover:text-swift-blue">
                  Manage preferences
                </button>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
                <h2 className="text-sm font-semibold text-slate-900">Security center</h2>
                <p className="mt-2 text-xs text-slate-500">
                  Enable multi-factor approvals and review recent device sign-ins to keep your account secure.
                </p>
                <button className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-swift-blue hover:text-swift-blue">
                  Review security events
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Escrow ID</th>
                    <th className="px-6 py-4">Listing</th>
                    <th className="px-6 py-4">Counterparty</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{row.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.title}</td>
                      <td className="px-6 py-4 text-slate-600">{row.counterparty}</td>
                      <td className="px-6 py-4 text-slate-900">{row.amount}</td>
                      <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                      <td className="px-6 py-4 text-slate-500">{row.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!tableData.length && (
                <div className="p-10 text-center text-sm text-slate-500">No records yet. Start trading to populate this view.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
