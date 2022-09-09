import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarCSS from './CSS/Calendar.css'

const DatePicker = ({changeDate}) => {

    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const handleDateChange = date => {
        changeDate(date);
    }
  return (
    <div className='date-section'>
        <Calendar
            onChange={handleDateChange}
            nextLabel={
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M9 18l6-6-6-6" />
                </svg>
            }
            prevLabel={
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M15 18l-6-6 6-6" />
                </svg>
            }
            next2Label={null}
            prev2Label={null}
            formatShortWeekday= {(locale, date) => days[date.getDay()]}
            
            />
    </div>
  )
}

export default DatePicker