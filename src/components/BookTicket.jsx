import React, { useEffect, useState } from 'react';
import { IoTicketOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const BookTicket = ({ showName }) => {
  const [userName, setUserName] = useState('');
  const { showId } = useParams();
  const [name, setName] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(false)

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  const handleBooking = () => {
    if (userName != "") {
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const newBooking = { userName, showName: name };
      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookingStatus(true)
      setUserName("")
      setInterval(()=>{setBookingStatus(false)},3000)
    }
  };

  return (
    <div className=' flex items-center justify-center h-[90vh] px-4 pt-[100px]'>
      <div className='relative w-[450px] flex flex-col'>
        <h1 className='text-3xl leading-10'>Book Ticket</h1>
        <p className='text-3xl leading-10'>Show: {name}</p>
        <input
          placeholder='Your Name'
          className='text-gray-700 border-2 py-2 px-3 my-10 rounded-2xl text-2xl leading-10'
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleBooking}>
          <div className=' flex gap-2 items-center justify-center  py-3 border-2 rounded-2xl bg-orange-100 border-[rgba(0,0,0,0.2)] transition-all hover:bg-orange-200'>
            <IoTicketOutline className='text-2xl text-orange-500' />
            <p className='text-xl'>Book Ticket</p>
          </div>
        </button>
        {bookingStatus && <p className='absolute text-gray-500 bottom-[-60px] left-[110px] text-center my-3 text-xl transition-all'>Booked Successfully 🎉🥳</p>}
      </div>

    </div>
  );
};

export default BookTicket;
