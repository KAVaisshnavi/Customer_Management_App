import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CreateCustomerPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        addressLine: '', // Initial address fields
        city: '',
        state: '',
        pinCode: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.addressLine || !formData.city || !formData.state || !formData.pinCode) {
            return 'All fields are required';
        }
        if (formData.phone.length < 10) {
            return 'Phone number must be at least 10 digits';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setError(err);
            return;
        }

        try {
            // Updated to send single request with all details
            await api.post('/customers', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                addressLine: formData.addressLine,
                city: formData.city,
                state: formData.state,
                pinCode: formData.pinCode
            });

            alert('Customer created successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Failed to create customer. ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Create New Customer</h1>

            <form onSubmit={handleSubmit} className="card mt-4">
                {error && <div className="mb-4" style={{ color: 'var(--danger)' }}>{error}</div>}

                <h3>Personal Details</h3>
                <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input name="firstName" className="form-input" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input name="lastName" className="form-input" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
                </div>

                <h3 className="mt-4">Address</h3>
                <div className="form-group">
                    <label className="form-label">Address Line</label>
                    <input name="addressLine" className="form-input" value={formData.addressLine} onChange={handleChange} />
                </div>
                <div className="flex gap-4">
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">City</label>
                        <input name="city" className="form-input" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">State</label>
                        <input name="state" className="form-input" value={formData.state} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Pin Code</label>
                    <input name="pinCode" className="form-input" value={formData.pinCode} onChange={handleChange} />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Customer</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCustomerPage;
