import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const publicPages = [];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  // Check if the current page matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <div className="flex flex-no-wrap overflow-auto	">
              <div className="sticky top-0">
                <Sidebar />
              </div>
              <div className="w-full h-full flex flex-col">
                <Header userButton={<UserButton/> }/>
                <div className="container mx-auto py-10 h-[92vh] bg-white w-13/14 px-6">
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
