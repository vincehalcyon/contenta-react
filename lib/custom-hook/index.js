
import useSWR from "swr";
import axios from "axios";

export function useRequest(request, { initialData, ...config } = {}) {
  return useSWR(
    request ? JSON.stringify(request) : null,
    () =>
      axios(request || {}).then((response) => {
        if (response?.data?.data && !response?.data?.meta)
          return response?.data?.data;
        return response?.data;
      }),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: "InitialData",
        headers: {},
        data: initialData,
      },
    }
  );
}