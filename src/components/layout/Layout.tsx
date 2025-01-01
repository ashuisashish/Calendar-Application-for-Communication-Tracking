import { Bell, LayoutDashboard, User, BarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const navigation = [
    {
      name: "Admin",
      href: "/admin",
      icon: LayoutDashboard,
      current: location.pathname === "/admin",
    },
    {
      name: "User",
      href: "/user",
      icon: User,
      current: location.pathname === "/user",
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart,
      current: location.pathname === "/reports",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isMobile ? "w-64" : "w-64"
        } bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-bold text-blue-600">ENTNT</h1>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                item.current
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  item.current ? "text-blue-600" : "text-gray-400"
                }`}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? (isMobile ? "ml-0" : "ml-64") : "ml-0"
        }`}
      >
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <h2 className="text-lg md:text-2xl font-bold text-blue-600 truncate">
          Calendar 
          Application for Communication Tracking By Ashish Singh
          </h2>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
          </button>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;