
export default function Button({ type, onClick, children, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled} className={`text-xl border-4 border-[#e2b714] bg-[#3f4143] p-2 px-4 cursor-pointer ${type === "big" ? "sm:text-4xl md:text-6xl md:border-8 rounded-2xl md:rounded-4xl sm:p-4 sm:px-6" : "sm:text-2xl md:text-4xl md:border-6 rounded-xl sm:rounded-2xl"}`}>{children}</button>
    )
}
