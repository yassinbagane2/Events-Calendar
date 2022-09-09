import axios from 'axios';
import React, {useState} from 'react'
import AddEvent from './AddEvent'
import './CSS/Events.css'
const Events = ({date,newDate, events, setEvents}) => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const time = [9,11,13,15,17,19];
  const months = [
    "January",
    "February",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "Octover",
    "November",
    "December"
  ];

  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/delete/'+id).then(res => {
      setEvents(events => events.filter(event => event._id !== res.data._id ));
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
        <div>
          <header className='events-header'>
            <h2>{`${date.getDate()} ${months[date.getMonth()]}`}</h2>
            <button className="add-event-toggler" onClick={toggleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            {showModal && <AddEvent newDate={newDate} toggleModal={toggleModal} showModal={showModal} events={events} setEvents={setEvents}/>}
          </header>
          <div className="events-container">
            <div className='event'>
              {events.map((event,i) => (
                <div key={i} className={event.Color === "Purple" ? "Purple" : event.Color === "Blue" ? "Blue" : "Orange" } style={{
                  top: (event.Start - 9) * 65 + "px" ,
                  height: (event.End - event.Start) * 65 + "px",
                }}>                
                  <p>
                    {event.Text}
                  </p>
                  <button onClick={handleDelete.bind(null,event._id)}>x</button>
                </div>
                
              ))}
            </div>
            {time.map(i => (
              <div key={i} className="divided">
                <span className="border"></span>
                <div className="start">{i}:00</div>
                <div className="end">{i+1}:00</div>
              </div>
            ))}
            
          </div>

        </div>
    </>
  )
}

export default Events