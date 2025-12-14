import { Notification } from "../../models/notification/notificationmodel.js";

/**
 * 🔔 Create Notification
 * (like / comment / follow / share)
 */
export const createNotification = async ({
  userId,
  type,
  actorId,
  postId = null,
  commentId = null,
}) => {
  // ❌ নিজেকে নিজে notification না
  if (userId.toString() === actorId.toString()) return;

  await Notification.create({
    userId,
    type,
    actorId,
    target: {
      postId,
      commentId,
    },
  });
};

/**
 * 🔔 Get logged-in user's notifications
 */
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    })
      .populate("actorId", "name profileImage userid ")
      .populate("userId", "name profileImage userid ")
      .sort({ createdAt: -1 })
      .limit(30);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔔 Mark single notification as read
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🔔 Mark all notifications as read
 */
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
