'use client'
import { useState, useEffect } from 'react';

const Ipv = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('/api/score/get/ipv', {
          method: 'POST',
          // Additional headers or body if needed
        });

        if (response.ok) {
          const data = await response.json();
          setUserList(data.userList);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Email</th>
            <th>Score (osim)</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the user list and render rows */}
          {userList.map((user, index) => (
            <tr key={index} className="hover">
              <th>{index + 1}</th>
              <td>{user.email}</td>
              <td>{user.scoreipv4} seconds</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ipv;
