import { getSession } from "next-auth/react";
import HomePage from "../components/template/HomePage";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const session =await getSession({req});
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }
