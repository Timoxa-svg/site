import './globals.css';
import { Inter, Poppins } from 'next/font/google';

// Инициализация шрифтов
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'], // Убираем cyrillic
  weight: ['600'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Tecnobot - Создание Telegram-ботов для бизнеса',
  description: 'Разрабатываем Telegram-боты для автоматизации, продаж и поддержки.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}