import { caller } from "@/trpc/server";

export const Home = async () => {
  const users = await caller.getUsers();
  return (
    <div>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
};

export default Home;
