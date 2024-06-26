import load from "../../../storage/load";

async function deletePost(id) {
  const token = load("accessToken");
  const response = await fetch(
    `https://v2.api.noroff.dev/blog/posts/frekklas/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export default deletePost;
