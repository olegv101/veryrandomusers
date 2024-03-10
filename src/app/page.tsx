'use client';
import Image from "next/image";
import Link from 'next/link'
// import Users from "./pages/users";
import { Button } from '@nextui-org/button';


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Heyull nah
      </h1>
      {/* <Users users={undefined} /> */}
      {/* <Link href="/dashboard">Dashboard</Link> */}
      
      <Link href="/about">About</Link>
      <div>
        <Button>
          <Link href="/users">Go to Users</Link>
        </Button>
      </div>
    </main>
  );
}
