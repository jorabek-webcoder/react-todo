export default function Input(
  { type,
    autoFocus,
    defaultValue,
    placeholder,
    onKeyDown,
    onChange }
) {
  return (
    <div>
      <input
        type={type}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        className="w-full h-16 md:h-20 border-4 md:border-8 border-[#e2b714] outline-none rounded-xl sm:rounded-2xl px-3 sm:px-5 text-xl sm:text-3xl font-bold placeholder:opacity-40"
      />
    </div>
  );
}
