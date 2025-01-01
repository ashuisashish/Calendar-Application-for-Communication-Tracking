import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CommunicationMethod } from "@/types/communication";

interface MethodFormProps {
  editingMethod: CommunicationMethod | null;
  onSubmit: (data: any) => void;
}

export const MethodForm = ({ editingMethod, onSubmit }: MethodFormProps) => {
  const form = useForm({
    defaultValues: {
      name: editingMethod?.name || "",
      description: editingMethod?.description || "",
      sequence: editingMethod?.sequence || 1,
      mandatory: editingMethod?.mandatory || true
    }
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {editingMethod ? "Edit Method" : "Add New Method"}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter method name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sequence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sequence</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mandatory"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Mandatory</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {editingMethod ? "Update Method" : "Add Method"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};