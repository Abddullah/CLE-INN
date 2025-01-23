const getGreetingMessage = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return { message: "Good Morning", icon: "sun", color: colors.yellow };
    } else if (hours >= 12 && hours < 17) {
      return { message: "Good Afternoon", icon: "cloud", color: colors.blue };
    } else if (hours >= 17 && hours < 21) {
      return { message: "Good Evening", icon: "sunset", color: colors.orange };
    } else {
      return { message: "Good Night", icon: "moon", color: colors.orange };
    }
  };

  const { message, icon, color } = getGreetingMessage();