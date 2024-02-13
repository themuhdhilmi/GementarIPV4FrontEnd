'use client'
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchDataAccVer = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const resCan = await fetch('/api/auth/emailverification/' + params.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                }),
            });
            const jsonData = await resCan.json();

            setData(jsonData);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching, whether successful or not
        }
    };

    useEffect(() => {
        fetchDataAccVer()
    }, [])

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">IPV4 Mastermind</h1>
                    <h4 className="text-xl pb-20">IPV4 Addressing and Subnetting</h4>
                    {loading ?
                        <div className="badge badge-info gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            <span className="loading loading-dots loading-xs"></span>Loading verification status
                        </div>
                        :
                        <div className="badge badge-info gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            {data.text}
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Page