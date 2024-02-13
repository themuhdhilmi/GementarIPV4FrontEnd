'use client'
import React, { useState } from 'react';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const [text, setText] = useState("");

    const fetchDataAccVer = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const resCan = await fetch('/api/auth/passwordreset/send/' + data, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const jsonData = await resCan.json();

            // alert(jsonData.text)
            setText(jsonData.text);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching, whether successful or not
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchDataAccVer();
    };

    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="hero-content flex-col lg:flex-row-reverse">
                <div>
                    <h4 className="text-xl ">Password Reset</h4>
                    <h1 className="text-5xl font-bold">IPV4 Mastermind</h1>
                    <h4 className="text-xl pb-20">IPV4 Addressing and Subnetting</h4>



                </div>

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">


                    {text === "" ? "": <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{text}</span>
                    </div> }

                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                onChange={(e) => setData(e.target.value)}
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Send Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
