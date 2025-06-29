import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

const useProduct = (slug) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchProduct = useCallback(async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(`/products/${slug}/`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError(err.response.data.detail);
      } finally {
        setLoading(false);
      }
    }, [slug]);
  
    useEffect(() => {
      fetchProduct();
    }, [fetchProduct]);
  
    return { product, loading, error, refresh: fetchProduct };
};

export default useProduct;