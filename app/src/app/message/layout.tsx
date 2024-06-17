import ContactSideBar from "../Components/contactSideBar";
import { Providers } from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/4">
        <ContactSideBar />
      </div>
      <div className="w-3/4 bg-gray-100">
        <Providers>{children}</Providers>
      </div>
    </div>
  );
}
