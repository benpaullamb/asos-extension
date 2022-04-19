export const sendToTab = async (message) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return chrome.tabs.sendMessage(tabs[0].id, message);
};
