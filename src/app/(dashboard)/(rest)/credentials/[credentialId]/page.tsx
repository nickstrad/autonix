import { requireAuth } from "@/lib/auth-utils";

type PageProps = {
  params: Promise<{ credentialId: string }>;
};

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { credentialId } = await params;
  return <p>credential id: {credentialId}</p>;
};

export default Page;
