import { NotificationType } from "@/components/ui/toast";
import { useState, useRef } from "react";

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message?: string;
  link?: string;
  showIcon: boolean;
  duration?: number;
}

export function useToast() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const nextIdRef = useRef(1);

  const addToast = (
    type: NotificationType,
    title: string,
    message?: string,
    link?: string,
    duration?: number
  ) => {
    const id = nextIdRef.current++;
    const newToast: NotificationItem = {
      id,
      type,
      title,
      message,
      link,
      showIcon: true,
      duration,
    };

    setNotifications(prev => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setNotifications(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (
    title: string,
    message?: string,
    link?: string,
    duration = 3000
  ) => addToast("success", title, message, link, duration);

  const error = (
    title: string,
    message?: string,
    link?: string,
    duration = 5000
  ) => addToast("error", title, message, link, duration);

  const warning = (
    title: string,
    message?: string,
    link?: string,
    duration = 4000
  ) => addToast("warning", title, message, link, duration);

  const info = (
    title: string,
    message?: string,
    link?: string,
    duration = 4000
  ) => addToast("info", title, message, link, duration);

  const loading = (title: string, message?: string) =>
    addToast("loading", title, message);

  return {
    notifications,
    success,
    error,
    warning,
    info,
    loading,
    removeToast,
  };
}
