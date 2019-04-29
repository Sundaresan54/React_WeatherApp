import React, { Component }  from 'react';
import Request from "superagent";
import { Button, Form} from 'react-bootstrap'

class Weather extends Component {

    constructor() {
    super();
    this.state = {
        city :'',
        weatherData:'',
        data : []
    }
    }

  
    getWeatherData(city) {
        console.log("second",city)
        Request.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APIKEY=0d9288985ac2cabefe73a53821810614`)
        .end((err,res) => {
            if(err) return err;
            else{
                this.setState({weatherData:res});
                console.log(this.state.weatherData.body.list,"data getting");
                this.dataModify();
            }
        })

    }
    handleChange = (e) => {
        console.log("hi")
        
        this.setState({city:e.target.value});
        
    }
    handle = ()=> {
        console.log(this.state.city)
        console.log("coming")
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
        
        var temperatureDay1 = 0;
        var weatherDay1 = '' ;
        var descriptionday1 = '';
        var temp = '';
        var dat = '';
        var arr = [];
       
        var id = '';
        // var obj1={};
        var arr1=[];
        console.log(this.state.weatherData.body.list,"list")
        for (var i = 0; i < this.state.weatherData.body.list.length; i++) {
        
            if(this.state.weatherData.body.list[i].dt_txt.search(finalDate) == 0)
            {
              todayCounter++;
              
               console.log("===================>",todayCounter);
            //    obj.id = day;
            var obj = {};
              temperatureDay1 += this.state.weatherData.body.list[i].main.temp;
              obj.weatherDay1 = this.state.weatherData.body.list[i].weather[0].main;
              obj.descriptionday1 = this.state.weatherData.body.list[i].weather[0].description;    
              obj.temp =  Math.round((temperatureDay1/todayCounter)-273.15) + "°C";
              
              obj.dat = this.state.weatherData.body.list[i].dt_txt.substring(0,10);
              
              
            }
            else{
                arr.push(obj);
                
                console.log("-------------------",arr);
              break;
            }  
           
          }
          day++;
         
       
          
          if(day!=1) {
              console.log("jello")
              var tok = 8;
                for(day = 2; day <= 5;){
              var obj1= {};

                    console.log("dayyyyyyyyyyyyyy", day)
                    var id = day;
      var temperatureDay = 0;
      temp = "";
      var weatherDay = '';
      var descriptionDay = '';

          for (var i = todayCounter; i < todayCounter + 8; i++) {
              
        temperatureDay += this.state.weatherData.body.list[i].main.temp;        
       
      }  
        console.log("todayCounter=============>>>>>>>>>>", todayCounter)
          obj1.dat = this.state.weatherData.body.list[todayCounter].dt_txt.substring(0,10);
         obj1.weatherDay = this.state.weatherData.body.list[todayCounter].weather[0].main;
         obj1.descriptionday = this.state.weatherData.body.list[todayCounter].weather[0].description;       
             
          obj1.temp = Math.round((temperatureDay/8) -273.15)+ "°C";
          todayCounter+=8;
          arr.push(obj1);
          console.log(arr,"final")
          day++
        }
        
  }
          
    }
 render() {     
  return (
    <div className="main">
        <form> 
  <div className="form-group">
    <label for="cityName">Enter City</label>
    <input type="text" className="form-control" id="city" aria-describedby="city" name = "city" placeholder="Enter city" value = {this.state.city} onChange = {this.handleChange}/>

  </div>
  
  <button type="button" className="btn btn-primary" onClick = {this.handle} >Search</button>
</form>      
    </div>
  );
}
}

export default Weather;
