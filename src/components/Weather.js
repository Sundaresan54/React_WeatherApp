import React, { Component }  from 'react';
import Request from "superagent";
import Cards from './DashBoardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




class Weather extends Component {

    constructor() {
    super();
    this.state = {
        city :'',
        weatherData:'',
        data : [],
        location:""
    }
    }
    getWeatherData(city) {
        Request.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APIKEY=0d9288985ac2cabefe73a53821810614`)
        .end((err,res) => {
            if(err) return err;
            else{
                this.setState({weatherData:res});
                this.dataModify();    
            }
        });
    }
    handleChange = (e) => {
        this.setState({city:e.target.value});    
       }
    handle = ()=> {
        this.getWeatherData(this.state.city);
    }
    dataModify = () =>{
        var day = 1;
        let tdate = new Date();
        let  d = tdate.getDate();
        if(d < 10) { d = '0' + d; }
        let m = tdate.getMonth()+1;
        if(m < 10) { m = '0' + m; }
        let y = tdate.getFullYear();
        let finalDate = y + '-' + m + '-' + d;  
        let todayCounter = 0;
        // For finding today's counter -------------------------------------------
        var temperatureDay = 0; 
        var arr = [];
        for (var i = 0; i < this.state.weatherData.body.list.length; i++) {
            if(this.state.weatherData.body.list[i].dt_txt.search(finalDate) === 0)
            {
            todayCounter++;
            var obj = {};
            obj.dat = this.state.weatherData.body.list[i].dt_txt.substring(0,10);
            obj.icon =  this.state.weatherData.body.list[i].weather[0].icon;
            obj.wind = this.state.weatherData.body.list[i].wind.speed;
            obj.pressure =  this.state.weatherData.body.list[i].main.pressure;
            temperatureDay += this.state.weatherData.body.list[i].main.temp;
            obj.weatherDay = this.state.weatherData.body.list[i].weather[0].main;
            obj.descriptionday = this.state.weatherData.body.list[i].weather[0].description;    
            obj.temp =  Math.round((temperatureDay/todayCounter)-273.15) + "°C";     
            }
            else{
                arr.push(obj);   
                break;
            }   
          }
          day++;
          if(day!==1) {
            for(day = 2; day <= 5;)
            {
              var obj1= {};
              var temperatureDay = 0;     
                for (i = todayCounter; i < todayCounter + 8; i++) {        
                 temperatureDay += this.state.weatherData.body.list[i].main.temp;        
             }  
            obj1.dat = this.state.weatherData.body.list[todayCounter].dt_txt.substring(0,10);
            obj1.icon =  this.state.weatherData.body.list[i].weather[0].icon;
            obj1.wind = this.state.weatherData.body.list[i].wind.speed;
            obj1.pressure =  this.state.weatherData.body.list[i].main.pressure;
            obj1.weatherDay = this.state.weatherData.body.list[todayCounter].weather[0].main;
            obj1.descriptionday = this.state.weatherData.body.list[todayCounter].weather[0].description;         
            obj1.temp = Math.round((temperatureDay/8)-273.15)+ "°C";
            todayCounter+=8;
            arr.push(obj1);
            day++;
            this.setState({data:arr});
        }     
      }
      if(this.state.city!== null){
        var loc = ""
        loc = this.state.city;
        this.setState({location:loc,city:""})
      }
    }
 render() {    
  return (
    <div>
            <nav style = {{backgroundColor:" grey",height:"50px"}}>
            {this.state.location?<div className = "row iconAlign">
            <FontAwesomeIcon icon="map-marker-alt" />
             <h2 style = {{marginTop:"-15px",marginLeft:"5px"}} >{this.state.location}</h2>
            
            </div>:null}
           
              <h2>WeatherApp</h2>
          
              
            </nav>
          <br />
            <form className="form-inline centerq">
                <div className="form-group mb-2 ">
                        <label for="cityName">Enter City</label>
                        <input type="text" className="form-control" id="city" aria-describedby="city" name = "city" placeholder="Enter city" value = {this.state.city} onChange = {this.handleChange}/>
                        <button type="button" className="btn btn-primary" onClick = {this.handle} >Search</button>
                  </div>
            </form>
            <div className ="row">
              {this.state.data!=null ? this.state.data.map((item,i)=>{
              return  <Cards date = {item.dat} temperature = {item.temp} description = {item.descriptionday} climate = {item.weatherDay} imageIcon = {item.icon} 
              pressure = {item.pressure} 
              wind = {item.wind}
              />
              }):null}
            </div>
     </div> 
  );
}
}

export default Weather;
