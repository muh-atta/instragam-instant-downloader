function addButtons() {
  document.querySelectorAll("._aagw").forEach((el) => {
    if (el.getAttribute("ig-download-botton") === "true") return;

    el.setAttribute("ig-download-botton", "true");

    const downloadButton = document.createElement("button");
    downloadButton.setAttribute("type", "button");
    downloadButton.setAttribute(
      "style",
      "position: absolute; right: 0; margin: 2px; width: 20%; height: 7%"
    );
    downloadButton.setAttribute("id", "instagram-download-botton");
    downloadButton.innerHTML = "Download NEW";
    el.prepend(downloadButton);
  });
  document.body.addEventListener("click", handleClick);
}
function handleClick(e) {
  const target = e.target;
  const btn = target?.closest("#instagram-download-botton");
  if (!btn) return;

  console.log(target);
  const parentDiv = target?.closest("._aagw");

  const imageUrl = parentDiv
    ?.closest("._aagu")
    ?.querySelector("img")
    ?.getAttribute("src");
  console.log(imageUrl);

  const link = document.createElement("a");
  link.href = imageUrl;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function forceDownload(url, fileName) {
  // Fetch the file from the given URL
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a new Blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = fileName;

      // Append the anchor to the body (required for Firefox)
      document.body.appendChild(downloadLink);

      // Programmatically click the anchor to trigger the download
      downloadLink.click();

      // Remove the anchor from the document
      document.body.removeChild(downloadLink);

      // Revoke the Blob URL to free up memory
      URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => console.error("Error downloading the file:", error));
}

const observer = new MutationObserver(addButtons);
observer.observe(document.body, { childList: true, subtree: true });
addButtons();
