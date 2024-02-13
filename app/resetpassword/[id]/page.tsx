'use client'
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const [pwd, setPwd] = useState("");
    const [pwdStatus, setPwdStatus] = useState("");

    const fetchDataAccVer = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const resCan = await fetch('/api/auth/passwordreset/get/' + params.id, {
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

    const sendResetPassword = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const resCan = await fetch('/api/auth/passwordreset/get/' + params.id, {
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
    }, [fetchDataAccVer])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/passwordreset/reset/' + params.id + "/" + pwd, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //   body: JSON.stringify({ password: pwd }), // Send the password in the request body
            });
            const jsonData = await res.json();
            setData(jsonData);
            setPwdStatus(jsonData.text);
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">IPV4 Mastermind</h1>
                    <h4 className="text-xl pb-20">IPV4 Addressing and Subnetting</h4>

                    {pwdStatus === "" ? "" : <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{pwdStatus}</span>
                    </div>}

                    {
                        data?.status === true ?

                            <div>
                                <form className="card-body" onSubmit={handleSubmit}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            onChange={(e) => setPwd(e.target.value)}
                                            type="password"
                                            placeholder="password"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-primary">Reset Password</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className="badge badge-info gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                <span className="loading loading-dots loading-xs"></span>Loading.. {data?.text}
                            </div>
                    }

                </div>
            </div>
        </div >
    )
}

export default Page