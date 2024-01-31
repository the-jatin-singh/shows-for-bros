
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

import Loader from './loader';
import { IoTicketOutline } from "react-icons/io5";

const ShowDetails = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    console.log(showId)
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        console.log(data)
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  return (
    <div >

      {show ? (
        <div className='pt-[100px] px-4 sm:flex gap-10'>

          <div className="flex-[1]">
            {show.image && show.image.original ? (
              <img className="w-full" src={show.image.original} alt="poster" />
            ) : (
              <img src="https://www.filmfodder.com/reviews/images/poster-not-available.jpg" alt="poster" />
            )}
          </div>

          <div className='flex-[0.7]'>
            <h1 className='text-5xl font-bold uppercase'>{show.name}</h1>
            <p className='text-gray-600 text-lg leading-2 md:text-2xl md:leading-10'> {show.genres.join(', ')}</p>
            <p className='text-gray-600 text-lg leading-2 md:text-2xl md:leading-10'> {show.language}</p>
            <p className='text-gray-600 text-lg leading-2 md:text-2xl md:leading-10'>Rating - {show.rating && show.rating.average ?show.rating.average:"NA"}</p>
            <p className='text-gray-600 text-lg leading-2 md:text-2xl md:leading-10'>Runtime - {show.runtime ? (show.runtime + " min") : "NA"}</p>
            <a className='text-blue-500 text-lg leading-2 md:text-2xl md:leading-10' target='_blank' href={show.url}>TVMaze</a>
            {
              show.summary ? 
              <div className='text-gray-600 text-lg leading-2 md:text-2xl md:leading-10' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.summary) }} />
              :
              <p>NA</p>
            }
           
          <Link className='mx-10 w-full' to={`/show/${showId}/book-ticket`}>
            <div className=' flex gap-2 items-center justify-center  py-3 border-2 rounded-2xl border-[rgba(0,0,0,0.2)] transition-all hover:border-[rgba(0,0,0,0.6)]'>
              <IoTicketOutline className='text-lg sm:text-2xl text-orange-500' />
              <p className='text-lg sm:text-xl'>Book a Ticket</p>
            </div>
          </Link>
        </div>

        </div>
  ) : (
    <Loader />
  )
}
    </div >
  );
};

export default ShowDetails;
