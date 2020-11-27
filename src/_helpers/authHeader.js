import localStore from "./localStore";

export default async () => {
  try {
    const user = await localStore.get("user");
    const { sessionToken } = user;
    return { authorization: `Bearer ${sessionToken}` };
  } catch (e) {
    return {};
  }
};
