import { getSession } from "next-auth/react";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../model/User";

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
  if (req.method === "GET") {
    const id = req.query.todoId;
    try {
      const user = await User.findOne({ email: session.user.email });
      const todo = user.todos.id(id);
      res.status(200).json({ status: "success", data: todo });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in Retrieving data from database",
      });
    }
  } else if (req.method === "PATCH") {
    const id = req.query.todoId;
    const{title,status}=req.body;
    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status,"todos.$.title":title } }
    );
    console.log(result);
    res.status(200).json({ status: "success" });
  }
}

export default handler;
