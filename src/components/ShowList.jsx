import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const ShowList = () => {
  const [shows, setShows] = useState(null);
  const [searchTerm, setSearchTerm] = useState("all");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        const data = await res.json();
        setShows(data);
        
      } catch (err) {
        console.log(err);
      }
    };
    const debounceSearch = setTimeout(() => {
      fetchShows();
    }, 1000);
    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="pt-[100px]">
      {/* search bar */}
      <div className="w-full text-center"><input
        onChange={handleSearch}
        className="mx-4 text-lg outline-none bg-gray-200 px-4 py-4 w-[450px] rounded-3xl"
        placeholder="Search your show here"
        type="text"
      /></div>
      
      {/* ShowsList */}
      {shows ? (
        <div className="mt-10 flex flex-wrap gap-10 justify-center pb-10">
          {shows.map((show) => (
            <div key={show.show.id} className="shadow-lg w-[500px] border-2 rounded-xl p-4">
              <div className="flex gap-4 ">
                <div className="flex-1 ">
                  {show.show.image && show.show.image.medium ? (
                    <img className="w-full" src={show.show.image.medium} alt="poster" />
                  ) : (
                    <img
                      src="https://www.filmfodder.com/reviews/images/poster-not-available.jpg"
                      alt="poster"
                    />
                  )}
                </div>
                <div className=" flex-1 info-section">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{show.show.name}</h1>
                      <p> {show.show.genres.join(', ')}</p>
                      <p> {show.show.language}</p>
                      <p>Rating - {show.show.rating && show.show.rating.average ? show.show.rating.average : "NA"}</p>
                      <p>Runtime - {show.show.runtime ? (show.show.runtime + " min") : "NA"}</p>
                    </div>
                    <Link
                      to={`/show/${show.show.id}`}
                      className="border rounded-lg px-4 py-3 bg-[#ffffff] hover:border-2"
                    >
                      <div className="flex gap-2 items-center justify-end">
                        <p>More Info</p>
                        <MdOutlineArrowRightAlt className="text-lg" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // loader
        <Loader />
      )}
    </div>
  );
};

export default ShowList;
