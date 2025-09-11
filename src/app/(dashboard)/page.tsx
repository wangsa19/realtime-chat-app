// src/app/landing/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import {
  MessageCircle,
  Check,
  CheckCheck,
  Shield,
  Users,
  Archive,
  Code,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

// Types
interface ChatMessage {
  id: number;
  text: string;
  isOwn: boolean;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

// Components
const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">ChatFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-orange-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-slate-600 hover:text-orange-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-slate-600 hover:text-orange-500 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-slate-200 bg-white/90 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-slate-600 hover:text-orange-500 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-orange-500 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-orange-500 transition-colors"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-center text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

const ChatPreview: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hey! How's your day going? 😊",
      isOwn: true,
      timestamp: "2:30 PM",
      status: "read",
    },
    {
      id: 2,
      text: "Great! Just finished my project. How about you?",
      isOwn: false,
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      text: "Awesome! Let's celebrate later! 🎉",
      isOwn: true,
      timestamp: "2:32 PM",
      status: "delivered",
    },
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: 4,
            text: "Sounds perfect! Can't wait! ✨",
            isOwn: false,
            timestamp: "2:33 PM",
          },
        ]);
      }, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const StatusIcon: React.FC<{ status: "sent" | "delivered" | "read" }> = ({
    status,
  }) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-slate-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-slate-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative max-w-md mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-6 animate-float">
        {/* Chat Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
          <div className="relative">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">John Doe</h3>
            <p className="text-xs text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Online
            </p>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col max-w-xs ${
                  message.isOwn ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-slate-200 text-slate-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div
                  className={`flex items-center mt-1 text-xs text-slate-500 ${
                    message.isOwn ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className={message.isOwn ? "mr-1" : "ml-1"}>
                    {message.timestamp}
                  </span>
                  {message.isOwn && message.status && (
                    <StatusIcon status={message.status} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 bg-slate-200 px-4 py-2 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-xl">💬</span>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
      >
        <CheckCheck className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>
  );
};

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`${feature.gradient} p-8 rounded-2xl border hover:shadow-lg transition-all duration-300`}
    >
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-3">
        {feature.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

// Main Component
const LandingPage: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-600" />,
      title: "Real-time Messages",
      description:
        "Send and receive messages instantly with WebSocket technology. No delays, no waiting.",
      gradient:
        "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    },
    {
      icon: <CheckCheck className="w-6 h-6 text-blue-600" />,
      title: "Message Status",
      description:
        "See when your messages are sent, delivered, and read with visual indicators.",
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Secure Authentication",
      description:
        "Your conversations are protected with NextAuth.js and secure password hashing.",
      gradient: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Contact Management",
      description:
        "Easily manage your contacts and see who's online. Start conversations instantly.",
      gradient:
        "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    },
    {
      icon: <Archive className="w-6 h-6 text-pink-600" />,
      title: "Message History",
      description:
        "Never lose your conversations. All messages are stored securely and accessible anytime.",
      gradient: "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200",
    },
    {
      icon: <Code className="w-6 h-6 text-teal-600" />,
      title: "Modern Technology",
      description:
        "Built with Next.js, React, and Socket.IO for the best performance and user experience.",
      gradient: "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200",
    },
  ];

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                  Connect{" "}
                  <motion.span
                    className="text-orange-500"
                    animate={{ color: ["#f97316", "#ea580c", "#f97316"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Instantly
                  </motion.span>
                  <br />
                  Chat{" "}
                  <motion.span
                    className="text-orange-500"
                    animate={{ color: ["#ea580c", "#f97316", "#ea580c"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    Seamlessly
                  </motion.span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-slate-600 mb-8 leading-relaxed"
                >
                  Experience real-time communication like never before. ChatFlow
                  brings you closer to your contacts with instant messaging,
                  read receipts, and seamless user experience.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                >
                  <Link
                    href="/auth/signup"
                    className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start Chatting Now
                  </Link>
                  <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
                    Learn More
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-slate-500"
                >
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span>Real-time messaging</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <span>Secure & Private</span>
                  </div>
                </motion.div>
              </motion.div>

              <ChatPreview />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Everything you need for seamless communication, built with
                modern technology
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-orange-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Chatting?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust ChatFlow for their daily
              communication needs. Sign up now and experience the future of
              messaging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("/auth/signup", "_blank")}
                className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition duration-300 shadow-lg"
              >
                Create Free Account
              </button>
              <button
                onClick={() => window.open("/auth/signin", "_blank")}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">ChatFlow</span>
                </div>
                <p className="text-slate-300">
                  Real-time communication made simple and secure for everyone.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Security
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      API
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
              <p>
                &copy; 2024 ChatFlow. All rights reserved. Built with ❤️ and
                modern technology.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
