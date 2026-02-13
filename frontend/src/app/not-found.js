import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-7xl  font-extrabold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className=" ">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 rounded-2xl  bg-background text-black  font-semibold shadow-xl hover:scale-105 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
