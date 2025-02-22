'use client'; // Keep this to enable client-side features
import { Inter } from "next/font/google";
import "./globals.css";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@/firebase";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <html lang="en">
        <head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </FirebaseAppProvider>
  );
}



// 'use client'
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { firebaseConfig } from "@/firebase";
// import { FirebaseAppProvider } from "reactfire";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <FirebaseAppProvider firebaseConfig={firebaseConfig}>
//       <html lang="en">
//         <body className={inter.className}>{children}</body>
//       </html>
//     </FirebaseAppProvider>
//   );
// }
