// hooks/useShippingAreaCosts.js
import api from '@/lib/api';
import { useState, useEffect } from 'react';


const useShippingAreaCosts = () => {
  const [shippingCosts, setShippingCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingCosts = async () => {
      try {
        const response = await api.get('/shipping-area-cost/');
        setShippingCosts(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching shipping costs');
      } finally {
        setLoading(false);
      }
    };

    fetchShippingCosts();
  }, []);

  return { shippingCosts, loading, error };
};

export default useShippingAreaCosts;