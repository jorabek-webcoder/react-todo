
export default function Textarea({ placeholder, defaultValue, onChange, ref, onKeyDown, }) {
    return (
        <textarea placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} ref={ref} onKeyDown={onKeyDown} className="w-full max-h-[210px] min-h-[110px] h-20 border-4 md:border-8 border-[#e2b714] outline-none rounded-2xl px-5 py-3 text-xl sm:text-3xl font-bold placeholder:opacity-40"></textarea>
    )
}
