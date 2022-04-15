export const today = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const getGreeting = (user: string) => {
  let greet = "Good ";
  const hr = new Date().getHours();
  if (hr < 12) {
    greet += "Morning,";
  } else if (hr < 18) {
    greet += "Afternoon,";
  } else {
    greet += "Evening,";
  }
  return greet + " " + user;
};
