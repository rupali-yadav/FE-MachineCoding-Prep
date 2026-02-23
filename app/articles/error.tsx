"use client";

export default function Error({
    error,
}: {
    error: Error;
}) {
    return <p>An error is caused: {error.message}</p>;
}
