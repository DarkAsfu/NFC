// hooks/useSubscriptionPlans.js
import api from '@/lib/api';
import { useState, useEffect } from 'react';


const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/subscription-plans/');
        setPlans(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching subscription plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};

export default useSubscriptionPlans;