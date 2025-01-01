import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { MessageSquare, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommunicationForm from "@/components/communication/CommunicationForm";
import NotificationsPopover from "@/components/notifications/NotificationsPopover";
import CalendarDialog from "@/components/calendar/CalendarDialog";

const companiesData = [
  {
    name: "ENTNT",
    location: "Abu Dhabi",
    lastCommunications: [
      { type: "Other", date: "2024-12-19" },
      { type: "LinkedIn Post", date: "2024-12-20" },
      { type: "Email", date: "2024-12-15" },
    ],
    nextDue: { type: "Other", date: "2024-12-19" },
  },
  {
    name: "GOOGLE",
    location: "California, US",
    lastCommunications: [
      { type: "Email", date: "2024-12-25" },
      { type: "Webinar", date: "2024-12-20" },
    ],
    nextDue: { type: "Email", date: "2024-12-25" },
  },
  {
    name: "MICROSOFT",
    location: "Washington, US",
    lastCommunications: [
      { type: "Email", date: "2024-12-26" },
      { type: "Conference Call", date: "2024-12-19" },
    ],
    nextDue: { type: "Email", date: "2024-12-26" },
  },
  {
    name: "AMAZON",
    location: "Seattle, US",
    lastCommunications: [
      { type: "Email", date: "2024-12-28" },
      { type: "Newsletter", date: "2024-12-21" },
      { type: "Phone Call", date: "2024-12-17" },
    ],
    nextDue: { type: "Email", date: "2024-12-28" },
  },
];

const UserPage = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showCommunicationForm, setShowCommunicationForm] = useState(false);
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [editCommunication, setEditCommunication] = useState<{
    type: string;
    date: Date;
    notes: string;
  } | null>(null);

  const handleEdit = (type: string, date: string, notes: string) => {
    setEditCommunication({
      type,
      date: new Date(date),
      notes,
    });
    setShowCommunicationForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Company Communications</h1>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => setShowCalendarDialog(true)}
            >
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </Button>
            <NotificationsPopover />
            <Button
              className="flex items-center space-x-2"
              onClick={() => {
                setEditCommunication(null);
                setShowCommunicationForm(true);
              }}
              disabled={selectedCompanies.length === 0}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Communication Performed</span>
            </Button>
          </div>
        </div>

        <div className="bg-pink-100 rounded-lg shadow p-6">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Select</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Last 5 Communications</th>
                    <th className="text-left py-3 px-4">Next Due</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesData.map((company) => (
                    <tr key={company.name} className="border-b">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            setSelectedCompanies((prev) =>
                              e.target.checked
                                ? [...prev, company.name]
                                : prev.filter((c) => c !== company.name)
                            );
                          }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.location}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap space-x-2">
                          {company.lastCommunications.map((comm, index) => (
                            <span
                              key={index}
                              className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
                              onClick={() =>
                                handleEdit(
                                  comm.type,
                                  comm.date,
                                  `${comm.type} communication with ${company.name}`
                                )
                              }
                            >
                              {comm.type} {comm.date}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-red-600">
                          {company.nextDue.type}
                          <div className="text-sm">{company.nextDue.date}</div>
                          <button className="text-gray-500 text-sm hover:text-gray-700">
                            Disable Highlight
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() =>
                            handleEdit(
                              company.nextDue.type,
                              company.nextDue.date,
                              `${company.nextDue.type} scheduled with ${company.name}`
                            )
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <CommunicationForm
          isOpen={showCommunicationForm}
          onClose={() => {
            setShowCommunicationForm(false);
            setEditCommunication(null);
          }}
          selectedCompanies={selectedCompanies}
          editData={editCommunication || undefined}
        />

        <CalendarDialog
          isOpen={showCalendarDialog}
          onClose={() => setShowCalendarDialog(false)}
        />
      </div>
    </Layout>
  );
};

export default UserPage;