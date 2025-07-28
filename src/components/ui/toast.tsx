"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

// Define the props for our Icon components
interface IconProps {
  className?: string;
}

// Information Icon SVG
const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Success Icon SVG
const SuccessIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Warning Icon SVG
const WarningIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

// Error Icon SVG
const ErrorIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Close Icon SVG
const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Loading Spinner SVG
const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Define the types for the notification variants
export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "loading";

// Define the notification position types
export type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

// Define the props for the Notification component
interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  showIcon?: boolean;
  duration?: number;
  onClose: () => void;
  link?: string; // Keep as string to match useToast hook
}

// A map to store styles and icons for each notification type with dark violet gradient theme
const notificationConfig = {
  info: {
    bgColor: "bg-violet-900/40 dark:bg-violet-950/60",
    borderColor: "border-violet-700/50 dark:border-violet-600/40",
    iconColor: "text-violet-300 dark:text-violet-400",
    icon: <InfoIcon className="h-6 w-6" />,
    gradient: "from-violet-800/30 via-purple-800/20 to-indigo-900/30",
  },
  success: {
    bgColor: "bg-emerald-900/40 dark:bg-emerald-950/60",
    borderColor: "border-emerald-700/50 dark:border-emerald-600/40",
    iconColor: "text-emerald-300 dark:text-emerald-400",
    icon: <SuccessIcon className="h-6 w-6" />,
    gradient: "from-emerald-800/30 via-teal-800/20 to-violet-900/30",
  },
  warning: {
    bgColor: "bg-amber-900/40 dark:bg-amber-950/60",
    borderColor: "border-amber-700/50 dark:border-amber-600/40",
    iconColor: "text-amber-300 dark:text-amber-400",
    icon: <WarningIcon className="h-6 w-6" />,
    gradient: "from-amber-800/30 via-orange-800/20 to-violet-900/30",
  },
  error: {
    bgColor: "bg-rose-900/40 dark:bg-rose-950/60",
    borderColor: "border-rose-700/50 dark:border-rose-600/40",
    iconColor: "text-rose-300 dark:text-rose-400",
    icon: <ErrorIcon className="h-6 w-6" />,
    gradient: "from-rose-800/30 via-red-800/20 to-violet-900/30",
  },
  loading: {
    bgColor: "bg-slate-900/40 dark:bg-slate-950/60",
    borderColor: "border-slate-700/50 dark:border-slate-600/40",
    iconColor: "text-slate-300 dark:text-slate-400",
    icon: <LoadingSpinner className="h-6 w-6" />,
    gradient: "from-slate-800/30 via-gray-800/20 to-violet-900/30",
  },
};

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  showIcon = true,
  duration,
  onClose,
  link,
}) => {
  const config = notificationConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-sm rounded-xl p-4 backdrop-blur-xl bg-black/60 dark:bg-black/80 border border-violet-600/30 dark:border-violet-500/40 overflow-hidden ring-1 ring-violet-500/20 dark:ring-violet-400/30 shadow-2xl shadow-violet-900/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-violet-800/60`}
    >
      <div
        className={`absolute top-0 left-0 h-full w-full bg-gradient-to-br ${config.gradient} opacity-70`}
      />

      <div className="relative z-10 flex items-start space-x-3">
        {showIcon && (
          <div className={`flex-shrink-0 ${config.iconColor} mt-0.5`}>
            {config.icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-300 dark:text-slate-100 text-base leading-tight">
            {title}
          </p>

          {message && (
            <div className="text-sm text-slate-300 dark:text-slate-300 mt-1 leading-relaxed flex gap-2">
              {message}
              {link && (
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 transition-colors group"
                >
                  <FiExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform " />
                </Link>
              )}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-violet-800/40 dark:hover:bg-violet-700/50"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      {duration && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-violet-900/60 dark:bg-violet-800/40 rounded-b-xl overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            onAnimationComplete={() => onClose()}
            className="h-full bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 dark:from-violet-300 dark:via-purple-300 dark:to-indigo-300"
          />
        </div>
      )}
    </motion.div>
  );
};

export default Notification;
