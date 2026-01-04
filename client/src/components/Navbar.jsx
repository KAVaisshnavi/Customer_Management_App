import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 0', marginBottom: '2rem' }}>
            <div className="container flex justify-between items-center">
                <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    CustomerManager
                </Link>
                <div className="flex gap-4">
                    <Link to="/" className="btn btn-secondary">
                        Customers
                    </Link>
                    <Link to="/create-customer" className="btn btn-primary">
                        Add Customer
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
