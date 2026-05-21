'use client';

export default function AmountInput({ value, onChange, max }: { value: string, onChange: (v: string) => void, max: number }) {
  return (
    <div className="relative">
      <input 
        type="number" 
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="0.00"
        min="0"
        step="0.01"
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-16 py-3 text-2xl font-mono focus:border-primary focus:outline-none transition-colors"
      />
      <button 
        onClick={() => onChange(max.toString())}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase bg-white/10 hover:bg-white/20 text-white/70 px-2 py-1 rounded transition-colors"
      >
        MAX
      </button>
    </div>
  );
}