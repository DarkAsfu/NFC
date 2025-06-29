// hooks/useDeliveryMethods.js
import api from '@/lib/api';
import { useState, useEffect } from 'react';


const useDeliveryMethods = () => {
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeliveryMethods = async () => {
    setLoading(true);
    try {
      const response = await api.get('/delivery-method/');
      setDeliveryMethods(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching delivery methods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryMethods();
  }, []);

  return { 
    deliveryMethods, 
    loading, 
    error,
    refresh: fetchDeliveryMethods // Optional refresh capability
  };
};

export default useDeliveryMethods;