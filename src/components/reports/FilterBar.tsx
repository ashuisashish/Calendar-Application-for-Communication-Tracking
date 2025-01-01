import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  company: string;
  setCompany: (value: string) => void;
  communication: string;
  setCommunication: (value: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  onFilter: () => void;
}

export const FilterBar = ({
  company,
  setCompany,
  communication,
  setCommunication,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFilter,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
      {/* Company Dropdown */}
      <Select value={company} onValueChange={setCompany}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Company" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Company</SelectItem>
          <SelectItem value="ENTNT">ENTNT</SelectItem>
          <SelectItem value="GOOGLE">Google</SelectItem>
          <SelectItem value="MICROSOFT">Microsoft</SelectItem>
        </SelectContent>
      </Select>

      {/* Communication Dropdown */}
      <Select value={communication} onValueChange={setCommunication}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Communication" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All"> Communication</SelectItem>
          <SelectItem value="Email">Email</SelectItem>
          <SelectItem value="Phone">Phone Call</SelectItem>
          <SelectItem value="LinkedIn">LinkedIn Post</SelectItem>
          <SelectItem value="Chat">Chat</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
        {/* From Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full md:w-[200px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "dd-MM-yyyy") : <span>From date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* To Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full md:w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd-MM-yyyy") : <span>To date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Filter Button */}
        <Button className="w-full md:w-auto" onClick={onFilter}>
          FILTER
        </Button>
      </div>
    </div>
  );
};
