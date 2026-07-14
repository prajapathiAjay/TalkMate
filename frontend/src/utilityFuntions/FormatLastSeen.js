export const FormatLastSeen = (date) => {
  if (!date) return "";

  const lastSeen = new Date(date);
  const now = new Date();

  const isToday =
    lastSeen.getDate() === now.getDate() &&
    lastSeen.getMonth() === now.getMonth() &&
    lastSeen.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    lastSeen.getDate() === yesterday.getDate() &&
    lastSeen.getMonth() === yesterday.getMonth() &&
    lastSeen.getFullYear() === yesterday.getFullYear();

  if (isToday) {
    return `Last seen ${lastSeen.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  if (isYesterday) {
    return "Last seen yesterday";
  }

  return `Last seen ${lastSeen.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })}`;
};