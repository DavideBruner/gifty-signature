import Link from "next/link";

const Header = () => (
  <>
    <header className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-purple-600 dark:text-gray-200">
        Gift Store
      </h1>
    </header>
    <nav className="w-full bg-purple-100 dark:bg-gray-700 border-t border-purple-300 dark:border-gray-600 py-2">
      <ul className="flex justify-center gap-4">
        <li>
          <Link className="text-purple-600 dark:text-gray-200" href="#">
            Woman
          </Link>
        </li>
        <li>
          <Link className="text-purple-600 dark:text-gray-200" href="#">
            Men
          </Link>
        </li>
        <li>
          <Link className="text-purple-600 dark:text-gray-200" href="#">
            Kids
          </Link>
        </li>
        <li>
          <Link className="text-purple-600 dark:text-gray-200" href="#">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-purple-600 dark:text-gray-200" href="#">
            Pets
          </Link>
        </li>
        <li>
          <Link className="text-purple-600 dark:text-gray-200" href="#">
            Special
          </Link>
        </li>
      </ul>
    </nav>
  </>
);

export default Header;
