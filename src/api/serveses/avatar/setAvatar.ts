import axios from "../../../axios";

export const deleteAvatar = async (name: string) => {
  const res = await axios.patch("/avatar", { name });
  return res;
};
// export const avatarFieldToEmpty = async () => {
//   await axios.patch("/users/avatar", { avatar: {} });
// };
export const addAvatar = async (formData: FormData) => {
  const res = await axios.post("/avatar", formData);
  return res.data;
};

export const changeAvatarFieldInUser = async (avatar?: {
  name: string;
  downloadURL: string;
  type: string;
}) => {
  const res = await axios.patch("/users/avatar", avatar);
  return res.data;
};
