import fetcher from 'helpers/fetcher';
import useSWR from 'swr';

const useSelectedAuhtorData = (name: string) => {
  const { data, error, mutate } = useSWR(
    !!name.length ? `https://poorchat.net/api/users?name=${name}` : null,
    fetcher
  );
  return {
    author: data,
    isLoading: !error && !data,
    mutate,
  };
};

export default useSelectedAuhtorData;
