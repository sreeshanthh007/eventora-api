

export interface INotificationRepository {
  saveNotification(notification: {
    notificationId: string;
    userId: string;
    title: string;
    message: string;
    isRead?: boolean;
  }): Promise<void>;
}