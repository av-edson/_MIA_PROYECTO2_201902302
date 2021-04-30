import './Eventos.css'
import React from "react";
import  Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export class EventosUsser  extends React.Component {
    render() {
      return(
        <div className="calendarioVista">
          <Calendar
            defaultView={'month'}
            minDetail={'decade'}
            onClickDay={(day) => this.entroDia(day) }
          />
        </div>
      );
    }

    entroDia(dia:any){
      alert(dia)
    }
  }