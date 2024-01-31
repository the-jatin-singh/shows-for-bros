import React, { useEffect, useState } from 'react';

const BookedShows = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);


  const organizeBookingsByUser = () => {
    const organizedBookings = {};

    bookings.forEach((booking) => {
      const { userName, showName } = booking;

      if (!organizedBookings[userName]) {
        organizedBookings[userName] = [];
      }
      organizedBookings[userName].push(showName);
    });

    console.log(organizedBookings)
    return organizedBookings;
  };

  const usersAndBookedShows = organizeBookingsByUser();

  return (
    
    <div className='pt-[100px]'>
      <div className='flex w-screen flex-col items-center gap-3'>
      <h1 className='uppercase text-3xl my-5'>Booked Shows</h1>
      {Object.keys(usersAndBookedShows).map((user) => (
        <div className='flex border-2 rounded-lg p-4 w-[400px]' key={user}>
          <h2 className='text-lg flex-1'>{user}</h2>
          <ul className='text-lg flex-1'>
            {usersAndBookedShows[user].map((show, index) => (
              <li key={index}>{show}</li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BookedShows;
