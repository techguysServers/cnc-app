import "tailwindcss/tailwind.css";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-no-wrap overflow-auto	">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className="w-full h-full">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
