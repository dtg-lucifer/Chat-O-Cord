import '~/app/(index)/globals.scss'
import "~/app/(index)/_variables.scss";

import { Inter } from 'next/font/google'
import { ReactQeuryProvider } from '~/components/providers/ReactQueryProvider';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'Chat-O-Cord',
  description: 'The place where the world connects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQeuryProvider>{children}</ReactQeuryProvider>
      </body>
    </html>
  )
}
