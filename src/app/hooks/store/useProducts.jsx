import api from "@/lib/api";
import { useState, useEffect } from "react";


const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/products/');
        console.log(response);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return { products, loading, error, refresh: fetchProducts };
  };

  export default useProducts;