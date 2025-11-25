type PageProps = {
  params: Promise<{ workflowId: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { workflowId } = await params;
  return <p>workflow id: {workflowId}</p>;
};

export default Page;
