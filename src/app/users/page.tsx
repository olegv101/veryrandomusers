'use client';
import Link from 'next/link';
import React, { SetStateAction, useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import App from '@/app/usercard';


type User = {
    id: {
        name: string;
        value: string;
    };
    login: {
        uuid: string;
    }
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



};


// export async function getStaticProps() {

//     try {
//     } catch (error) {
//         console.error('Failed to fetch users:', error);
//         // Return an empty array if the fetch fails
//         return {
//             props: { users: [] },
//         };
//     }

//     // fetching data from the api
//     const res = await fetch('https://randomuser.me/api/?results=3'); // fetch 2 users
//     const data = await res.json();
    
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//       }

//     // transforming the data a lil
//     const users = data.results.map((user: { login: { uuid: any; }; name: { first: any; last: any; }; email: any; picture: { large: any; }; number: string }) => ({
//         id: user.login.uuid,
//         name: `${user.name.first} ${user.name.last}`,
//         email: user.email,
//         picture: user.picture.large, // using a larger picture
//     }));

//     //so we can use users as a prop
//     return {
//         props: { users },
//     };

// }

export default function Users() {

    const [selectedUser, setSelectedUser] = useState<User | null>(null);



    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function fetchUsers() {
        try {
          const res = await fetch('https://randomuser.me/api/?results=3');
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          const users = data.results.map((user: User) => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            picture: user.picture.large,
          }));
          setUsers(users);
        } catch (error) {
          console.error('Failed to fetch users:', error);
          setUsers([]);
        }
      }
  
      fetchUsers();
    }, []);



    const showUserDetail = (user: User) => {
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
                    <div key={user.id.value} onClick={() => showUserDetail(user)} 
                    style={{ cursor: 'pointer', fontFamily: 'Roboto, sans-serif', margin: '10px', padding: '10px', border: '1px solid darkgray', borderRadius: 20 }}>
                        <img src={user.picture.large} alt={user.name.first || ''} className="w-12 h-12" />
                        <p>{user.name.first}{user.name.last}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-light-gray rounded-lg">
                    <h2>{selectedUser.name.first}{selectedUser.name.last}</h2>
                    <img src={selectedUser.picture.large} alt={selectedUser.name.first} />
                    <p>Email: {selectedUser.email}</p>
                    <p>All details JSON file: {JSON.stringify(selectedUser)}</p>
                    <button onClick={closeDetail}>Close</button>
                </div>
            )}

            <h1 style = {{textAlign: 'center', fontFamily: 'Roboto, sans-serif'}}>
                Dont mind this text
                <Link href="/">Go back</Link>
            </h1>
            {/* <App></App> */}
        </div>
        </div>
    );
}

