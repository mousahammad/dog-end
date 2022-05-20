import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

class Calendar extends Component {

  render() {
    return (
      <div>
        <DayPilotCalendar />
      </div>
    );
  }
}

export default Calendar;