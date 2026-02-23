async function getArticle(id: string) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { cache: "no-store" }
    );

    return res.json();
}

export default async function ArticleDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticle(id);

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
        </div>
    );
}

// Important : In Next.js 15+, route params are asynchronous and returned as a Promise to support streaming and async rendering, so we need to await params before accessing its values.

// What we learned in this file -
// In server components we must read params from props.params and await it as it is a promise
// SSR - fetch data, HTML from the server

// hydration- server sends prerendered HTMLto the browser ->
// React then attches event listeners to it -> Component becomes interactive 
// This is Hydration