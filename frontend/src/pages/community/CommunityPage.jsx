import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import cleanWasteAPI from '../../api/cleanWasteAPI';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState([]);
  const [eventUsers, setEventUsers] = useState([]);

  const fetchEvents = async () => {
    try {
      const user = localStorage.getItem('user');
      console.log(user);
      const response = await cleanWasteAPI.get('/event/getEvents', {id:user._id});
      setUserEvents(response.data);
      console.log(userEvents);
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  }
  const navigatetoEvent = (eventId) => {
    navigate(`/EventScreen/${eventId}`);
  }
  const fetcheventUsers = async (uid) => {
    try {
      const response = await cleanWasteAPI.get('/event/getUsersbyId',{id:uid});
      setEventUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#175E5E] to-[#134c4c] text-white">
        <div className="text-center p-6 max-w-4xl">
          <h1 className="text-6xl font-extrabold tracking-tight">
            <span className="text-yellow-400">ClearWaste</span> Community
          </h1>
          <p className="text-2xl mt-4 leading-relaxed">
            An initiative for a cleaner Community
          </p>
          
          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
            
            <button onClick={() => navigate('/CreateEvent')} className="px-8 py-4 bg-yellow-400 text-[#175E5E] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300">
              Create a Event
            </button>
      
            <button className="px-8 py-4 bg-transparent text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </main>
      {/* Events Section */}
      <section className="mt-12 p-5">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-center text-[#175E5E] mb-6 sm:mb-8">Your Events</h2>
          <div className="overflow-y-auto max-h-96 my-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8" >
            {userEvents.length > 0 ? userEvents.map(event => (
              <div key={event._id} onClick={() => navigatetoEvent(event._id) } className="bg-white border border-black rounded-lg text-black shadow-lg p-4 hover:bg-[#134c4c] hover:border hover:border-[#ooooo] hover:text-white">
                <h3 className="text-xl font-semibold">{event.Eventname}</h3>
                <p className="text-sm text-gray-500">{event.EventDescription}</p>
                <p className="text-sm text-gray-500">Date:{new Date(event.EventDate).toLocaleDateString()} </p>
                <p className="text-sm text-gray-500">Time: {event.EventTime}</p>
              </div>
            )) : <div className="text-center text-2xl">You have no events Planned!</div>}
          </div>
          </div>
        </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CommunityPage;
