import { useReducer, useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import axios from 'axios';

function useSafeDispatch(dispatch) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  return useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
}

const defaultInitialState = { status: 'idle', data: null, error: null };

export function useAsync(endpoint, method = 'get', reqBody, options) {
  const initialStateRef = useRef({
    ...defaultInitialState,
  });
  const alreadyRun = useRef(false)

  const [{ status, data, error }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback((data) => safeSetState({ data, status: 'resolved' }), [safeSetState]);

  const setError = useCallback(
    (error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState]
  );

  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  useEffect(() => {
    if (alreadyRun.current) { return; }
    const fetchData = async () => {
      const fetchOptions = {
        method,
        url: `api/${endpoint}`,
        data: { ...reqBody },
        ...options,
      };
      console.log(`use async endpoint: ${endpoint}`);
      const response = await axios(fetchOptions);
      return response.data.data;
    };
    alreadyRun.current = true
    run(fetchData()).then();
  }, [endpoint, method, options, reqBody, run]);

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
