import { render, screen, fireEvent } from '@testing-library/react';
import PatientRegister from './PatientRegister';
import '@testing-library/jest-dom';

describe('PatientRegister', () => {
  it('renders the registration form', () => {
    render(<PatientRegister />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<PatientRegister />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(5);
  });
}); 