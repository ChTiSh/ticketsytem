import useSWR from 'swr'
 
//fetching single ticket data from api and displaying it
function GetTickets() {
    
  const { data, error } = useSWR(() => '/api/tickets-data', key => {})
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <h1>{data}</h1>
    </div>
  )
}