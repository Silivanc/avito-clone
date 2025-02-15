import { FC, useState, useEffect } from "react";
import "./Notification.scss"; // Убедитесь, что у вас есть стили для анимации

interface NotificationProps {
  message: string;
  success: boolean;
}

const Notification: FC<NotificationProps> = ({ message, success }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Это будет срабатывать при изменении сообщения
  useEffect(() => {
    setIsVisible(true); // Показать уведомление

    const timer = setTimeout(() => {
      setIsVisible(false); // Скрыть уведомление через 5 секунд
    }, 5000); // Длительность показа уведомления

    // Очистка таймера при размонтировании или изменении сообщения
    return () => clearTimeout(timer);
  }, [message]); // Зависимость от message

  return (
    <div>
      {isVisible && (
        <div
          className={`notification ${isVisible ? "show" : "hide"} ${success ? "success" : "error"}`}
        >
          <p className="text-white">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;