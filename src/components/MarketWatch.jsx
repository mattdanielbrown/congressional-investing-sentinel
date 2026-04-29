import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, ArrowUpRight, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import useStore from '@/store';

export default function MarketWatch() {
  const { trades, clusters } = useStore();

  // Fallback to empty array if state isn't populated yet
  const displayTrades = trades || [];
  const displayClusters = clusters || [];

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
            <div className="text-2xl font-bold">{displayTrades.length}</div>
            <p className="text-xs text-gray-500">Local mock dataset</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Detected Clusters</CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{displayClusters.length}</div>
            <p className="text-xs text-gray-500">Multiple members buying same ticker</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-200 dark:border-amber-900">
        <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
          <CardTitle className="text-amber-900 dark:text-amber-100 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Sentinel Alerts: Cluster Insider Trading Detected
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Members Involved</TableHead>
                <TableHead>Total Trades</TableHead>
                <TableHead>Time Window</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayClusters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    No active clusters detected in current window.
                  </TableCell>
                </TableRow>
              )}
              {displayClusters.map((cluster) => (
                <TableRow key={cluster.id} className="bg-amber-50/50 dark:bg-amber-900/10">
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono font-bold text-blue-600 dark:text-blue-400 text-lg">
                      {cluster.ticker} <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{cluster.memberCount} Members</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                      {cluster.members.join(', ')}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {cluster.totalTrades}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{cluster.startDate}</span> to <span className="font-medium">{cluster.endDate}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ({Math.round((new Date(cluster.endDate) - new Date(cluster.startDate)) / (1000 * 60 * 60 * 24))} days)
                    </div>
                  </TableCell>
                  <TableCell>
                     <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Coordinated Purchase
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Disclosures (All)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value Range</TableHead>
                <TableHead className="text-right">Transaction Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTrades.slice(0, 15).map((trade, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{trade.name} <span className="text-xs text-gray-500 ml-1">({trade.chamber})</span></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono font-bold text-gray-700 dark:text-gray-300">
                      {trade.ticker}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      trade.type === 'Purchase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">{trade.amountRange}</TableCell>
                  <TableCell className="text-right text-sm text-gray-500">{trade.transactionDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
