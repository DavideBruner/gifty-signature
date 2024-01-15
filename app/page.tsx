import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main key="1" className="bg-gray-100 min-h-screen dark:bg-gray-900">
      <section className="relative bg-purple-200 dark:bg-gray-800 h-96 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <GiftIcon className="h-12 w-12 text-gray-500 dark:text-gray-200" />
          <h2 className="text-4xl font-bold text-gray-500 dark:text-gray-200">
            🎁 Welcome to the Gift Store! 🎁
          </h2>
        </div>
      </section>
      <section className="relative bg-gray-200 dark:bg-gray-700 h-64 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-500 dark:text-gray-200">
          🎉 Special Offers! 🎉
        </h2>
      </section>
      <section className="p-6 bg-gray-100 dark:bg-gray-700">
        <h2 className="text-3xl font-bold text-gray-500 dark:text-gray-200 mb-4">
          🔥 Trending Products 🔥
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Product 1"
              className="object-cover w-full h-64"
              height={400}
              src="/placeholder.svg"
              style={{
                aspectRatio: "500/400",
                objectFit: "cover",
              }}
              width={500}
            />
            <div className="bg-gray-100 p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Cute Teddy Bear</h3>
              <h4 className="font-semibold text-lg md:text-xl text-gray-500">
                $29.99
              </h4>
              <Button className="mt-2">Add to Cart</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-purple-200 dark:bg-gray-800 h-64 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-500 dark:text-gray-200">
          🎁 New Arrivals! 🎁
        </h2>
      </section>
      <section className="p-6 bg-gray-200 dark:bg-gray-700">
        <h2 className="text-3xl font-bold text-gray-500 dark:text-gray-200 mb-4">
          🎉 Latest Products 🎉
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Latest Product 1"
              className="object-cover w-full h-64"
              height={400}
              src="/placeholder.svg"
              style={{
                aspectRatio: "500/400",
                objectFit: "cover",
              }}
              width={500}
            />
            <div className="bg-gray-100 p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">New Arrival 1</h3>
              <h4 className="font-semibold text-lg md:text-xl text-gray-500">
                $49.99
              </h4>
              <Button className="mt-2">Add to Cart</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gray-100 dark:bg-gray-700 h-64 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-500 dark:text-gray-200">
          🐾 Pet Lovers! 🐾
        </h2>
      </section>
      <section className="p-6 bg-purple-200 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-gray-500 dark:text-gray-200 mb-4">
          🐾 Most Bought for Pets 🐾
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Pet Product 1"
              className="object-cover w-full h-64"
              height={400}
              src="/placeholder.svg"
              style={{
                aspectRatio: "500/400",
                objectFit: "cover",
              }}
              width={500}
            />
            <div className="bg-gray-100 p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Pet Toy 1</h3>
              <h4 className="font-semibold text-lg md:text-xl text-gray-500">
                $19.99
              </h4>
              <Button className="mt-2">Add to Cart</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
