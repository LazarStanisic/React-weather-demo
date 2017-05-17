import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

class App extends Component {
  state = {
    weatherData:{
      list: []
    }
  }
  weatherSearch = () => {
    console.log(this.refs)
    axios.get(
      "http://api.openweathermap.org/data/2.5/forecast" + 
        "?q=" + this.refs.input.value + 
        "&units=metric" +    
        "&APPID=5ac946580d4fd5a222ae5760def6cb2c",
    ).then((data) => {
      this.setState({weatherData:data.data})
    })
  }
  render() {
    console.log(this.state)

    const results = this.state.weatherData.list.map((result, key) => {
      return (
        <tr key={key}>
        <td>
          {result.main.temp} <span>&#8451;</span>
        </td>
        <td>
          {result.dt_txt}
        </td>
        <td>
          <img src={'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png'} />
        </td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="forecast">
          <input type="text" name="" placeholder="Enter your city" ref="input" />
          <button onClick={this.weatherSearch} type="button" className="btn btn-success">Search</button>
        </div>
        
        <div className="search">
          <div className="panel panel-default">
            <div className="panel-heading">
              <p> City: {this.state.weatherData.city && this.state.weatherData.city.name}</p>
              <p> Country: {this.state.weatherData.city && this.state.weatherData.city.country}</p>
            </div>
              <table className="table">
                <thead>
                  <th>
                    Temperature
                  </th>
                  <th>
                    Time
                  </th>
                  <th>
                    Image
                  </th>
                </thead>
              <tbody>
                {results}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
