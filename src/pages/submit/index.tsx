'use client'
import SubmitTicket from '../../components/SubmitTicket';
import Link from 'next/link';


export default function SubmitPage() {
    return (
        <div className='bg-color:black'>
            <Link href="/dashboard">Dashboard</Link>
            <SubmitTicket />
        </div>
    )
}