import React from 'react';
import PatientCard from '../../components/PatientCard';

const mockPatients = [
  { name: '333', age: 444444444, id: 1 },
  { name: '4444', age: 422224444, id: 2 },
];
function Patients () {
  return (
    <div className="container">
      <h2>Patients</h2>
      {mockPatients.map(({ name, age, id }) => {
        return <PatientCard key={id} name={name} age={age} id={id} />;
      })}
    </div>
  );
}

export default Patients;
