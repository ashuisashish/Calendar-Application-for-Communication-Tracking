import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { CommunicationMethod } from "@/types/communication";

interface MethodsTableProps {
  methods: CommunicationMethod[];
  onEdit: (method: CommunicationMethod) => void;
  onDelete: (id: string) => void;
}

export const MethodsTable = ({ methods, onEdit, onDelete }: MethodsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Sequence</TableHead>
            <TableHead>Mandatory</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {methods.map((method) => (
            <TableRow key={method.id}>
              <TableCell>{method.name}</TableCell>
              <TableCell>{method.description}</TableCell>
              <TableCell>{method.sequence}</TableCell>
              <TableCell>{method.mandatory ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(method)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};