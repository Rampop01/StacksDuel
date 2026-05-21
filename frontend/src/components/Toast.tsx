export default function Toast({ message }: { message: string }) {
    return <div className="fixed bottom-4 right-4 p-4 bg-white/10 backdrop-blur rounded shadow-lg text-white">{message}</div>;
}