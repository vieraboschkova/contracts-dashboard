import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contract from './components/ContractCard';
import PatientCard from './components/PatientCard';

test('Contracts card to render contract Id', () => {
  render(
    <BrowserRouter>
      <Contract contract={{ _id: '123' }} />
    </BrowserRouter>,
  );
  const contract = screen.getByText(/123/i);
  expect(contract).toBeInTheDocument();
});

test('Patients card to render name', () => {
  render(
    <BrowserRouter>
      <PatientCard _id={'123'} name={'Test Doe'} birth={2000} />
    </BrowserRouter>,
  );
  const patient = screen.getByText(/Test Doe/i);
  expect(patient).toBeInTheDocument();
});
