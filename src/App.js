import React from 'react'; //React object imported from react package
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY= "bcb628c25813d5ff932ecedb6cbf0688";

class App extends React.Component{
 
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined

  }
  getWeather = async (e) => {
    e.preventDefault();//e is the event object, prevents default behaviour of this component
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country){
      
      console.log(data);
      this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""

      });


    }
    else
    {
      this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the values!"
          });
    }
   

  };

  render(){
    return (
      <div>
        <Titles />
        <Form getWeather = {this.getWeather} />
        <Weather 

          temperature = {this.state.temperature} 
          city = {this.state.city}
          country = {this.state.country}
          humidity = {this.state.humidity}
          description = {this.state.description} 
          error = {this.state.error}

        />
      </div>
      );
  }
};

export default App;