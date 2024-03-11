import SubmitTicket from '../components/SubmitTicket';
import Link from 'next/link';

export default function Page() {
    return (
        <div>
            <Link href="/dashboard">Dashboard</Link>
            <SubmitTicket />
        </div>
    )
}