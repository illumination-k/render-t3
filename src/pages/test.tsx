import useTrpcClient from "@/hooks/useTrpcClient";
import useSWR from "swr";

import ProtectedPage from "@/components/layout/ProtectedPage";
import DocumentList from "@/components/template/Document";
const TestPage = () => {
  const client = useTrpcClient();

  const { data } = useSWR("healthcheck", () => {
    return client.query("healthcheck");
  });

  if (!data) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <ProtectedPage>
      <DocumentList />
    </ProtectedPage>
  );
};

export default TestPage;
