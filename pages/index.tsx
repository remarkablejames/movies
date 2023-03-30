import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix clone</h1>
      <h2 className="text-md text-green-500">
        Welcome <span className="text-white">{user?.name}</span>
      </h2>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white h-10  rounded-md w-full hover:bg-red-700 transition font-bold"
      >
        Sign out
      </button>
    </>
  );
}
