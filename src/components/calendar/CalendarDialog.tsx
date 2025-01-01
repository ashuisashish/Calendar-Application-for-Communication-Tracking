import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalendarDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample data - in a real app this would come from your backend
const events = [
  {
    date: new Date(2024, 11, 3), // December 3, 2024
    company: "AMAZON",
    type: "Other"
  },
  {
    date: new Date(2024, 11, 16), // December 16, 2024
    company: "ENTNT",
    type: "Email"
  },
  {
    date: new Date(2024, 11, 18), // December 18, 2024
    company: "AMAZON",
    type: "Phone Call"
  },
  {
    date: new Date(2024, 11, 20), // December 20, 2024
    company: "MICROSOFT",
    type: "Conference Call"
  },
  {
    date: new Date(2024, 11, 21), // December 21, 2024
    company: "ENTNT",
    type: "LinkedIn Post"
  },
  {
    date: new Date(2024, 11, 21), // December 21, 2024
    company: "GOOGLE",
    type: "Webinar"
  }
];

const CalendarDialog = ({ isOpen, onClose }: CalendarDialogProps) => {
  const renderDayContent = (day: Date) => {
    const dayEvents = events.filter(
      event => event.date.getDate() === day.getDate() &&
               event.date.getMonth() === day.getMonth() &&
               event.date.getFullYear() === day.getFullYear()
    );

    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 px-1 text-[10px]">
        {dayEvents.map((event, index) => (
          <div 
            key={index}
            className="truncate text-blue-600 bg-blue-50 rounded-sm px-1 mb-0.5"
          >
            {event.company} - {event.type}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Calendar View</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Calendar
            mode="single"
            className="rounded-md border"
            components={{
              Day: ({ date, ...props }) => (
                <div className="relative h-20 w-full border-t pt-1" {...props}>
                  <div className="absolute top-1 left-1">
                    {format(date, "d")}
                  </div>
                  {renderDayContent(date)}
                </div>
              )
            }}
            classNames={{
              head_cell: "w-20 font-semibold text-blue-600",
              cell: "h-20 w-20 p-0",
              nav_button_previous: "text-blue-600",
              nav_button_next: "text-blue-600",
              caption: "text-blue-600 text-lg font-semibold"
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;