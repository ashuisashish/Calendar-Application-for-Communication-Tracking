import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { MethodForm } from "./MethodForm";
import { MethodsTable } from "./MethodsTable";
import { CommunicationMethod } from "@/types/communication";

const CommunicationMethods = () => {
  const [methods, setMethods] = useState<CommunicationMethod[]>([
    {
      id: "1",
      name: "LinkedIn Post",
      description: "Share or interact with company posts on LinkedIn",
      sequence: 1,
      mandatory: true
    },
    {
      id: "2",
      name: "LinkedIn Message",
      description: "launch the grand iphone 16",
      sequence: 2,
      mandatory: true
    },
    {
      id: "3",
      name: "Email",
      description: "cancelled freshers hiring",
      sequence: 3,
      mandatory: true
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<CommunicationMethod | null>(null);

  const onSubmit = (data: any) => {
    if (editingMethod) {
      setMethods(methods.map(method => 
        method.id === editingMethod.id 
          ? { ...data, id: editingMethod.id }
          : method
      ));
      toast.success("Method updated successfully");
    } else {
      const newMethod = {
        id: Date.now().toString(),
        ...data
      };
      setMethods([...methods, newMethod]);
      toast.success("Method added successfully");
    }
    setIsOpen(false);
    setEditingMethod(null);
  };

  const handleEdit = (method: CommunicationMethod) => {
    setEditingMethod(method);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setMethods(methods.filter(method => method.id !== id));
    toast.success("Method deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Communication Methods</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setEditingMethod(null);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Method
            </Button>
          </DialogTrigger>
          <MethodForm 
            editingMethod={editingMethod}
            onSubmit={onSubmit}
          />
        </Dialog>
      </div>

      <MethodsTable 
        methods={methods}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CommunicationMethods;