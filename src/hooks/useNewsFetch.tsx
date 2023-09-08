import {ErrorInfo, useEffect, useState} from 'react';
import axios from 'axios';
import { header } from '../constants/constants';

const useFetch = (url:string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const {data: responseData} = await axios.get(url,{headers:header});
      setData(responseData);

      setLoading(false);
    } catch (err:any) {
      setError(err.message);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {error, loading, data};
};

export default useFetch;
