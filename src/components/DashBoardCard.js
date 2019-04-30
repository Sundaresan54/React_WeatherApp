import React, {Component} from 'react'
import "./card.css"

export default class DasboardCard extends Component {
    render(){
        return(
            <div className = "row" style= {{marginTop: "10px",marginLeft: "60px"}}>
                <div className="card" style=  {{width: "16rem",marginLeft: "10px",marginTop: "15px", color:"black"}}>
                        <h5 className="card-header" >
                        {this.props.date}
                        </h5>
                        <div className="card-body bgColor" >
                            <img style = {{float:"right", }} src = {`http://openweathermap.org/img/w/${this.props.imageIcon}.png`} />
                            <strong>{this.props.description}</strong> 
                            <ul className="list-group list-group-flush alignment" >
                                <li className="list-group-item">Temp:{this.props.temperature}</li>
                                <li className="list-group-item">Climate:{this.props.climate} </li>
                                <li className="list-group-item">Wind:{this.props.wind}mm/s </li>
                                <li className="list-group-item">Pressure:{this.props.pressure}hPa</li>
                            </ul> 
                         </div>
                </div>
           </div>
        );
    }
}

