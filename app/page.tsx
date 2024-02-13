'use client'
import Link from 'next/link';

export default function Home() {

  return (

    <div>

      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link  href={'/'}>Home</Link></li>
            <li><Link  href={'/board'}>ScoreBoard</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">GEMENTAR | IPV4 Subnetting</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li><Link  href={'/'}>Home</Link></li>
            <li><Link  href={'/board'}>ScoreBoard</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link className="btn btn-primary" href={'/download/ipv.zip'}>Download</Link>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src="/IPV4.png" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">IPV4 Mastermind IPV4 Addressing and Subnetting</h1>
            <p className="py-6">IPv4 Mastermind: IPv4 Addressing and Subnetting is an educational game that blends the classic Mastermind concept with IPv4 networking. Players take on the role of a network administrator, strategically arranging IPv4 addresses. With challenging puzzles, the game provides an engaging way for players to understaind IPv4 addressing and subnetting.</p>
          </div>
        </div>
      </div>
    </div>

  )
}
