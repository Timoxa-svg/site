"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import dynamicImport from "next/dynamic";
import { useState, useEffect } from "react";

const TypeAnimation = dynamicImport(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  { ssr: false }
);
const Lottie = dynamicImport(() => import("react-lottie"), { ssr: false });
const Particles = dynamicImport(() => import("react-tsparticles"), { ssr: false });

import { loadSlim } from "@tsparticles/slim";

// Настройки для частиц
const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const particlesOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        quantity: 2,
      },
    },
  },
  particles: {
    color: {
      value: "#b3d4fc",
    },
    links: {
      color: "#b3d4fc",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "destroy",
      },
      random: false,
      speed: 0.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 50,
      limit: 100,
    },
    opacity: {
      value: 0.15,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
    life: {
      duration: {
        value: 10,
      },
      count: 1,
    },
  },
  detectRetina: true,
};

// Компоненты (без изменений)
const StatCard = ({ value, label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 60);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative bg-white p-8 rounded-lg shadow-md transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-blue-600" />
      </div>
      <div className="relative flex justify-center">
        <h3 className="text-5xl font-bold text-blue-800 text-center">
          {count}+
        </h3>
      </div>
      <p className="text-gray-600 text-center mt-4 font-medium text-lg">{label}</p>
    </motion.div>
  );
};

const AdvantageCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">{title}</h3>
      <p className="text-gray-600 text-center text-lg">{description}</p>
    </motion.div>
  );
};

