import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "Hello world" });

  return (
    <div className="container pt-4">
      <h1>Hello World</h1>
      <p>{hello?.greeting ? hello?.greeting : "Loading query..."}</p>
    </div>
  );
}
