import { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useReissueToken } from './useReissueToken';
import { API_URL } from '@/constants';
import { AuthError } from '@/utils/AuthError';

import { AuthContext } from '@/AuthProvider';
import { getLocalStorage } from '@/utils';

interface UseAuthFetchProps<T> {
  defaultValue: T;
  url: string;
  method: string;
}

interface ResponseProps<T> {
  statusCode: number;
  message: string;
  data: T;
}

export function useAuthFetch<T>({ defaultValue, url, method }: UseAuthFetchProps<T>) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { setIsSignin } = useContext(AuthContext);

  const { tokenFetcher } = useReissueToken();

  const navigate = useNavigate();

  async function fetcher(shouldReissueToken: boolean) {
    try {
      const accessToken = getLocalStorage('accessToken');

      const response = await fetch(`${API_URL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { statusCode, message, data } = (await response.json()) as ResponseProps<T>;

      if (!response.ok) {
        throw new AuthError(message, statusCode);
      }

      setData(data);

      console.log(statusCode);
      console.log(data);

      console.log('setData completed');
    } catch (error) {
      if (error instanceof AuthError) {
        const { statusCode, message } = error;

        if (statusCode === 401) {
          console.log('401 in authFetcher');
          if (shouldReissueToken) {
            try {
              console.log('should reissue token');
              await tokenFetcher();
              fetcher(false);
            } catch (error) {
              console.log('토큰페처에서 에러가 성공적으로 처리됨', error);
            }
          } else {
            // 1. 세션이 초기화된 경우
            // 2. 그냥 로그인을 안한 경우 - 여기 오기 전에 리프레시 토큰 유무로 걸러냄
            // clear token
            // logout
            console.log('세션이 만료되었습니다. 다시 로그인 해주세요.');

            setIsSignin(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/', { replace: true });
          }
        } else {
          console.log('예상치 못한 에러 발생 ㄷㄷ', statusCode, message);
        }
      } else {
        setError(String(error));
      }
    }
  }

  async function authFetcher() {
    // 1. 리프레시 토큰이 비어있는 경우 로그아웃 상태
    const accessToken = getLocalStorage('accessToken');
    const refreshToken = getLocalStorage('refreshToken');

    console.log('refresh token test', refreshToken);

    if (accessToken === null && refreshToken === null) {
      console.log('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?');
      navigate('/', { state: { isRedirected: true } });
      return;
    }

    // 2. 리프레시 토큰이 있는 경우 fetcher 함수를 통해 액세스 토큰 유효성을 검증
    // 2.1. 200인 경우 -> 그대로 진행
    // 2.2. 401인 경우 -> 토큰을 재발급 -> 거기서도 401인 경우(리프레시 토큰이 만료되었거나 리프레시 토큰이 없는 경우 포함) -> 재로그인 요청
    await fetcher(true);
    setIsLoading(false);
  }

  if (error !== '') {
    throw new Error(error);
  }

  useEffect(() => {
    authFetcher();
  }, []);

  return { data, isLoading, error };
}
