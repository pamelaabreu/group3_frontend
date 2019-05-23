import React from "react";
import "./CreateTripForm.css";


let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;


export default props => {
    return (
        <div className="create-trip-form">
            <form className="">
                <div className="form-group">
                    <label htmlFor="destination" className="trip-form-label">Enter your destination:</label>
                    <input 
                        type="text" 
                        name="destination" 
                        placeholder="City, Country" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departure" className="trip-form-label">
                        Enter departure date:
                    </label>
                    <input
                        type="date"
                        id="departure"
                        name="departure"
                        min={today}
                        required
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departure" className="trip-form-label">
                        Enter departure date:
                    </label>
                    <input
                        type="date"
                        id="return"
                        name="return"
                        min=""
                        required
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    />
                </div>
                <div className='form-button-container'>
                    <button className='form-button' type='submit'>Next</button>
                </div>
            </form>
        </div>
    );
};
