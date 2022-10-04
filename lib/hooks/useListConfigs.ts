import useSWR from 'swr';
import { Fetcher } from '../helpers/FetchHelpers';
import { ConfigTypes } from '../types/world';

const useListConfigs = (): {
  ConfigList: ConfigTypes[];
  Loading: boolean;
  Error: any;
} => {
  const { data, error } = useSWR('/api/config/get', Fetcher);

  return {
    ConfigList: data?.Data || [],
    Loading: !error && !data,
    Error: error || data?.Error,
  };
};

export default useListConfigs;
