"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChatBubbleLeftIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function SalesBots() {
  return (
    <div className="min-h-screen site-background relative overflow-hidden">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center transition-all duration-300">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Tecnobot</div>
        <ul className="flex space-x-6">
          <li><Link href="/" className="text-gray-700 hover:text-blue-600">Главная</Link></li>
          <li><Link href="/services" className="text-gray-700 hover:text-blue-600 font-semibold">Услуги</Link></li>
          <li><Link href="/portfolio" className="text-gray-700 hover:text-blue-600">Портфолио</Link></li>
          <li><Link href="/blog" className="text-gray-700 hover:text-blue-600">Блог</Link></li>
          <li><Link href="/contact" className="text-gray-700 hover:text-blue-600">Контакты</Link></li>
        </ul>
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Заказать бота
        </button>
      </nav>

      {/* Заголовок страницы */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-12"
        >
          Боты для продаж
        </motion.h1>
        <p className="text-gray-600 text-lg mb-8">
          Увеличьте конверсии с помощью умных чат-ботов, которые автоматизируют продажи и общение с клиентами.
        </p>
      </section>

      {/* Описание услуги */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Почему стоит выбрать ботов для продаж?</h2>
          <p className="text-gray-600 mb-4">
            Наши боты для продаж помогают автоматизировать процесс общения с клиентами, предлагая товары, отвечая на вопросы и направляя пользователей к покупке. Вы сможете увеличить конверсии на 20-30% за счёт персонализированного подхода и быстрого ответа.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Автоматическое предложение товаров на основе интересов клиента.</li>
            <li>Мгновенные ответы на вопросы 24/7.</li>
            <li>Интеграция с вашим интернет-магазином (Shopify, WooCommerce и др.).</li>
            <li>Аналитика для отслеживания результатов и улучшения продаж.</li>
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Заказать бота
          </motion.button>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 px-6 text-center">
        <p>© 2025 Tecnobot. Все права защищены.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer">
            <ChatBubbleLeftIcon className="w-6 h-6 text-gray-300 hover:text-blue-400" />
          </a>
          <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer">
            <PhoneIcon className="w-6 h-6 text-gray-300 hover:text-green-400" />
          </a>
        </div>
        <div className="mt-4">
          <Link href="/contact" className="text-gray-300 hover:text-white mx-2">Контакты</Link>
          <Link href="/services" className="text-gray-300 hover:text-white mx-2">Услуги</Link>
          <Link href="/blog" className="text-gray-300 hover:text-white mx-2">Блог</Link>
        </div>
      </footer>
    </div>
  );
}