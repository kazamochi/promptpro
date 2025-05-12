import Head from "next/head";
import PrompthesisGUI from "@/components/PrompthesisGUI";

export default function Home() {
  return (
    <>
      <Head>
        <title>Prompt Pro（プロプロ）</title>
        <meta name="description" content="直感的に使えるプロンプト支援ツール" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-white text-black">
        <PrompthesisGUI />
      </main>
    </>
  );
}
