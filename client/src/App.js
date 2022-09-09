import { useEffect, useState } from 'react';
import DatePicker from './components/DatePicker';
import Events from './components/Events';
import axios from 'axios';

function App() {

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const newDate = day + '-' + month + '-' + year;
  const onDateChange = date => {
    setDate(new Date(date));
  }
  useEffect(() => {
    axios.get('http://localhost:8080/events',{
      params: {
        Date: newDate
      }
    }).then(res => {
      setEvents(res.data);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[date]);

  return (
    <>
      <div className='container'>
        <Events date={date} newDate={newDate} events={events} setEvents={setEvents}/>
        <DatePicker changeDate={onDateChange}/>
      </div>
    </>
    
    
    
  );
}

export default App;
