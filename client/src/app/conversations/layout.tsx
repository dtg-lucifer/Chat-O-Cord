import { Inter } from "next/font/google";
import DashBoardMiniSideBar from "~/components/sidebar/DashBoardMiniSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UserName | Chat",
  description: "The place where the world connects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          display: "flex",
        }}
      >
        <DashBoardMiniSideBar />
        {children}
      </body>
    </html>
  );
}
