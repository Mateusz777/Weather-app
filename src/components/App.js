import React, {Component} from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

// key for API
const APIKey = '3346da9ff9f4ff366558a9f8e838308a';

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
    render () {
        return (
            <div className="App">
                <Form/>
                <Result/>
            </div>
        )
    }
}

export default App;