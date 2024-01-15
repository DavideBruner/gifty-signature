import Link from "next/link";

const Footer = () => (
  <footer className="flex justify-between items-center p-6 bg-gray-200 dark:bg-gray-800">
    <div className="flex gap-4">
      <Link className="text-purple-600 dark:text-gray-200" href="#">
        Facebook
      </Link>
      <Link className="text-purple-600 dark:text-gray-200" href="#">
        Instagram
      </Link>
      <Link className="text-purple-600 dark:text-gray-200" href="#">
        Twitter
      </Link>
    </div>
    <div>
      <p className="text-purple-600 dark:text-gray-200">
        Contact us: info@giftstore.com
      </p>
    </div>
  </footer>
);

export default Footer;
