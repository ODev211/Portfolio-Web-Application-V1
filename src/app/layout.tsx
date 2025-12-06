import './globals.css';
import Navbar from '../components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Professional Portfolio',
  description: 'Built with Next.js and React',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--text-color)' }}>
          <p>© 2025 Developer Portfolio</p>
        </footer>
      </body>
    </html>
  );
}