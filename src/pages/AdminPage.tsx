import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Edit, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CommunicationMethods from "@/components/admin/CommunicationMethods";

interface Company {
  id: string;
  name: string;
  location: string;
  communicationPeriod: number;
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'methods'>('companies');
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "ENTNT",
      location: "Abu Dhabi",
      communicationPeriod: 7,
    },
    {
      id: "2",
      name: "APPLE",
      location: "California, US",
      communicationPeriod: 9,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false); // Track dialog open/close
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null); // Track the company being edited

  // React Hook Form setup
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      communicationPeriod: 7,
    },
  });

  // Add or Edit Company logic
  const onSubmit = (data: any) => {
    const { name, location, communicationPeriod } = data;

    if (!name || !location || !communicationPeriod) {
      toast.error("All fields are required!");
      return;
    }

    if (selectedCompany) {
      // Update existing company
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === selectedCompany.id ? { ...company, ...data } : company
        )
      );
      toast.success("Company updated successfully");
    } else {
      // Add new company
      const newCompany = {
        id: Date.now().toString(),
        ...data,
      };
      setCompanies([...companies, newCompany]);
      toast.success("Company added successfully");
    }

    // Reset form and close dialog
    handleDialogClose();
  };

  // Open the dialog for adding or editing
  const handleDialogOpen = (company: Company | null = null) => {
    setSelectedCompany(company);
    if (company) {
      // Populate form with existing company data for editing
      form.reset({
        name: company.name,
        location: company.location,
        communicationPeriod: company.communicationPeriod,
      });
    } else {
      // Reset form for adding a new company
      form.reset();
    }
    setDialogOpen(true);
  };

  // Close the dialog and reset the form
  const handleDialogClose = () => {
    setSelectedCompany(null);
    form.reset();
    setDialogOpen(false);
  };

  // Delete company
  const handleDelete = (id: string) => {
    setCompanies(companies.filter((company) => company.id !== id));
    toast.success("Company deleted successfully");
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Tab Switcher */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "companies" ? "default" : "outline"}
            onClick={() => setActiveTab("companies")}
          >
            Company Management
          </Button>
          <Button
            variant={activeTab === "methods" ? "default" : "outline"}
            onClick={() => setActiveTab("methods")}
          >
            Communication Methods
          </Button>
        </div>

        {/* Company Management Tab */}
        {activeTab === "companies" ? (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Company Management</h1>

              {/* Add/Edit Dialog Trigger */}
              <Dialog open={dialogOpen} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleDialogOpen()}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Company
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {selectedCompany ? "Edit Company" : "Add New Company"}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Company Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Location Field */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter location" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Communication Period Field */}
                      <FormField
                        control={form.control}
                        name="communicationPeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Communication Period (days)</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <Button type="submit" className="w-full">
                        {selectedCompany ? "Update Company" : "Add Company"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Table of Companies */}
            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Communication Period</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.location}</TableCell>
                      <TableCell>Every {company.communicationPeriod} days</TableCell>
                      <TableCell className="text-right">
                        {/* Edit Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleDialogOpen(company)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(company.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <CommunicationMethods />
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
