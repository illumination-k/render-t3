import useTrpcClient from "@/hooks/useTrpcClient";
import useSWR from "swr";

const DocumentList = ({}) => {
  const client = useTrpcClient();
  const { data: document, mutate } = useSWR("document.list", () => client.query("document.list"));

  if (!document) return <>Loading</>;

  return (
    <>
      <button
        onClick={() => {
          const rand = Math.random();

          client.mutation(
            "document.add",
            { title: `Rand: ${rand}`, content: "Yay" },
          ).then(() => mutate());
        }}
      >
        Add Sample
      </button>
      {JSON.stringify(document)}
    </>
  );
};

export default DocumentList;
