import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { Button } from "@/ui/button"
import { Progress } from "@/ui/progress"
import { BookOpen, Video, FileText, CheckCircle } from "lucide-react"
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AnimatedCard = motion(Card);

const HoverCard = styled(AnimatedCard)`
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export default function Education() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Music Production Basics', progress: 75, totalLessons: 10, completedLessons: 7 },
    { id: 2, title: 'Advanced Songwriting', progress: 30, totalLessons: 8, completedLessons: 2 },
    { id: 3, title: 'Music Business 101', progress: 100, totalLessons: 6, completedLessons: 6 },
  ])

  const handleStartCourse = (id: number) => {
    // Logic to start or continue the course
    console.log(`Starting course ${id}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Education Hub</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <HoverCard key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" /> {course.title}
              </CardTitle>
              <CardDescription>
                {course.completedLessons} of {course.totalLessons} lessons completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-500">{course.progress}% complete</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleStartCourse(course.id)} className="w-full">
                {course.progress === 100 ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Completed
                  </>
                ) : (
                  <>
                    <Video className="mr-2 h-4 w-4" /> {course.progress === 0 ? 'Start' : 'Continue'} Course
                  </>
                )}
              </Button>
            </CardFooter>
          </HoverCard>
        ))}
      </div>

      <HoverCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Additional learning materials</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center text-blue-500 hover:underline">
                <FileText className="mr-2 h-4 w-4" /> Music Theory Cheat Sheet
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-blue-500 hover:underline">
                <FileText className="mr-2 h-4 w-4" />  Royalty Calculation Guide
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-blue-500 hover:underline">
                <FileText className="mr-2 h-4 w-4" /> Marketing Strategies for Musicians
              </a>
            </li>
          </ul>
        </CardContent>
      </HoverCard>
    </div>
  )
}