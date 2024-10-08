import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedCard = motion(Card);

const HoverCard = styled(AnimatedCard)`
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Analytics Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2" /> Stream Analytics
            </CardTitle>
            <CardDescription>Your music streaming performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between">
              {[40, 60, 45, 70, 80, 52, 90].map((height, index) => (
                <div
                  key={index}
                  className="bg-yellow-400 w-[10%]"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </HoverCard>

        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2" /> Revenue Trend
            </CardTitle>
            <CardDescription>Your earnings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end">
              <div className="relative w-full h-full">
                <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-yellow-200 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-400"></div>
                <div className="absolute bottom-[80%] left-0 w-full h-[1px] bg-yellow-400"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-400"></div>
              </div>
            </div>
          </CardContent>
        </HoverCard>

        <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2" /> Audience Demographics
            </CardTitle>
            <CardDescription>Your listener base breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-8 border-yellow-400"></div>
                <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 rotate-[45deg]"></div>
                <div className="absolute inset-0 rounded-full border-8 border-transparent border-r-green-500 rotate-[165deg]"></div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-sm">18-24</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">25-34</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">35+</span>
              </div>
            </div>
          </CardContent>
        </HoverCard>
      </div>
    </div>
  )
}