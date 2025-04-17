import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductFormPage } from "./pages/ProductFormPage";
import { ProductList } from "./components/ProductList";
import { Dashboard } from "./pages/Dashboard";
import { Navigation } from "./components/Navigation";
import NotFound from './pages/NotFound';


function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<ProductFormPage />} />
                <Route path="/edit-product/:id" element={<ProductFormPage/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
