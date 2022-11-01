import { useState } from "preact/hooks";

interface MailerLiteProps {
  submitUrl: string;
}

export default function MailerLite(props: MailerLiteProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: Event) => {
    e.preventDefault();
    if (submitted) return;
    const data = new FormData();
    data.append("fields[email]", email);
    console.log(props.submitUrl);

    const res = await fetch(props.submitUrl, {
        method: "POST",
        body: data,
    });
    const json = await res.json();
    if (json.success) {
        setSubmitted(true);
    }
  };

  return (
    <form onSubmit={submit} class="flex flex-col items-center justify-center">
      <input
        type="email"
        name="email"
        placeholder="Your email"
        class="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={email}
        onInput={(e) =>
          setEmail((e.target as HTMLInputElement).value)}
        required
      />
      <button
        onClick={submit}
        class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {submitted ? "Thanks!" : "Subscribe"}
      </button>
    </form>
  );
}
