import { Suspense } from "react";

import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}




export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Heres what you mightve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
