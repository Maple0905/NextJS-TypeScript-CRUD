export default async function createNewPost(
  title: string,
  body: string,
  userId: number
): Promise<{ id: number }> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, body: body, userId: userId }),
  });

  return res.json();
}
