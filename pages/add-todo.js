import React from "react";
import AddTodoPage from "../components/template/AddTodoPage";
import { getSession } from "next-auth/react";

function AddTodo() {
  return <AddTodoPage />;
}

export default AddTodo;

// export async function getServerSideProps({ req }) {
//   const session =await getSession({ req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }
