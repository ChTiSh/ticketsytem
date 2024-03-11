import useSWR from 'swr'
import { Ticket, columns } from "@/components/Columns"
import { DataTable } from "@/components/DataTable"
 
//getting tickets data from api and displaying it
//if each ticket is clicked it will redirect to ticket details page
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GetTickets() {
    
  const { data, error } = useSWR('/api/tickets-data', fetcher)
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  )
}