import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends React.Component {
  render() {
    return (
      <div className="missions">
        <Title headline="Missões" />
        <div data-testid="missions" className="cards">
          {missions.map((mission, index) => (<MissionCard
            key={ index }
            name={ mission.name }
            year={ mission.year }
            country={ mission.country }
            destination={ mission.destination }
          />
          ))}
        </div>
      </div>
    );
  }
}

export default Missions;
