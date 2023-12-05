'use client';

import Comments from '@/src/containers/Comments';
import Posts from '@/src/containers/Posts';

export default function Home() {
  return (
    <main className="grid grid-cols-[1fr_2fr] h-screen px-20 py-16 gap-x-12">
      <Posts />
      <Comments />
    </main>
  );
}
