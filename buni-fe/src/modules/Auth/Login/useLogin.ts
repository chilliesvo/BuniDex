import { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const handleSubmit = useCallback((values: FormData) => {
    // console.log('>> values', values);
    message.warning('This is message');
    setLoading(!!values);
  }, []);

  return {
    loading,
    handleSubmit,
  };
};
export default useLogin;
