import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-2xl font-serif text-brand-brown mb-4">
        Thank You for Your Order!
      </h1>
      <p className="text-muted-foreground mb-8">
        We have received your order request and will contact you shortly with a
        quotation including shipping costs.
      </p>
      <Button className="bg-brand-brown text-white" asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
