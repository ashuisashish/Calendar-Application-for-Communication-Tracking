import { BarChart3, Users, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">ENTNT</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin")
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Admin</span>
        </Link>
        <Link
          to="/user"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/user")
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Users className="h-5 w-5" />
          <span>User</span>
        </Link>
        <Link
          to="/reports"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/reports")
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Bell className="h-5 w-5" />
          <span>Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;