import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { DollarSign, CreditCard, Wallet as WalletIcon } from "lucide-react"
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedCard = motion(Card);

const HoverCard = styled(AnimatedCard)`
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export default function Wallet() {
  const [balance, setBalance] = useState(1000)
  const [amount, setAmount] = useState('')

  const handleDeposit = () => {
    setBalance(prevBalance => prevBalance + Number(amount))
    setAmount('')
  }

  const handleWithdraw = () => {
    if (Number(amount) <= balance) {
      setBalance(prevBalance => prevBalance - Number(amount))
      setAmount('')
    } else {
      alert('Insufficient funds')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Wallet</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <WalletIcon className="mr-2" /> Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
          </CardContent>
        </HoverCard>

        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader>
            <CardTitle>Transaction</CardTitle>
            <CardDescription>Deposit or withdraw funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleDeposit} className="bg-green-500 hover:bg-green-600">
              <DollarSign className="mr-2 h-4 w-4" /> Deposit
            </Button>
            <Button onClick={handleWithdraw} className="bg-red-500 hover:bg-red-600">
              <CreditCard className="mr-2 h-4 w-4" /> Withdraw
            </Button>
          </CardFooter>
        </HoverCard>
      </div>
    </div>
  )
}