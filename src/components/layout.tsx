import { useState } from 'react'
import { Button } from "../ui/button" // Ensure this path is correct
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar" // Ensure this path is correct
import { Bell, Settings, LogOut, Sun, Moon, Cloud } from "lucide-react"
import Link from 'next/link'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip" // Corrected path

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const navItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Royalties", path: "/royalties", icon: "💰" },
    { name: "Wallet", path: "/wallet", icon: "👛" },
    { name: "Pitches", path: "/pitches", icon: "🎵" },
    { name: "Networking", path: "/networking", icon: "🤝" },
    { name: "Education", path: "/education", icon: "📚" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Legal", path: "/legal", icon: "⚖️" },
  ]

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-black text-yellow-300' : 'bg-yellow-50 text-black'}`}>
      {/* Sidebar */}
      <aside className={`${isDarkMode ? 'bg-gray-900' : 'bg-yellow-100'} w-64 min-h-screen p-4 ${isSidebarOpen ? '' : 'hidden'}`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-yellow-400">ArtistWallet</h1>
          <Button onClick={() => setIsSidebarOpen(false)}>
            <span className="sr-only">Close sidebar</span>
            &times;
          </Button>
        </div>
        <nav>
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <Button className="w-full justify-start mb-2 hover:bg-yellow-200 hover:text-black">
                <span className="mr-2">{item.icon}</span> {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className={`${isDarkMode ? 'bg-gray-900' : 'bg-yellow-200'} shadow-md p-4`}>
          <div className="flex items-center justify-between">
            {!isSidebarOpen && (
              <Button onClick={() => setIsSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                ☰
              </Button>
            )}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle dark mode</span>
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Cloud className="h-5 w-5 text-yellow-400" />
                      <span className="sr-only">AWS Status</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AWS Services: Operational</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${isDarkMode ? 'bg-black' : 'bg-yellow-50'} p-6`}>
          {children}
        </main>
      </div>
    </div>
  )
}