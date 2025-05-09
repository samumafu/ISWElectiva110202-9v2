import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductFormPage } from "./pages/ProductFormPage";
import { ProductList } from "./components/ProductList";
import { Dashboard } from "./pages/Dashboard";
import { Navigation } from "./components/Navigation";
import NotFound from './pages/NotFound';
import { Settings } from './pages/Settings';
import { ProductExitReport } from "./components/ProductExitReport";
import Report from './pages/Report'; // Asegúrate de importar el componente Report

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<ProductFormPage />} />
                <Route path="/edit-product/:id" element={<ProductFormPage />} />
                <Route path="/report" element={<Report />} />  {/* Aquí añades la ruta para el reporte */}
                <Route path="*" element={<NotFound />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/product-exit-report/:productId" element={<ProductExitReport />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
