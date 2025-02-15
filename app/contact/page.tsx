import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-brown text-center mb-6">
        Contact Us
      </h1>
      <p className="text-center text-brand-dark mb-8">
        We'd love to hear from you. Whether you have a question about our
        products, need help with a custom order, or just want to say hello,
        don't hesitate to reach out.
      </p>
      <p className="text-center text-brand-dark mb-8">
        We're happy to assist you in multiple languages: 🇬🇧 English, 🇪🇸 Spanish,
        🇮🇹 Italian
      </p>
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
      <div className="mt-12 text-center">
        <h2 className="font-serif text-2xl text-brand-brown mb-4">
          Our Location
        </h2>
        <p className="text-brand-dark">Rincon de la Victoria, Malaga</p>
      </div>
    </div>
  );
}
