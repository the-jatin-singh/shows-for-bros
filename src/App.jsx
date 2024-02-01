// App.js
import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import BookTicket from './components/BookTicket';
import BookedShows from './components/BookedShows';

const App = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed h-[80px] z-10 w-full flex items-center justify-between px-2 md:px-8 bg-gray-800">
        <Link to='/' className="cursor-pointer text-md sm:text-xl text-gray-200 uppercase font-semibold">Shows-For-Bros</Link>
        <Link to='/booked' className="uppercase text-sm sm:text-xl text-gray-200 ">Booked Shows</Link>
      </nav>


      <Routes>


        <Route path="/" exact element={<ShowList />} />
        <Route path="/booked" exact element={<BookedShows />} />
        <Route path="/show/:showId" exact element={<ShowDetails />} />
        <Route path="/show/:showId/book-ticket" exact element={<BookTicket />} />

        <Route path='/*' />
      </Routes>
    </div>
  );
};

export default App;
