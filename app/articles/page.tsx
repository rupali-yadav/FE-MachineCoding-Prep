import Link from "next/link";

async function getArticles() {

    await new Promise((res) => setTimeout(res, 2000)); // to simulate delay // can be commented later


    const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            cache: "no-store", // SSR (no caching)
            // next: { revalidate: 60 }, --> if we uncomment this line and remove above line
            // we will perform ISR incremental server rendering
        }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    return res.json();
}

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <div>
            <h2>Articles (Server Rendered)</h2>
            <ul>
                {articles.slice(0, 10).map((article: any) => (
                    <li key={article.id}>
                        <Link href={`/articles/${article.id}`}>
                            {article.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// what did we learn ?
// server component -
// SSR no caching
// how to do ISR