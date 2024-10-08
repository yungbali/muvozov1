import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Users, UserPlus, MessageSquare } from "lucide-react"
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedCard = motion(Card);

const HoverCard = styled(AnimatedCard)`
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export default function Networking() {
  const [connections, setConnections] = useState([
    { id: 1, name: 'John Doe', role: 'Producer', status: 'Connected' },
    { id: 2, name: 'Jane Smith', role: 'Songwriter', status: 'Pending' },
  ])
  const [newConnection, setNewConnection] = useState({ name: '', role: '' })

  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault()
    setConnections([...connections, { ...newConnection, id: Date.now(), status: 'Pending' }])
    setNewConnection({ name: '', role: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Networking</h1>
      
      <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <CardHeader>
          <CardTitle>Add New Connection</CardTitle>
          <CardDescription>Expand your professional network</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddConnection} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newConnection.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewConnection({...newConnection, name: e.target.value})}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={newConnection.role}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewConnection({...newConnection, role: e.target.value})}
                placeholder="Enter role"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Add Connection
            </Button>
          </form>
        </CardContent>
      </HoverCard>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => (
          <HoverCard key={connection.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" /> {connection.name}
              </CardTitle>
              <CardDescription>{connection.role}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <p className={`text-sm font-semibold ${
                connection.status === 'Connected' ? 'text-green-500' : 'text-yellow-500'
              }`}>
                {connection.status}
              </p>
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </Button>
            </CardFooter>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}