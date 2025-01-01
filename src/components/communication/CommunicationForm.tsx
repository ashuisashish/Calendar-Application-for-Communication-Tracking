import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface CommunicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompanies: string[];
  editData?: {
    type: string;
    date: Date;
    notes: string;
  };
}

const CommunicationForm = ({
  isOpen,
  onClose,
  selectedCompanies,
  editData,
}: CommunicationFormProps) => {
  const [type, setType] = useState("");
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setDate(editData.date);
      setNotes(editData.notes);
    }
  }, [editData]);

  const handleSubmit = () => {
    if (!type || !date || !notes) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Format date as DD/MM/YYYY for display
    const formattedDate = format(date, "dd/MM/yyyy");
    console.log({ type, date: formattedDate, notes, selectedCompanies });
    
    toast({
      title: "Success",
      description: editData 
        ? "Communication updated successfully"
        : "Communication recorded successfully",
    });
    
    // Reset form
    setType("");
    setDate(undefined);
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-xl font-semibold text-blue-600">
            Log New Communication
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600">Type of Communication</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin_post">LinkedIn Post</SelectItem>
                <SelectItem value="linkedin_message">LinkedIn Message</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone_call">Phone Call</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600">Date of Communication</label>
            <div className="relative">
              <Input
                type="text"
                value={date ? format(date, "dd/MM/yyyy") : ""}
                placeholder="dd/mm/yyyy"
                readOnly
                className="cursor-pointer border-gray-300"
                onClick={() => setShowCalendar(!showCalendar)}
              />
              {showCalendar && (
                <div className="absolute z-50 mt-1 bg-white border rounded-md shadow-lg">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setShowCalendar(false);
                    }}
                    className="rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600">Add Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any additional comments..."
              className="min-h-[100px] border-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-gray-600 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationForm;