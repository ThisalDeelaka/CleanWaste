import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import cleanWasteAPI from '../../api/cleanWasteAPI';
import Map from '../../components/eventMap';

export default function EventScreen() {
    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const eventId = useParams().eventId;
    const [eventLocation,setEventLocation] = useState(null);
    
    const fetchEvent = async () => {
        try{
            const response = await cleanWasteAPI.get(`/event/getEventbyId/${eventId}`);
            setEvent(response.data);
            setEventLocation(response.data.eventLocation);

        }
        catch(error){
            console.error('Failed to fetch event', error);
        }
    }

    useEffect(() => {
        fetchEvent();
    }
    , []);
    

  return (
    <div>
        {/* Navbar */}
        <Navbar />
        <main className="flex flex-row items-center justify-center min-h-screen bg-gradient-to-b from-[#175E5E] to-[#134c4c] text-white">
            <div className="bg-white flex-row p-6 border-white border-4 rounded-xl mx-2">
                <div className='flex flex-col'>
                <h1 className="text-4xl text-black font-extrabold py-5 ">
                    {event.Eventname}
                </h1>
                
                <p className="text-md text-black font-bold"> Event Discription : </p>
                <p className="text-md text-black leading-relaxed">
                     {event.EventDescription}
                </p>
                
                <p className="text-md text-black font-bold"> Date of the Event : </p>
                <p className="text-md text-black leading-relaxed">
                    Event Date : {new Date(event.EventDate).toLocaleDateString()}
                </p>
                <p className="text-md text-black font-bold"> Time of the Event: </p>
                <p className="text-md text-black leading-relaxed">
                    {event.EventTime}
                </p>
                <p className="text-md text-black font-bold"> Location : </p>
                <p className="text-md text-black leading-relaxed">
                    {event.eventUsers}
                </p>
                </div>
                <div className=' flex w-full max-w-4xl mx-auto mb-4'>
                    <Map/>
                </div>
            </div>  
        </main>   
    </div>
  )
}
