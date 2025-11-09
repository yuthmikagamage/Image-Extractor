document.getElementById("extractBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: "extractImages" }, (response) => {
    if (response && response.imageUrls) {
      displayImages(response.imageUrls);
    }
  });
});

function displayImages(urls) {
  const imageList = document.getElementById("imageList");

  if (urls.length === 0) {
    imageList.innerHTML = "<p>No images found on this page.</p>";
    return;
  }

  imageList.innerHTML = `<p><strong>Found ${urls.length} images:</strong></p>`;

  urls.forEach((url) => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";

    const img = document.createElement("img");
    img.src = url;
    img.className = "thumbnail";
    img.title = url;

    img.addEventListener("click", () => {
      chrome.tabs.create({ url: url });
    });

    imgContainer.appendChild(img);
    imageList.appendChild(imgContainer);
  });
}
