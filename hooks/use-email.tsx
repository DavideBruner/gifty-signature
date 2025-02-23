export default function useEmail() {
  const sendEmail = async (
    values: Record<string, any> & { type: "info_email" | "order_email" }
  ) => {
    const result = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    });

    const data = await result.json();
    return data;
  };
  return { sendEmail };
}
