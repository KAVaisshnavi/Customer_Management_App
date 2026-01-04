import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CustomerDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    // Address Editing
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({});
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({ addressLine: '', city: '', state: '', pinCode: '' });

    useEffect(() => {
        fetchCustomer();
    }, [id]);

    const fetchCustomer = async () => {
        try {
            const res = await api.get(`/customers/${id}`);
            setCustomer(res.data);
            setEditForm(res.data);
        } catch (error) {
            console.error(error);
            alert('Failed to load customer');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCustomer = async () => {
        try {
            await api.put(`/customers/${id}`, {
                firstName: editForm.firstName,
                lastName: editForm.lastName,
                phone: editForm.phone
            });
            setIsEditing(false);
            fetchCustomer(); // Refresh
        } catch (error) {
            console.error(error);
            alert('Failed to update customer');
        }
    };

    const handleAddAddress = async () => {
        try {
            await api.post('/addresses', { ...newAddress, customerId: id });
            setShowAddAddress(false);
            setNewAddress({ addressLine: '', city: '', state: '', pinCode: '' });
            fetchCustomer();
        } catch (error) {
            console.error(error);
            alert('Failed to add address');
        }
    };

    const handleUpdateAddress = async (addressId) => {
        try {
            await api.put(`/addresses/${addressId}`, addressForm);
            setEditingAddressId(null);
            fetchCustomer();
        } catch (error) {
            console.error(error);
            alert('Failed to update address');
        }
    };

    const startEditAddress = (addr) => {
        setEditingAddressId(addr.id);
        setAddressForm(addr);
    };

    if (loading) return <p>Loading...</p>;
    if (!customer) return <p>Customer not found</p>;

    return (
        <div>
            {/* Customer Info Section */}
            <div className="card mb-4">
                <div className="flex justify-between items-start">
                    {isEditing ? (
                        <div style={{ width: '100%' }}>
                            <h3>Edit Personal Info</h3>
                            <div className="flex gap-4 mt-2">
                                <input className="form-input" value={editForm.firstName} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} placeholder="First Name" />
                                <input className="form-input" value={editForm.lastName} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} placeholder="Last Name" />
                            </div>
                            <div className="mt-2">
                                <input className="form-input" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone" />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button onClick={handleUpdateCustomer} className="btn btn-primary">Save</button>
                                <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h2>{customer.firstName} {customer.lastName}</h2>
                                <p className="text-secondary">Phone: {customer.phone}</p>
                            </div>
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">Edit Info</button>
                        </>
                    )}
                </div>
            </div>

            {/* Addresses Section */}
            <div className="flex justify-between items-center mb-4">
                <h3>Addresses
                    <span style={{ fontSize: '0.8rem', marginLeft: '1rem', padding: '0.2rem 0.5rem', background: '#e2e8f0', borderRadius: '1rem' }}>
                        {customer.Addresses?.length === 1 ? 'Single Address' : 'Multiple Addresses'}
                    </span>
                </h3>
                <button onClick={() => setShowAddAddress(true)} className="btn btn-primary">Add Address</button>
            </div>

            {showAddAddress && (
                <div className="card mb-4" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <h4>New Address</h4>
                    <div className="form-group mt-2">
                        <input className="form-input" placeholder="Address Line" value={newAddress.addressLine} onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })} />
                    </div>
                    <div className="flex gap-4">
                        <input className="form-input" placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                        <input className="form-input" placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} />
                        <input className="form-input" placeholder="Pin Code" value={newAddress.pinCode} onChange={e => setNewAddress({ ...newAddress, pinCode: e.target.value })} />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button onClick={handleAddAddress} className="btn btn-primary">Save Address</button>
                        <button onClick={() => setShowAddAddress(false)} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            )}

            <div className="flex flex-column gap-4">
                {customer.Addresses?.map(addr => (
                    <div key={addr.id} className="card">
                        {editingAddressId === addr.id ? (
                            <div>
                                <div className="form-group">
                                    <input className="form-input" value={addressForm.addressLine} onChange={e => setAddressForm({ ...addressForm, addressLine: e.target.value })} />
                                </div>
                                <div className="flex gap-4">
                                    <input className="form-input" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} />
                                    <input className="form-input" value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} />
                                    <input className="form-input" value={addressForm.pinCode} onChange={e => setAddressForm({ ...addressForm, pinCode: e.target.value })} />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => handleUpdateAddress(addr.id)} className="btn btn-primary">Save</button>
                                    <button onClick={() => setEditingAddressId(null)} className="btn btn-secondary">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div>
                                    <p style={{ fontWeight: 500 }}>{addr.addressLine}</p>
                                    <p className="text-secondary">{addr.city}, {addr.state} - {addr.pinCode}</p>
                                </div>
                                <button onClick={() => startEditAddress(addr)} className="btn btn-secondary btn-sm">Edit</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerDetailsPage;
