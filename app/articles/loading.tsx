export default function Loader() {
  return <p>Loading articles...</p>;
}

// How It Works to /articles
// Next.js will automatically:
// Start loading articles/page.tsx
// If it takes time for data fetching
// It automatically shows articles/loading.tsx
// No Suspense needed manually.

// if Your fetch is very fast, you may not see this
//  but to simulate this you can add a delay inside getArticles() before the fetch

// await new Promise((res) => setTimeout(res, 2000)); // simulate delay


// In the App Router, loading.tsx is automatically treated as a Suspense fallback for that route segment,
// and Next.js shows it while the server component is fetching data.

// loading.tsx is:
// -> Route-level Suspense boundary
// -> Automatically wrapped by Next.js
// -> It enables Streaming