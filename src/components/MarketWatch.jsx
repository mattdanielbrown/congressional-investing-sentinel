import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';
import useStore from '@/store';

export default function MarketWatch() {
  const { members, trades } = useStore();

  // Mock data for initial UI before full API integration
  const mockTrades = [
    { id: 1, member: 'Nancy Pelosi', ticker: 'NVDA', type: 'Purchase', amount: '$1M - $5M', conflictScore: 92, date: '2026-04-20' },
    { id: 2, member: 'Tommy Tuberville', ticker: 'TSLA', type: 'Sale', amount: '$500K - $1M', conflictScore: 45, date: '2026-04-18' },
    { id: 3, member: 'Ro Khanna', ticker: 'AAPL', type: 'Purchase', amount: '$15K - $50K', conflictScore: 12, date: '2026-04-15' },
    { id: 4, member: 'Dan Crenshaw', ticker: 'MSFT', type: 'Purchase', amount: '$50K - $100K', conflictScore: 68, date: '2026-04-12' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Market Watch</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4 animate-pulse text-green-500" />
          <span>Live Sentinel Feed</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Tracked Trades</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">High Conflict Alerts</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-gray-500">Cs &gt; 85 Threshold</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Congressional Disclosures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value Range</TableHead>
                <TableHead>Conflict Score (Cs)</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">{trade.member}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {trade.ticker} <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      trade.type === 'Purchase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{trade.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${trade.conflictScore > 80 ? 'bg-red-500' : trade.conflictScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                          style={{ width: `${trade.conflictScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{trade.conflictScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-500">{trade.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
