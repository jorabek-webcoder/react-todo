import { FaXmark } from "react-icons/fa6";

export default function Modal({ title, close, children, btnName, submit, isLoading }) {
  return (
    <div>
      <div onClick={close} className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm "></div>

      <div className="w-8/12 fixed top-2/4 left-2/4 -translate-2/4 bg-[#3f4143] border-8 border-[#e2b714] rounded-4xl p-10">
        <div className="w-full h-full relative pb-22 space-y-6">
          <h2 className="text-4xl font-bold">{title}</h2>
          {children}

          <button onClick={close} className="text-4xl bg-[#3f4143] rounded-2xl p-2 cursor-pointer absolute -top-2 right-0"><FaXmark /></button>
          <div className={`w-full absolute bottom-0 right-0 flex items-end ${btnName ? "justify-between" : "justify-end"} gap-10`}>
            <button onClick={close} className="text-4xl border-6 border-[#e2b714] bg-[#3f4143] rounded-2xl p-2 cursor-pointer">close</button>
            {btnName && <button onClick={submit} disabled={isLoading} className="text-4xl border-6 border-[#e2b714] bg-[#3f4143] rounded-2xl p-2 cursor-pointer">{isLoading ? "Loading... " : btnName}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
