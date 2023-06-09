  // to show hours ago and days ago
  export const getDuration = (created_at) => {
    const currentTime = new Date();
    const postTime = new Date(created_at);
    const timeDiff = currentTime - postTime;
    const duration = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysAgo = Math.floor(duration / 24);

    if (daysAgo > 0) {
      return `${daysAgo}d`;
    } else if (duration === 0) {
      return "Just now";
    } else if (duration === 1) {
      return "1h";
    } else {
      return `${duration}h`;
    }
  };