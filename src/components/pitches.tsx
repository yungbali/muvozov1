import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Label } from '@/ui/label';
import { FaMusic } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
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

export default function Pitches() {
  const [pitches, setPitches] = useState([
    { id: 1, title: 'Summer Hit', description: 'Upbeat pop song for summer playlist', status: 'Pending' },
    { id: 2, title: 'Movie Soundtrack', description: 'Emotional ballad for upcoming drama film', status: 'Accepted' },
  ]);
  const [newPitch, setNewPitch] = useState({ title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPitches([...pitches, { ...newPitch, id: Date.now(), status: 'Pending' }]);
    setNewPitch({ title: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Music Pitches</h1>
      
      <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <CardHeader>
          <CardTitle>Submit a New Pitch</CardTitle>
          <CardDescription>Pitch your music to potential clients</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newPitch.title}
                onChange={(e) => setNewPitch({...newPitch, title: e.target.value})}
                placeholder="Enter pitch title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newPitch.description}
                onChange={(e) => setNewPitch({...newPitch, description: e.target.value})}
                placeholder="Describe your pitch"
                required
              />
            </div>
            <AnimatedButton type="submit" className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IoSend className="mr-2 h-4 w-4" /> Submit Pitch
            </AnimatedButton>
          </form>
        </CardContent>
      </HoverCard>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pitches.map((pitch) => (
          <HoverCard key={pitch.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaMusic className="mr-2" /> {pitch.title}
              </CardTitle>
              <CardDescription>{pitch.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <p className={`text-sm font-semibold ${
                pitch.status === 'Accepted' ? 'text-green-500' : 'text-yellow-500'
              }`}>
                Status: {pitch.status}
              </p>
            </CardFooter>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}