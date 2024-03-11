"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type TicketStatus = 'new' | 'in progress' | 'resolved';

export interface Ticket {
  ticket_id: number;
  name: string;
  email: string;
  description: string;
  status: TicketStatus;
  created_at: Date;
  updated_at: Date;
}

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticket_id",
    header: "Ticket-ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
