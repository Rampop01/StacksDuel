'use client';
export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div className="p-8 text-center text-rose-500">
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-rose-500 text-white rounded">Try again</button>
        </div>
    );
}