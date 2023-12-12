import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreatePost } from "~/app/contact/components/create-post";

export default async function Contact() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <section className="mt-4 flex justify-center">
      <div className="max-w-sm">
        {latestPost ? (
          <p className="truncate">Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}

        <CreatePost />
      </div>
    </section>
  );
}
