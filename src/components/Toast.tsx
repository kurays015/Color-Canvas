"use client";

import { useToast } from "@/hooks/useToast";
import Notification from "./ui/toast";

export default function Toast() {
  const { notifications, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm z-50 space-y-2 p-4">
      {notifications.map(toast => (
        <Notification
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
