import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatMockup() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Tere! Kuidas saame aidata?" }
  ]);
  const [step, setStep] = useState(0);

  const handleOption = (option) => {
    let newMessages = [...messages, { from: "user", text: option }];

    if (step === 0) {
      newMessages.push({ from: "bot", text: "Kas olete äriklient või eraisik?" });
      setStep(1);
    } else if (step === 1) {
      newMessages.push({ from: "bot", text: "Palun kirjeldage oma projekti või probleemi" });
      setStep(2);
    } else if (step === 2) {
      if (option.toLowerCase().includes("firma") || option.toLowerCase().includes("ettevõte")) {
        newMessages.push({ from: "bot", text: "⚡ Tuvastasime ärikliendi. Teie päring on prioriteetne ja edastatud spetsialistile." });
      } else {
        newMessages.push({ from: "bot", text: "Aitäh! Võtame teiega ühendust esimesel võimalusel." });
      }
    }

    setMessages(newMessages);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border">
        <div className="bg-black text-white p-3 font-semibold">TERA AI Assistent</div>

        <div className="p-3 h-80 overflow-y-auto space-y-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2 rounded-xl max-w-[75%] ${
                msg.from === "bot" ? "bg-gray-100" : "bg-black text-white ml-auto"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="p-3 border-t space-y-2">
          {step === 0 && (
            <>
              <button onClick={() => handleOption("Elektritööd")} className="w-full bg-gray-100 p-2 rounded-xl">Elektritööd</button>
              <button onClick={() => handleOption("Hinnapakkumine")} className="w-full bg-gray-100 p-2 rounded-xl">Hinnapakkumine</button>
              <button onClick={() => handleOption("Elektriavarii")} className="w-full bg-red-500 text-white p-2 rounded-xl">Elektriavarii</button>
            </>
          )}

          {step === 1 && (
            <>
              <button onClick={() => handleOption("Äriklient")}
                className="w-full bg-black text-white p-2 rounded-xl">Äriklient</button>
              <button onClick={() => handleOption("Eraisik")}
                className="w-full bg-gray-100 p-2 rounded-xl">Eraisik</button>
            </>
          )}

          {step === 2 && (
            <input
              type="text"
              placeholder="Kirjeldage oma probleemi..."
              className="w-full border p-2 rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOption(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
