import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];
const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + (3 * 60000));
export const users = [
  {
    _id: userIds[0],
    pseudo:"test0",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  }
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    pseudo:"test0",
    description: "Some really long random description",
    timeEnd:futureDate,
    likes: new Map([
      [userIds[0], true]
    ])
  }
];