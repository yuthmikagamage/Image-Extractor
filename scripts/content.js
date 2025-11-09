chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractImages") {
    const images = document.querySelectorAll("img");
    const imageUrls = [];

    images.forEach((img) => {
      if (img.src) {
        imageUrls.push(img.src);
      }
    });

    sendResponse({ imageUrls: imageUrls });
  }
  return true;
});
