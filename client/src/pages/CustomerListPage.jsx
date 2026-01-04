import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const CustomerListPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', state: '', pinCode: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCustomers();
    }, [currentPage]); // Fetch when page changes

    const fetchCustomers = async (resetPage = false) => {
        try {
            setLoading(true);
            const params = {
                page: resetPage ? 1 : currentPage,
                limit: 9
            };
            if (filters.city) params.city = filters.city;
            if (filters.state) params.state = filters.state;
            if (filters.pinCode) params.pinCode = filters.pinCode;

            const res = await api.get('/customers', { params });
            // Handle both old (array) and new (object) response formats for safety/transition
            if (Array.isArray(res.data)) {
                setCustomers(res.data);
            } else {
                setCustomers(res.data.customers);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to fetch customers');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to page 1 on search
        fetchCustomers(true);
    };

    const handleClear = () => {
        setFilters({ city: '', state: '', pinCode: '' });
        setCurrentPage(1);
        // We need to pass empty filters, but since state update is async, we pass values directly or rely on next effect?
        // Better: trigger fetch with empty filters explicitly
        fetchCustomersWithClear();
    };

    const fetchCustomersWithClear = async () => {
        try {
            setLoading(true);
            const res = await api.get('/customers', { params: { page: 1, limit: 9 } });
            setCustomers(res.data.customers);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        try {
            await api.delete(`/customers/${id}`);
            // Optimistic update or refetch? Refetch helps with pagination counts
            fetchCustomers();
        } catch (error) {
            console.error(error);
            alert('Failed to delete customer');
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1>Customers</h1>
                <Link to="/create-customer" className="btn btn-primary">Add New</Link>
            </div>

            <div className="card mb-4">
                <form onSubmit={handleSearch} className="flex gap-4 items-end flex-wrap">
                    <div className="form-group mb-0">
                        <label className="form-label">City</label>
                        <input
                            className="form-input"
                            value={filters.city}
                            onChange={e => setFilters({ ...filters, city: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">State</label>
                        <input
                            className="form-input"
                            value={filters.state}
                            onChange={e => setFilters({ ...filters, state: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">Pin Code</label>
                        <input
                            className="form-input"
                            value={filters.pinCode}
                            onChange={e => setFilters({ ...filters, pinCode: e.target.value })}
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary">Search</button>
                        <button type="button" onClick={handleClear} className="btn btn-secondary">Clear</button>
                    </div>
                </form>
            </div>

            {loading ? <p>Loading...</p> : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {customers.map(customer => (
                            <div key={customer.id} className="card">
                                <h3>{customer.firstName} {customer.lastName}</h3>
                                <p className="text-secondary">{customer.phone}</p>
                                <div className="mt-4 flex gap-2">
                                    <Link to={`/customer/${customer.id}`} className="btn btn-secondary">View Details</Link>
                                    <button onClick={() => handleDelete(customer.id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        ))}
                        {customers.length === 0 && <p>No customers found.</p>}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-4 mb-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-secondary"
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="btn btn-secondary"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CustomerListPage;
