import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <Link to="/products" className="font-bold">Product App</Link>
            <Link to="/add-product" className="hover:underline">Crear Producto</Link>
            <Link to="/" className="hover:underline">Dashboard</Link> {/* Cambié '/dashboard' a '/' */}
        </nav>
    );
}