const CaseCard = ({ title, before, after }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="relative bg-white p-8 rounded-lg shadow-lg transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-800 text-center">{title}</h3>
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <p className="text-gray-600 font-semibold">До</p>
          <p className="text-gray-500 text-lg">{before}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 font-semibold">После</p>
          <p className="text-gray-500 text-lg">{after}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const testimonials = [
    { name: "Анна, владелец интернет-магазина", text: "Бот для продаж увеличил наши конверсии на 35%! Теперь клиенты получают ответы мгновенно, а мы экономим время." },
    { name: "Игорь, предприниматель", text: "Автоматизация с помощью бота сэкономила нам 15 часов в неделю. Это просто магия!" },
    { name: "Елена, преподаватель", text: "Обучающий бот для моих студентов — это лучшее, что я могла внедрить. Они теперь учатся в любое время!" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        animate={{ x: ["0%", "-100%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="flex space-x-8"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-w-[300px] bg-white p-8 rounded-lg shadow-md"
          >
            <TypeAnimation
              sequence={[testimonial.text, 1000]}
              wrapper="p"
              speed={50}
              className="text-gray-600 italic mb-4 text-lg"
            />
            <p className="text-blue-800 font-semibold">{testimonial.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const BotBuilder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState({
    orders: false,
    support: false,
    education: false,
    analytics: false,
    notifications: false,
  });

  const handleFeatureChange = (feature) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const getPrice = () => {
    const basePrice = 15000;
    const featureCount = Object.values(features).filter(Boolean).length;
    const additionalCost = featureCount * 5000;
    return basePrice + additionalCost;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-center"
    >
      <h3 className="text-3xl font-bold mb-6 text-blue-800">Соберите своего бота</h3>
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full p-3 bg-gray-200 rounded-lg text-lg"
        >
          Выберите функции {isOpen ? <ChevronUpIcon className="w-5 h-5 ml-2" /> : <ChevronDownIcon className="w-5 h-5 ml-2" />}
        </button>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={features.orders}
                onChange={() => handleFeatureChange("orders")}
                className="w-5 h-5"
              />
              <span className="text-gray-600 text-lg">Приём заказов</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={features.support}
                onChange={() => handleFeatureChange("support")}
                className="w-5 h-5"
              />
              <span className="text-gray-600 text-lg">Автоматизация поддержки</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={features.education}
                onChange={() => handleFeatureChange("education")}
                className="w-5 h-5"
              />
              <span className="text-gray-600 text-lg">Обучение клиентов</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={features.analytics}
                onChange={() => handleFeatureChange("analytics")}
                className="w-5 h-5"
              />
              <span className="text-gray-600 text-lg">Аналитика и отчёты</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={features.notifications}
                onChange={() => handleFeatureChange("notifications")}
                className="w-5 h-5"
              />
              <span className="text-gray-600 text-lg">Уведомления</span>
            </label>
          </motion.div>
        )}
      </div>
      <p className="text-2xl font-bold text-blue-600 mb-6">
        Итоговая стоимость: {getPrice()} руб.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg text-lg"
      >
        Заказать бота
      </motion.button>
    </motion.div>
  );
};

const FAQChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Привет! Я бот Tecnobot. Задай мне любой вопрос о Telegram-ботах!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    let response = "";
    const question = input.toLowerCase();

    if (question.includes("telegram") || question.includes("бот")) {
      response = "Telegram-бот — это программа, которая автоматически общается с пользователями через Telegram. Они могут принимать заказы, отвечать на вопросы, отправлять уведомления и многое другое.";
    } else if (question.includes("цена") || question.includes("стоимость")) {
      response = "Стоимость разработки бота зависит от его сложности. Базовый бот стоит от 15 000 руб., а продвинутый — от 30 000 руб. Оставь заявку, чтобы получить точный расчёт!";
    } else if (question.includes("зачем") || question.includes("почему")) {
      response = "Telegram-боты помогают автоматизировать рутинные задачи, экономить время и увеличивать продажи. Например, они могут сократить рутину на 80% и увеличить конверсии на 30%.";
    } else {
      response = "Извини, я не совсем понял твой вопрос. Попробуй перефразировать или спросить что-то про Telegram-ботов!";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 1000);

    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <h3 className="text-3xl font-bold mb-6 text-blue-800 text-center">Чат с ботом</h3>
      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
          >
            <span
              className={`inline-block p-3 rounded-lg ${msg.sender === "bot" ? "bg-blue-200 text-blue-800" : "bg-gray-300 text-gray-800"}`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-3 border rounded-lg text-lg"
          placeholder="Задай вопрос..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="bg-blue-600 text-white p-3 rounded-lg"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Основной компонент страницы
export default function Services() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/telegram-bot.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Ошибка загрузки анимации:', error));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-screen site-background relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 pointer-events-none z-1">
        <div className="absolute w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl animate-pulse top-1/4 left-1/4" />
        <div className="absolute w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl animate-pulse top-3/4 right-1/4" />
      </div>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center transition-all duration-300">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Tecnobot</div>
        <ul className="flex space-x-6 items-center">
          <li><Link href="/#why" className="text-gray-700 hover:text-blue-600 font-semibold">Почему мы?</Link></li>
          <li><Link href="/#cases" className="text-gray-700 hover:text-blue-600 font-semibold">Кейсы</Link></li>
          <li><Link href="/#testimonials" className="text-gray-700 hover:text-blue-600 font-semibold">Отзывы</Link></li>
          <li><Link href="/#contact" className="text-gray-700 hover:text-blue-600 font-semibold">Контакты</Link></li>
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Заказать бота
        </motion.button>
      </nav>

      <section id="services-hero" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-6"
              >
                Услуги по созданию Telegram-ботов
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 text-xl mb-8"
              >
                Автоматизируйте ваш бизнес с помощью ботов за 3-5 дней.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center md:justify-start space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-lg text-lg"
                >
                  Оставить заявку
                </motion.button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0"
            >
              {animationData ? (
                <Lottie options={defaultOptions} height={300} width={300} />
              ) : (
                <div className="w-[300px] h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Загрузка анимации...</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services-list" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Наши услуги
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-xl text-center mb-12 max-w-2xl mx-auto"
          >
            Мы предлагаем решения для любых задач вашего бизнеса.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AdvantageCard
              icon={RocketLaunchIcon}
              title="Бот для продаж"
              description="Автоматизация приёма заказов и увеличение конверсий."
            />
            <AdvantageCard
              icon={ShieldCheckIcon}
              title="Бот для поддержки"
              description="Круглосуточная поддержка клиентов без перерывов."
            />
            <AdvantageCard
              icon={StarIcon}
              title="Обучающий бот"
              description="Автоматизация обучения и курсов для ваших клиентов."
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="text-blue-600 font-semibold text-lg flex items-center mx-auto"
            >
              {isServicesOpen ? "Скрыть дополнительные услуги" : "Показать дополнительные услуги"}
              {isServicesOpen ? <ChevronUpIcon className="w-5 h-5 ml-2" /> : <ChevronDownIcon className="w-5 h-5 ml-2" />}
            </button>
            {isServicesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
              >
                <AdvantageCard
                  icon={ClockIcon}
                  title="Уведомления"
                  description="Автоматическая отправка напоминаний и уведомлений."
                />
                <AdvantageCard
                  icon={StarIcon}
                  title="Аналитика"
                  description="Сбор данных и аналитика для роста бизнеса."
                />
                <AdvantageCard
                  icon={RocketLaunchIcon}
                  title="Интеграции"
                  description="Подключение к CRM, платежным системам и другим сервисам."
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="services-stats" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Результаты наших ботов
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard
              value="80"
              label="% рутины автоматизировано"
              icon={ClockIcon}
            />
            <StatCard
              value="30"
              label="% роста конверсий"
              icon={RocketLaunchIcon}
            />
            <StatCard
              value="15"
              label="часов в неделю экономии"
              icon={ClockIcon}
            />
            <StatCard
              value="100"
              label="довольных клиентов"
              icon={StarIcon}
            />
          </div>
        </div>
      </section>

      <section id="services-cases" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Кейсы наших ботов
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-xl text-center mb-12"
          >
            Посмотрите, как наши боты изменили бизнес наших клиентов.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CaseCard
              title="Интернет-магазин электроники"
              before="20 часов ручной обработки заказов"
              after="3 часа с ботом"
            />
            <CaseCard
              title="Курсы английского языка"
              before="300 студентов без автоматизации"
              after="Автоматизированное обучение для всех"
            />
            <CaseCard
              title="Техническая поддержка"
              before="60% нагрузки на сотрудников"
              after="Нагрузка снижена до 5%"
            />
          </div>
        </div>
      </section>

      <section id="services-testimonials" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Что говорят наши клиенты
          </motion.h2>
          <TestimonialCarousel />
        </div>
      </section>

      <section id="services-builder" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Соберите своего бота за 2 минуты
          </motion.h2>
          <BotBuilder />
        </div>
      </section>

      <section id="services-faq" className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="bg-white/80 shadow-lg rounded-lg p-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            Ответы на ваши вопросы
          </motion.h2>
          <FAQChat />
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Tecnobot</h3>
              <p className="text-gray-300">Создаём Telegram-ботов для автоматизации бизнеса.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li><Link href="/#why" className="text-gray-300 hover:text-white">Почему мы?</Link></li>
                <li><Link href="/#cases" className="text-gray-300 hover:text-white">Кейсы</Link></li>
                <li><Link href="/#testimonials" className="text-gray-300 hover:text-white">Отзывы</Link></li>
                <li><Link href="/#contact" className="text-gray-300 hover:text-white">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Свяжитесь с нами</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer">
                  <ChatBubbleLeftIcon className="w-6 h-6 text-gray-300 hover:text-blue-400" />
                </a>
                <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer">
                  <PhoneIcon className="w-6 h-6 text-gray-300 hover:text-green-400" />
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Поговорить с ботом
              </motion.button>
            </div>
          </div>
          <p className="mt-8">© 2025 Tecnobot. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
