import React, {Component} from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

const API_URL = '3346da9ff9f4ff366558a9f8e838308a';

class App extends Component {

    state = {
        value: "",
        date:'',
        city: '',
        sunrise: '',
        sunset: '',
        temp: '',
        pressure: '',
        wind: '',
        err: 'false'
    }
    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleCitySubmit = (e) => {
        e.preventDefault();
        console.log("potwierdzony formularz");
        // API call:
        // http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
        const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${API_URL}&units=metric`;
        fetch(API)
                // .then(response => {
                //     if(response.ok) {
                //         return response
                //     }
                //     throw Error('Nie udało się')
                // })
                // .then(response => response.json() )
                // .then(data => console.log(data))
                // .catch(err => console.lof(err))

                // a teraz w REACT:

            .then(response => {
                // console.log(response);
                if(response.ok) {
                    return response
                }
                throw Error('Nie udało się')
            })
            .then(response => response.json() )
            .then(data => {
                // console.log(data)
                const time = new Date().toLocaleString()
                this.setState(prevState => ({
                    date: time,
                    // city: 'this.state.value',
                    // ^ nie robie w ten sposób, żeby nas uratować
                    //  przed wszelkimi niejasnościami, robimy funkcje - z prevstatem, wiadomo ocb
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    err: false,
                    city: prevState.value,
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(prevState => ({
                    err: true,
                    city: prevState.value
                }))
            })
    }

    render () {
        return (
            <div className="App">
                <Form
                    value={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handleCitySubmit}
                />
                <Result weather={this.state} />
            </div>
        )
    }
}

export default App;