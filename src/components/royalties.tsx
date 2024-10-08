import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Progress } from '@/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import { BarChart, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedCard = motion(Card);
const AnimatedButton = motion(Button);

const HoverCard = styled(AnimatedCard)`
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export default function Royalties() {
  const [totalRoyalties, setTotalRoyalties] = useState(0);
  const [royaltyData, setRoyaltyData] = useState([
    { platform: 'Spotify', streams: 1000000, amount: 4000 },
    { platform: 'Apple Music', streams: 750000, amount: 3000 },
    { platform: 'YouTube Music', streams: 500000, amount: 2000 },
    { platform: 'Amazon Music', streams: 250000, amount: 1000 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const total = royaltyData.reduce((sum, item) => sum + item.amount, 0);
    setTotalRoyalties(total);
  }, [royaltyData]);

  const simulateRoyaltyIncrease = async () => {
    setIsLoading(true);
    // Simulating API call to AWS Lambda
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRoyaltyData((prevData) =>
      prevData.map((item) => ({
        ...item,
        streams: item.streams + Math.floor(Math.random() * 10000),
        amount: item.amount + Math.floor(Math.random() * 100),
      }))
    );
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Royalties Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Royalties</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">${totalRoyalties.toFixed(2)}</div>
            <Progress value={(totalRoyalties / 15000) * 100} className="mt-2 bg-yellow-200" />
          </CardContent>
        </HoverCard>
        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Total Streams</CardTitle>
            <BarChart className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {royaltyData.reduce((sum, item) => sum + item.streams, 0).toLocaleString()}
            </div>
          </CardContent>
        </HoverCard>
        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">+12.5%</div>
            <p className="text-xs text-yellow-700">Compared to last month</p>
          </CardContent>
        </HoverCard>
      </div>

      <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <CardHeader>
          <CardTitle className="text-black">Royalty Breakdown</CardTitle>
          <CardDescription className="text-yellow-700">Your earnings from various streaming platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Platform</TableHead>
                <TableHead className="text-black">Streams</TableHead>
                <TableHead className="text-black">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {royaltyData.map((item) => (
                <TableRow key={item.platform}>
                  <TableCell className="text-black">{item.platform}</TableCell>
                  <TableCell className="text-black">{item.streams.toLocaleString()}</TableCell>
                  <TableCell className="text-black">${item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AnimatedButton onClick={simulateRoyaltyIncrease} disabled={isLoading} className="bg-yellow-500 text-black hover:bg-yellow-600" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Simulate Royalty Increase'}
                </AnimatedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Uses AWS Lambda to calculate royalties</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </HoverCard>
    </div>
  );
}