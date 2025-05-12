import axios, { AxiosError } from 'axios';

const API_URL = 'http://127.0.0.1:8001/api';

// Test API endpoints
async function testAPI() {
  try {
    // 1. Register a new patient
    console.log('Testing patient registration...');
    const patientData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      date_of_birth: '1990-01-01'
    };
    const registeredPatient = await axios.post(`${API_URL}/patients/`, patientData);
    console.log('Patient registered:', registeredPatient.data);

    // 2. Login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${API_URL}/token/`, {
      email: 'test@example.com',
      password: 'your-password'
    });
    console.log('Login successful:', loginResponse.data);

    // 3. Get services
    console.log('\nTesting services endpoint...');
    const servicesResponse = await axios.get(`${API_URL}/services/`);
    console.log('Services:', servicesResponse.data);

    // 4. Create appointment
    console.log('\nTesting appointment creation...');
    const appointmentData = {
      service_id: 1,
      appointment_date: '2024-03-20T10:00:00Z',
      notes: 'Test appointment'
    };
    const newAppointment = await axios.post(`${API_URL}/appointments/`, appointmentData, {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.access}`
      }
    });
    console.log('Appointment created:', newAppointment.data);

    // 5. List appointments
    console.log('\nTesting appointments list...');
    const appointmentsResponse = await axios.get(`${API_URL}/appointments/`, {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.access}`
      }
    });
    console.log('Appointments:', appointmentsResponse.data);

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Test Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Run the tests
testAPI(); 