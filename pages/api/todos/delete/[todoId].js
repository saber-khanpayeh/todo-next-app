import { getSession } from "next-auth/react";
import User from "../../../../model/User";
import connectDB from "../../../../utils/connectDB";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }
  const session = await getSession({ req });
  //   console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }
  if (req.method === "DELETE") {
    const id = req.query.todoId;
    try {
      await User.updateOne(
        { "todos._id": id },
        { $pull: { todos: { _id: id } } }
      );
      res.status(200).json({ status: "success", message: "Data deleted" });
    } catch (err) {
      res
        .status(500)
        .json({ status: "failed", message: "Error in deleting from database" });
    }
  }
}
export default handler;
