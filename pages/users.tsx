'use client';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import App from '@/app/usercard';

export async function getStaticProps() {

    // fetching data from the api
    const res = await fetch('https://randomuser.me/api/?results=3'); // fetch 2 users
    const data = await res.json();

    // transforming the data a lil
    const users = data.results.map((user: { login: { uuid: any; }; name: { first: any; last: any; }; email: any; picture: { large: any; }; number: string }) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.large, // using a larger picture
    }));

    //so we can use users as a prop
    return {
        props: { users },
    };

    try {
        // Code that may throw an error
    } catch (error) {
        console.error('Failed to fetch users:', error);
        // Return an empty array if the fetch fails
        return {
            props: { users: [] },
        };
    }
}

export default function Users({ users }: { users: Array<any> }) {

    type User = {
        id: {
            name: string;
            value: string;
        };
        picture: {
            large: string;
            medium: string;
            thumbnail: string;
        };
        name: {
            title: string;
            first: string;
            last: string;
        };
        email: string;

        phone: string;

    };

    const [selectedUser, setSelectedUser] = useState(null);

    const showUserDetail = (user: SetStateAction<null>) => {
        setSelectedUser(user);
    };

    //modal works by closing when the selectedUser is a falsy value
    const closeDetail = () => {
        setSelectedUser(null);
    };

    return (
        <div style = {{}}>
        
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <h1 style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 100, textAlign: 'center',
                fontFamily: 'Roboto, sans-serif'
            }}>Users</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user: User) => (
                    <div key={user.id} onClick={() => showUserDetail(user)} style={{ cursor: 'pointer', fontFamily: 'Roboto, sans-serif', margin: '10px', padding: '10px', border: '1px solid darkgray', borderRadius: 20
                }}>
                        <img src={user.picture} alt={user.name || ''} style={{ width: '50px', height: '50px' }} />
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <div style={{
                    fontFamily: 'Roboto, sans-serif', 
                    position: 'fixed', // Changed from 'absolute' to 'fixed'
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', // Added to center the div
                    backgroundColor: 'white', 
                    padding: '20px', 
                    border: '1px solid darkgray', 
                    borderRadius: 20 
                }}>
                    <h2>{selectedUser.name}</h2>
                    <img src={selectedUser.picture} alt={selectedUser.name} />
                    <p>Email: {selectedUser.email}</p>
                    <p>Phone number: {selectedUser.phone}</p>
                    <button onClick={closeDetail}>Close</button>
                </div>
            )}

            <h1 style = {{textAlign: 'center', fontFamily: 'Roboto, sans-serif'}}>
                This looks bad because I tried to use page navigation and I think the styles I defined aren't being applied to this page 'for some reason that i dont know'
                <Link href="/">Go back</Link>
            </h1>
        </div>
        </div>
    );
}

