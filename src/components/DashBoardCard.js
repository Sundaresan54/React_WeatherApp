import React, {Component} from 'react'

export default class DasboardCard extends Component {
    render(){
        return(
            <div className = "row" style= {{marginTop: "10px",marginLeft: "60px"}}>
      <div className="card" style=  {{width: "16rem",marginLeft: "10px",marginTop: "15px", color:"black"}}>
          <h5 className="card-header" >Date:{this.props.date}</h5>
          <div className="card-body">
           Temp:{this.props.temperature}
          </div>
        </div>
        </div>
        );
    }
}

