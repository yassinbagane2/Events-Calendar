import { useState } from "react";
import AddEventCSS from './CSS/AddEvent.css'
import axios from 'axios'

const CreateEvent = ({ newDate, toggleModal, showModal, events, setEvents }) => {
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    Start: Number,
    End: Number,
    Text: '',
    Color: 'Blue',
    Date: newDate
  });
  
  const onChange = e => {
    setValues(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  };
  const formSubmitHandler = e => {
    e.preventDefault();
    if (values.Start < 9 || values.End > 20) {
      return setError('Please Enter A Valid Time.');
    }
    if (values.Text.length < 5) {
      return setError('Please Enter A Valid Event.');
    }
    axios.post('http://localhost:8080/add-event',values).then(res => {
      console.log(res.data);
      setEvents([...events, res.data]);

    })
    toggleModal();
    setError(false);
  }
  
  
  return (
    <div className={AddEventCSS}>
      <div
        className="modal-container"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal">
          <h2>Add New Event</h2>
          {error && <p className="error">{error}</p>}
          <form>
            <input type="hidden" name="Date" onChange={onChange} value={newDate}/>
            <input
              type="number"
              name="Start"
              onChange={onChange}
              placeholder="Starts At (hour)"
              
            />
            <input
              type="number"
              name="End"
              onChange={onChange}
              placeholder="Ends At (hour)"
             
            />
            <input
              type="text"
              name="Text"
              onChange={onChange}
              placeholder="Event text"
              
            />
            <select name="Color" onChange={onChange}>
              <option defaultValue={'Blue'}>
                Blue
              </option>
              <option value={"Purple"}>Purple</option>
              <option value={"Orange"}>Orange</option>
            </select>
          </form>
          <div className="footer">
            <button to='/' className="cancel" onClick={toggleModal}>
              Cancel
            </button>
            <button onClick={formSubmitHandler} className="add">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent