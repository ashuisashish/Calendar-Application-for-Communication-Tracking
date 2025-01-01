import { Button } from "@/components/ui/button";
import { activityData } from "@/data/activityData";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { format } from "date-fns";

interface ExportButtonsProps {
  company: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export const ExportButtons = ({ company, startDate, endDate }: ExportButtonsProps) => {
  const { toast } = useToast();

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Communication Reports", 15, 15);
    
    doc.setFontSize(12);
    doc.text(`Company: ${company}`, 15, 25);
    doc.text(`Date Range: ${startDate ? format(startDate, "dd/MM/yyyy") : ''} - ${endDate ? format(endDate, "dd/MM/yyyy") : ''}`, 15, 35);
    
    autoTable(doc, {
      head: [["Timestamp", "User", "Action", "Company", "Details"]],
      body: activityData.map(item => [
        item.timestamp,
        item.user,
        item.action,
        item.company,
        item.details
      ]),
      startY: 45
    });
    
    doc.save("communication-report.pdf");
    
    toast({
      title: "Success",
      description: "PDF report has been downloaded successfully",
    });
  };

  const exportToCSV = () => {
    const csvData = [
      ["Timestamp", "User", "Action", "Company", "Details"],
      ...activityData.map(item => [
        item.timestamp,
        item.user,
        item.action,
        item.company,
        item.details
      ])
    ];
    
    const csvString = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "communication-report.csv");
    
    toast({
      title: "Success",
      description: "CSV report has been downloaded successfully",
    });
  };

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
      <Button 
        variant="outline" 
        className="w-full md:w-auto flex items-center justify-center"
        onClick={exportToCSV}
      >
        Export CSV
      </Button>
      <Button 
        variant="outline" 
        className="w-full md:w-auto flex items-center justify-center"
        onClick={exportToPDF}
      >
        Export PDF
      </Button>
    </div>
  );
};