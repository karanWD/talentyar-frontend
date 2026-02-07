export const setWelcomeSeen = () => {
  localStorage.setItem("welcome_seen", "true");
};

export const hasSeenWelcome = () => {
  return localStorage.getItem("welcome_seen") === "true";
};
