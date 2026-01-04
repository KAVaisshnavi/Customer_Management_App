import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);

    return (
        <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 0', marginBottom: '2rem' }}>
            <div className="container flex justify-between items-center">
                <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    CustomerManager
                </Link>
                <div className="flex gap-4 items-center">
                    {isAuthenticated ? (
                        <>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {user?.username}
                            </span>
                            <Link to="/" className="btn btn-secondary">
                                Customers
                            </Link>
                            <Link to="/create-customer" className="btn btn-primary">
                                Add Customer
                            </Link>
                            <button onClick={logout} className="btn btn-secondary" style={{ border: '1px solid var(--danger)', color: 'var(--danger)' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
