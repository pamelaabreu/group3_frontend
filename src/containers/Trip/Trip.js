import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import APIKEYS from '../../config.json'

import Itinerary from '../../components/Itinerary/Itinerary'
import Weather from '../../components/Weather/Weather'

const baseURL = 'http://localhost:5000'
const itineraryEndpointBase = '/itinerary/'
const weatherEndpointBase = '/weather/'


class Trip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trip:{
                name: 'Anniversary',
                country: 'Italy',
                city: 'Rome',
                departure_date: moment(),
                return_date: moment().add(10, 'days')
            },
            itinerary:[],
            weather_info:[]
        }
    }

    async componentDidMount() {
        
        const itinerary = await axios({
            method: 'get',
            url: `${itineraryEndpointBase}${1}`,
            baseURL,
        })
        
        const location = `${this.state.trip.city} ${this.state.trip.country}`
        const mqLocation = await axios({
            method:'get',
            url:`http://www.mapquestapi.com/geocoding/v1/address?key=${APIKEYS.MQ_API_KEY}&location=${location}`
        })

        const locationLatLng = mqLocation.data.results[0].locations[0].displayLatLng
        const weather = await axios ({
            method:'get',
            url:weatherEndpointBase,
            params:{
                lat:locationLatLng.lat,
                lng:locationLatLng.lng
            },
            baseURL
        })

        weather.data.data.shift()
        
        this.setState({
            itinerary:itinerary.data,
            weather_info:weather.data.data.slice(0,5)
            })

    }
    render() {
        console.log(moment().endOf(this.state.trip.departure_date).to(this.state.trip.return_date))
        const { city, country, departure_date, return_date } = this.state.trip
        return(
            <div className='container mt-5'>
                <div className='row justify-content-between'>
                    <div className='col-lg-4' >
                        <div>
                            <h5>Trip Details</h5>
                            <p style={{ fontSize:'3.5rem' }}>{ city }, { country }</p>
                        </div>
                        <div>
                            <p>{ moment().endOf(departure_date).to(return_date) }</p>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <Weather weatherInfo={ this.state.weather_info } />
                    </div>
                </div>
                <div className='col-10 row mt-3'>
                    <Itinerary info={ this.state.itinerary } trip={ this.state.trip } />
                </div>
            </div>
        )
    }
}

export default Trip