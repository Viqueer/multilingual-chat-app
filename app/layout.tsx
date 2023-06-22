import "./globals.css";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";
import ToasterContext from "./context/ToasterContext";
import TranslationContextWrapper from "./components/TranslationContextWrapper";

export const metadata = {
  title: "Multilingua",
  description: "A multilingual chat app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TranslationContextWrapper>
          <AuthContext>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </AuthContext>
        </TranslationContextWrapper>
      </body>
    </html>
  );
}
