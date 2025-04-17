import { useNavigate } from 'react-router-dom';

export function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/products/' + product.id)} className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer">
            <h1 className="text-lg font-bold">{product.name}</h1>
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Precio venta:</strong> ${product.sale_price}</p>
            <p><strong>Stock:</strong> {product.stock_quantity}</p>
        </div>
    );
}
