//ui imports
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

//funcitonal imports
import { useState } from "react";
import { Ticket } from "./Columns";
import useSWR from "swr";
import { mutate } from "swr";

export function ViewTicketSheet({ ticket }: { ticket: Ticket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(ticket.status);
  const [newResponse, setNewResponse] = useState({
    ticket_id: ticket.ticket_id,
    responder_name: "",
    response: "",
    status: newStatus,
  });
  //fetching the response data from the api
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error } = useSWR('/api/response-data', fetcher)

  const handleResponse = () => {
    mutate('/api/response-data', [...data, newResponse], false);
  }


  //this component will udpate to the response and ticket table, new response, status and updated_at
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ticket Details</SheetTitle>
        </SheetHeader>
        {/* Render ticket details here */}
        <p>Ticket ID: {ticket.ticket_id}</p>
        <p>Name: {ticket.name}</p>
        <p>Email: {ticket.email}</p>
        <p>Description: {ticket.description}</p>
        <p>Status: {ticket.status}</p>
        <p>Created At: {ticket.created_at.toLocaleString()}</p>
        <p>Updated At: {ticket.updated_at.toLocaleString()}</p>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="picture">Name</Label>
          <Input id="responder_name" type="text" value={newResponse.responder_name}
      onChange={(e) =>
        setNewResponse({
          ...data,
          responder_name: e.target.value,
        })
      }/>
          <Label htmlFor="response">Your Response</Label>
          <Checkbox id="status" checked={newStatus === "resolved"} onChange={() => setNewStatus(newStatus === "resolved" ? "in progress" : "resolved")} />
          <Textarea placeholder="Type your response here." id="response" />
          <Button onClick={handleResponse}>Send response</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}