"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { loadSlim } from "@tsparticles/slim";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import {
  StarIcon,
  UserIcon,
  CalendarIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  UsersIcon,
  ClockIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Динамические импорты
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });


// Настройка частиц
const particlesInit = async (engine) => {
  await loadSlim(engine);
  await loadStarsPreset(engine);
};

const particlesOptions = {
  preset: "stars",
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 120, density: { enable: true, value_area: 1200 } },
    color: { value: ["#b3d4fc", "#f9e2af", "#f5f5f5"] },
    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.2 } },
    size: { value: 3, random: true, anim: { enable: true, speed: 3, size_min: 0.5 } },
    move: { enable: true, speed: 0.8, direction: "none", random: true, out_mode: "out" },
    links: { enable: true, distance: 150, color: "#b3d4fc", opacity: 0.3, width: 1 },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { bubble: { distance: 250, size: 5, duration: 2, opacity: 0.9 }, push: { quantity: 5 } },
  },
  retina_detect: true,
};

export default function Home() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const phrases = ["ваших продаж", "роста бизнеса", "автоматизации задач"];
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const animationFrameRef = useRef(null);
  const globeRef = useRef(null);

  // Состояние для формы
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formProgress, setFormProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Симуляция загрузки сайта
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Плавный скролл
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Отслеживание скролла для кнопки "Наверх"
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const letterVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
    }),
  };

  const phraseVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      textShadow: ["none", "0 0 20px rgba(59, 130, 246, 0.9)", "none"],
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const renderTextWithSpaces = (text) => {
    return text.split("").map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        custom={i}
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="inline-block text-blue-300"
        style={{ whiteSpace: "nowrap" }} // Предотвращаем перенос текста
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsServicesOpen(!isServicesOpen);
    }
  };

  // Данные для секций
  const telegramFacts = [
    { icon: <UsersIcon className="w-14 h-14 text-blue-300" />, title: "1 миллиард пользователей", description: "Активная аудитория Telegram по всему миру." },
    { icon: <ClockIcon className="w-14 h-14 text-blue-300" />, title: "50+ минут в день", description: "Среднее время, которое пользователи проводят в Telegram." },
    { icon: <LockClosedIcon className="w-14 h-14 text-blue-300" />, title: "Максимальная безопасность", description: "Шифрование и секретные чаты для защиты данных." },
  ];

  const stats = [
    { icon: <StarIcon className="w-8 h-8 text-blue-300" />, number: "150+", unit: "проектов", description: "Успешно реализованных ботов для бизнеса." },
    { icon: <UserIcon className="w-8 h-8 text-blue-300" />, number: "95%", unit: "довольных клиентов", description: "Клиенты возвращаются к нам снова." },
    { icon: <CalendarIcon className="w-8 h-8 text-blue-300" />, number: "С 2022", unit: "года", description: "Создаём ботов, которые меняют бизнес." },
  ];

  const chartDataRevenue = [
    { name: "1 месяц", revenue: 50 },
    { name: "2 месяц", revenue: 100 },
    { name: "3 месяц", revenue: 150 },
  ];

  const botSolutions = [
    { icon: <ShoppingCartIcon className="w-14 h-14 text-blue-300" />, title: "Интернет-магазины", description: "Автоматизация заказов и поддержки клиентов." },
    { icon: <BuildingStorefrontIcon className="w-14 h-14 text-blue-300" />, title: "Рестораны", description: "Бронирование столов и заказ еды в Telegram." },
    { icon: <HeartIcon className="w-14 h-14 text-blue-300" />, title: "Фитнес-клубы", description: "Запись на тренировки и напоминания." },
    { icon: <AcademicCapIcon className="w-14 h-14 text-blue-300" />, title: "Образовательные курсы", description: "Тесты, уведомления и автоматизация обучения." },
    { icon: <SparklesIcon className="w-14 h-14 text-blue-300" />, title: "Салоны красоты", description: "Онлайн-запись и напоминания для клиентов." },
  ];

  const testimonials = [
    { name: "Анна, владелец магазина", text: "Бот увеличил мои продажи на 30%! Теперь клиенты заказывают прямо в Telegram.", avatar: "/avatars/anna.jpg" },
    { name: "Игорь, фитнес-тренер", text: "Запись на тренировки стала проще, клиенты в восторге от удобства.", avatar: "/avatars/igor.jpg" },
    { name: "Мария, образовательный центр", text: "Автоматизация тестов и уведомлений сэкономила нам кучу времени!", avatar: "/avatars/maria.jpg" },
  ];

  const pricingPlans = [
    { title: "Базовый", price: "15,000 ₽", features: ["Простой бот", "1 неделя разработки", "Базовая поддержка"], cta: "Выбрать" },
    { title: "Продвинутый", price: "30,000 ₽", features: ["Сложный бот", "2 недели разработки", "Интеграция с CRM", "Поддержка 1 месяц"], cta: "Выбрать", popular: true },
    { title: "Премиум", price: "50,000 ₽", features: ["Кастомный бот", "3 недели разработки", "Полная интеграция", "Поддержка 3 месяца"], cta: "Выбрать" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  const Counter = ({ target, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target.replace(/\D/g, "")) || 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target, duration]);

    return <motion.span>{target.includes("С") ? target : `${count}${target.replace(/\d/g, "")}`}</motion.span>;
  };

  const handleMouseDown = (e) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
      lastXRef.current = e.pageX;
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startMomentumScroll();
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      startMomentumScroll();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft - walk;

      const currentX = e.pageX;
      const deltaX = currentX - lastXRef.current;
      velocityRef.current = deltaX * 0.1;
      lastXRef.current = currentX;
    }
  };

  const startMomentumScroll = () => {
    const animate = () => {
      if (Math.abs(velocityRef.current) < 0.1) {
        cancelAnimationFrame(animationFrameRef.current);
        return;
      }

      if (scrollRef.current) {
        scrollRef.current.scrollLeft += velocityRef.current;
        velocityRef.current *= 0.95;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Обработчики для формы
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Имя обязательно";
    if (!formData.email.trim()) {
      errors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Некорректный email";
    }
    if (!formData.message.trim()) errors.message = "Сообщение обязательно";
    if (formData.file && formData.file.size > 5 * 1024 * 1024) {
      errors.file = "Файл не должен превышать 5 МБ";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateProgress = () => {
    let filledFields = 0;
    if (formData.name.trim()) filledFields++;
    if (formData.email.trim()) filledFields++;
    if (formData.message.trim()) filledFields++;
    if (formData.file) filledFields++;
    setFormProgress((filledFields / 4) * 100);
  };

  useEffect(() => {
    calculateProgress();
  }, [formData, calculateProgress]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: "", email: "", message: "", file: null });
          setFormProgress(0);
        }, 3000);
      } else {
        setSubmitMessage("Ошибка при отправке анкеты. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setSubmitMessage("Произошла ошибка. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      {/* Лоадер */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Частицы */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />

      {/* SEO метатеги */}
      <Head>
        <title>Tecnobot - Умные Telegram боты для вашего бизнеса</title>
        <meta name="description" content="Tecnobot создаёт Telegram боты, которые автоматизируют бизнес, увеличивают продажи и экономят время." />
        <meta name="keywords" content="Tecnobot, Telegram боты, чат-боты, автоматизация бизнеса, продажи" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </Head>

      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl shadow-xl py-4 px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-playfair"
        >
          Tecnobot
        </motion.div>
        <ul className="flex space-x-8 items-center">
          {["Главная", "Услуги", "Портфолио", "Блог", "Контакты"].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {item === "Услуги" ? (
                <div className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onKeyDown={handleKeyDown}
                    className="text-gray-200 hover:text-cyan-300 flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors font-medium"
                  >
                    Услуги
                    {isServicesOpen ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                  </button>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-8 left-0 bg-gray-900/90 backdrop-blur-lg shadow-2xl rounded-xl py-3 w-48 z-50 border border-cyan-500/20"
                    >
                      <Link href="/" className="block px-4 py-2 text-gray-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors" onClick={() => setIsServicesOpen(false)}>
                        Чат-боты
                      </Link>
                      <button disabled className="block w-full text-left px-4 py-2 text-gray-500 cursor-not-allowed">
                        Сайты (скоро)
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link href={item === "Главная" ? "/" : `/${item.toLowerCase()}`} className="text-gray-200 hover:text-cyan-300 font-medium transition-colors">
                  {item}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all font-medium"
        >
          Заказать бота
        </motion.button>
      </nav>

      {/* Геройская секция */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white font-playfair leading-tight"

            >
              Умные боты для{" "}
              <motion.span
                key={currentPhrase}
                variants={phraseVariants}
                initial="initial"
                animate="animate"
                className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent inline-block"
                style={{ whiteSpace: "nowrap" }} // Предотвращаем перенос текста
              >
                {renderTextWithSpaces(phrases[currentPhrase])}
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-300 text-lg sm:text-xl mt-6 mb-8 font-inter"
            >
              Автоматизируйте бизнес, увеличивайте продажи и экономите время с Telegram-ботами от Tecnobot.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all font-inter"
              >
                Заказать бота
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="border border-cyan-500 text-cyan-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-500/15 transition-all font-inter"
              >
                Попробовать демо
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="md:w-1/2 flex justify-center md:justify-end relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-30 -z-10" />
              <Player loop autoplay src="/animations/telegram-bot.json" style={{ height: 450, width: 450 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция "Почему Telegram" */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-16 font-playfair"
        >
          Почему Telegram?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {telegramFacts.map((fact, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
              className="relative bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 border border-cyan-500/10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex justify-center mb-6"
              >
                {fact.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-3 font-playfair">{fact.title}</h3>
              <p className="text-gray-300 font-inter">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция "Наш опыт" */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Наш опыт
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl text-center mb-16 font-inter"
        >
          Мы создаём ботов, которые помогают бизнесу расти и процветать.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
              className="relative bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 border border-cyan-500/10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex justify-center mb-6"
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3 font-playfair">
                <Counter target={stat.number} duration={2000} />{" "}
                <span className="text-xl text-gray-300">{stat.unit}</span>
              </h3>
              <p className="text-gray-300 font-inter">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция "Чат-бот — это выгодно!" */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Чат-бот — это выгодно!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl text-center mb-16 font-inter"
        >
          Доход наших клиентов растёт в среднем на 200% за 3 месяца.
        </motion.p>
        <div className="relative w-full h-[450px] bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-cyan-500/10">
          {isClient ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartDataRevenue} margin={{ top: 50, right: 50, left: 50, bottom: 50 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.7} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
                      <feBlend in="SourceGraphic" in2="glow" mode="screen" />
                    </filter>
                  </defs>
                  <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 14 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 14 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="url(#colorRevenue)"
                    strokeWidth={5}
                    dot={{ r: 8, fill: "#22D3EE", stroke: "#60A5FA", strokeWidth: 3, filter: "url(#glow)" }}
                    activeDot={false}
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                    filter="url(#glow)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-16 left-10 bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-2xl max-w-[200px] text-gray-200 text-sm border border-cyan-500/20 font-inter"
              >
                <p className="text-cyan-300">Сколько стоит чат-бот?</p>
                <div className="absolute bottom-[-10px] left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-gray-800" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-10 right-10 bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-2xl max-w-[250px] text-gray-200 text-sm border border-cyan-500/20 font-inter"
              >
                <p className="text-cyan-300">Доход вырос на 200% за 3 месяца!</p>
                <div className="absolute top-[-10px] right-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-gray-800" />
              </motion.div>
            </>
          ) : (
            <div className="w-full h-[450px] flex items-center justify-center text-gray-300 font-inter">
              График загружается... Доход вырос с 50 тыс. руб. до 150 тыс. руб.
            </div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all font-inter"
          >
            Заказать чат-бота
          </motion.button>
        </motion.div>
      </section>

      {/* Секция "Решение для любого бизнеса" */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Решение для любого бизнеса
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl text-center mb-16 font-inter"
        >
          Автоматизируйте процессы с помощью Telegram-ботов, созданных специально для вашей ниши.
        </motion.p>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {botSolutions.map((solution, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                viewport={{ once: true }}
                className="min-w-[320px] bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-cyan-500/10 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-500 snap-center group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex justify-center mb-6"
                >
                  {solution.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-3 text-center font-playfair">{solution.title}</h3>
                <p className="text-gray-300 text-center mb-6 font-inter">{solution.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all font-inter"
                >
                  Заказать
                </motion.button>
              </motion.div>
            ))}
          </div>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </section>

      {/* Секция "Отзывы клиентов" */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Что говорят наши клиенты
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl text-center mb-16 font-inter"
        >
          Реальные отзывы от тех, кто уже автоматизировал бизнес с помощью наших ботов.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
              className="relative bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 border border-cyan-500/10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="flex items-center mb-6">
                <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="w-12 h-12 rounded-full mr-4 object-cover" loading="lazy" />
                <div>
                  <h3 className="text-lg font-semibold text-white font-playfair">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-300 font-inter">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция "Цены" */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Выберите свой план
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl text-center mb-16 font-inter"
        >
          Прозрачные цены для любого бизнеса. Выберите план, который подходит именно вам.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
              className={`relative bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 border ${plan.popular ? "border-cyan-500" : "border-cyan-500/10"} group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Популярный
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white mb-3 text-center font-playfair">{plan.title}</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent text-center mb-6 font-playfair">{plan.price}</p>
              <ul className="text-gray-300 mb-8 font-inter">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-3">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-cyan-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all font-inter"
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/50 to-gray-800/50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Готовы автоматизировать бизнес?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl mb-8 font-inter"
        >
          Свяжитесь с нами и получите бота, который изменит ваш бизнес!
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all font-inter"
        >
          Начать сейчас
        </motion.button>
      </section>

      {/* Секция с анкетой */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair"
        >
          Свяжитесь с нами
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg sm:text-xl text-center mb-16 font-inter"
        >
          Заполните анкету, и мы свяжемся с вами в ближайшее время!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-cyan-500/10 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-50 -z-10" />
          {/* Индикатор прогресса */}
          <div className="mb-6">
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2 font-inter">Прогресс заполнения: {Math.round(formProgress)}%</p>
          </div>
          {/* Анимация успешной отправки */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-2xl z-50"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                  transition={{ duration: 1.5 }}
                  className="flex flex-col items-center"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-400" />
                  <p className="text-white text-lg mt-4 font-inter">Анкета успешно отправлена!</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-200 font-semibold mb-2 font-inter">
                Имя
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.name ? "border-red-500" : "border-cyan-500/20"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                required
              />
              {formErrors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center font-inter"
                >
                  <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                  {formErrors.name}
                </motion.p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-200 font-semibold mb-2 font-inter">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.email ? "border-red-500" : "border-cyan-500/20"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                required
              />
              {formErrors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center font-inter"
                >
                  <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                  {formErrors.email}
                </motion.p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-200 font-semibold mb-2 font-inter">
                Сообщение
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.message ? "border-red-500" : "border-cyan-500/20"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                rows="5"
                required
              />
              {formErrors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center font-inter"
                >
                  <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                  {formErrors.message}
                </motion.p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="file" className="block text-gray-200 font-semibold mb-2 font-inter">
                Прикрепить файл (до 5 МБ)
              </label>
              <motion.input
                type="file"
                id="file"
                name="file"
                onChange={handleFormChange}
                whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.file ? "border-red-500" : "border-cyan-500/20"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600`}
              />
              {formErrors.file && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center font-inter"
                >
                  <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                  {formErrors.file}
                </motion.p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              className={`w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all font-inter ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </motion.button>
            {submitMessage && !isSuccess && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-center ${submitMessage.includes("успешно") ? "text-green-400" : "text-red-400"} font-inter`}
              >
                {submitMessage}
              </motion.p>
            )}
          </form>
        </motion.div>
      </section>

      {/* Футер */}
      <footer className="relative py-16 px-6 bg-gray-950 text-gray-300 text-center z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-playfair"
            >
              Tecnobot
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex space-x-6 mt-4 md:mt-0"
            >
              <Link href="/about" className="hover:text-cyan-300 transition-colors font-inter">О нас</Link>
              <Link href="/portfolio" className="hover:text-cyan-300 transition-colors font-inter">Портфолио</Link>
              <Link href="/blog" className="hover:text-cyan-300 transition-colors font-inter">Блог</Link>
              <Link href="/contact" className="hover:text-cyan-300 transition-colors font-inter">Контакты</Link>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter"
          >
            © 2025 Tecnobot. Все права защищены.
          </motion.p>
        </div>
      </footer>

      {/* Кнопка "Наверх" */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(34, 211, 238, 0.7)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all z-50"
          >
            <ArrowUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
