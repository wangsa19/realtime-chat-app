
import '@/app/globals.css';
import Providers from '../providers';

export const metadata = {
  title: 'Aplikasi Chat Anda',
  description: 'Deskripsi aplikasi Anda',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
          {children} 
      </body>
    </html>
  );
}