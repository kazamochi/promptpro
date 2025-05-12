import { useState, useRef, useEffect } from "react";
import { templates } from "../data/prompthesisTemplates";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: "🧠", label: "学習" },
  { icon: "💼", label: "仕事" },
  { icon: "📣", label: "SNS投稿" },
  { icon: "🗨", label: "日常" },
  { icon: "🎨", label: "創作" },
  { icon: "🍳", label: "料理" },
  { icon: "🏃‍♀️", label: "ダイエット・健康" },
  { icon: "🧩", label: "プロンプト上達" },
  { icon: "🗯️", label: "なんでも言って" },
];

export default function PromptProGUI() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [customInstruction, setCustomInstruction] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copied, setCopied] = useState(false);
  const templateRef = useRef(null);

  useEffect(() => {
    setCustomInstruction(""); // ← カテゴリ変更時に指示欄リセット
  }, [selectedCategory]);

  const scrollToTemplate = () => {
    setTimeout(() => {
      if (templateRef.current) {
        templateRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCopy = () => {
    if (!selectedCategory) return;
    const template = templates[selectedCategory.label]?.prompt || "";
    const base = template.replace("{{input}}", inputValue || "{{input}}");
    const full = customInstruction
      ? `${base}\n\n【追加指示】\n${customInstruction}`
      : base;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const renderTemplate = () => {
    if (!selectedCategory) return null;

    const raw = templates[selectedCategory.label]?.prompt || "";
    const parts = raw.split("{{input}}");

    return (
      <p className="text-sm whitespace-pre-wrap leading-relaxed">
        {parts[0]}
        <textarea
          rows={2}
          className="w-full border-b border-gray-400 my-1 px-1 bg-transparent outline-none resize-none"
          placeholder="ここに入力"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={scrollToTemplate}
        />
        {parts[1]}
      </p>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-md w-full mx-auto space-y-4 pb-32 text-sm sm:text-base">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold">Prompt Pro（プロプロ）</h1>
          <p className="text-xs text-gray-600">
            カテゴリに応じてAIプロンプトを生成・コピーできるツールです。
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowHelp(true)} className="text-xs px-3">
          使い方
        </Button>
      </div>

      {/* カテゴリ選択 */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {categories.map((cat, idx) => (
          <Button
            key={idx}
            variant={selectedCategory === cat ? "default" : "outline"}
            className={`text-xs sm:text-sm py-2 ${
              selectedCategory === cat ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              setInputValue("");
              setCustomInstruction(""); // ← 確実にリセット
            }}
          >
            {cat.icon} {cat.label}
          </Button>
        ))}
      </div>

      {/* テンプレートエリア */}
      {selectedCategory && (
        <div
          ref={templateRef}
          className="bg-gray-50 p-4 rounded border border-dashed text-sm whitespace-pre-wrap"
        >
          {renderTemplate()}

          {/* 📌 展開式指示 */}
          <div className="mt-4">
            {showInstructions ? (
              <>
                <textarea
                  rows={2}
                  className="w-full text-xs border rounded p-2 mb-2 resize-none"
                  placeholder="＋ あなたが追加したい指示を入力（任意）"
                  value={customInstruction}
                  onChange={(e) => setCustomInstruction(e.target.value)}
                />
                <Button onClick={() => setShowInstructions(false)} className="text-xs">
                  指示を閉じる
                </Button>
              </>
            ) : (
              <Button onClick={() => setShowInstructions(true)} className="text-xs">
                📌 指示を追加する
              </Button>
            )}
          </div>
        </div>
      )}

      {/* コピー */}
      <Button onClick={handleCopy} className="w-full py-3 text-sm sm:text-base font-semibold">
        {copied ? "✔ コピー済み" : "📋 プロンプトをコピー"}
      </Button>

      {/* 広告エリア */}
      <div className="text-center text-xs bg-gray-100 py-2 px-2 rounded border border-gray-300 text-gray-600">
        📢 広告バナー枠：ここにバナーが表示されます
      </div>

      {/* 下部固定バナー */}
      <footer className="fixed bottom-0 left-0 w-full h-10 bg-gray-200 text-center flex items-center justify-center text-xs text-gray-600 border-t border-gray-300">
        広告バナー（スマホ下部固定）
      </footer>

      {/* 使い方ガイドモーダル */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow max-w-sm w-full text-sm">
            <h2 className="text-lg font-bold mb-2">使い方ガイド</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>カテゴリを選ぶとテンプレートが表示されます</li>
              <li>テンプレート内の入力欄に内容を記入してください</li>
              <li>必要に応じて指示欄を展開して、追加指示も入力できます</li>
              <li>「プロンプトをコピー」を押してChatGPTに貼り付けて使います</li>
            </ul>
            <div className="text-right mt-4">
              <Button onClick={() => setShowHelp(false)} className="text-xs">
                閉じる
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
