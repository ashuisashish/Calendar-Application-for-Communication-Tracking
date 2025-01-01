import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotificationsPopover = () => {
  // Mock data - replace with actual data
  const overdueCount = 3;
  const dueTodayCount = 2;
  const overdueCompanies = [
    { id: 1, name: "ENTNT", dueDate: "2024-03-15" },
    { id: 2, name: "Tech Corp", dueDate: "2024-03-14" },
    { id: 3, name: "Digital Solutions", dueDate: "2024-03-13" },
  ];
  const dueTodayCompanies = [
    { id: 4, name: "Innovation Inc", dueDate: "2024-03-20" },
    { id: 5, name: "Future Systems", dueDate: "2024-03-20" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className="flex items-center gap-2 relative">
          <span className="text-gray-800 font-medium">Notifications</span>
          <div className="relative">
            <Bell className="h-5 w-5" />
            {(overdueCount + dueTodayCount) > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {overdueCount + dueTodayCount}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-red-600 mb-2">Overdue Communications</h3>
            <div className="space-y-2">
              {overdueCompanies.map((company) => (
                <div
                  key={company.id}
                  className="text-sm p-2 bg-red-50 rounded-md"
                >
                  <div className="font-medium">{company.name}</div>
                  <div className="text-gray-500">Due: {company.dueDate}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-yellow-600 mb-2">Due Today</h3>
            <div className="space-y-2">
              {dueTodayCompanies.map((company) => (
                <div
                  key={company.id}
                  className="text-sm p-2 bg-yellow-50 rounded-md"
                >
                  <div className="font-medium">{company.name}</div>
                  <div className="text-gray-500">Due: {company.dueDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
