// Copy Contract Address Function
function copyContractAddress() {
  const contractAddress = "7Tx8qTXSakpfaSFjdztPGQ9n2uyT1eUkYz7gYxxopump";
  navigator.clipboard
    .writeText(contractAddress)
    .then(() => {
      alert("Contract address copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("Failed to copy the contract address.");
    });
}

// Fetch ASSDAQ Price
async function fetchAssdaqPrice() {
  const priceDisplay = document.getElementById("price-display");
  try {
    const response = await fetch(
      "https://solana-gateway.moralis.io/token/mainnet/7Tx8qTXSakpfaSFjdztPGQ9n2uyT1eUkYz7gYxxopump/price",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNmOTMyMmZkLTI5NDktNDRkMi1hNDM4LTA3YmRhOGM4YTE2YSIsIm9yZ0lkIjoiNDU3NTU0IiwidXNlcklkIjoiNDcwNzU0IiwidHlwZUlkIjoiNmE3NmRmYjEtNGQ1Yi00NGNkLWIyMWItYWVjMTk0Y2MyNDA2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTE2NjI0OTMsImV4cCI6NDkwNzQyMjQ5M30.XwkXkmtaWA-PVk-Fo8Mu7TtRyd6JUGQCIZOaZmGDYSo",
        },
      }
    );
    const data = await response.json();
    if (data.usdPrice) {
      priceDisplay.textContent = `ASSDAQ Price: $${parseFloat(
        data.usdPrice
      ).toFixed(6)} USD`;
      priceDisplay.classList.remove("loading");
    } else {
      priceDisplay.textContent = "Price unavailable";
    }
  } catch (error) {
    console.error("Failed to fetch price:", error);
    priceDisplay.textContent = "Error fetching price";
  }
}

// Fetch Community Posts
async function fetchCommunityPosts() {
  const linksContainer = document.getElementById("community-links");
  try {
    const response = await fetch("community-posts.txt");
    if (!response.ok) {
      throw new Error("Failed to fetch community posts");
    }
    const text = await response.text();
    const links = text.split("\n").filter(link => link.trim() !== ""); // Split by line, remove empty lines
    if (links.length === 0) {
      linksContainer.innerHTML = "<p>No community posts available.</p>";
      return;
    }
    // Clear the loading message
    linksContainer.innerHTML = "";
    // Create links
    links.forEach(link => {
      const a = document.createElement("a");
      a.href = link;
      a.textContent = link;
      a.target = "_blank"; // Open in new tab
      a.rel = "noopener noreferrer"; // Security best practice
      linksContainer.appendChild(a);
    });
  } catch (error) {
    console.error("Failed to fetch community posts:", error);
    linksContainer.innerHTML = "<p>Error loading community posts.</p>";
  }
}

// Set main-content margin-top to header height
function setMainContentMargin() {
  const header = document.querySelector("header");
  const mainContent = document.querySelector(".main-content");
  if (header && mainContent) {
    const headerHeight = header.offsetHeight;
    mainContent.style.marginTop = `${headerHeight + 10}px`; // Add 10px buffer
  }
}

// Run on load and resize
window.addEventListener("load", setMainContentMargin);
window.addEventListener("resize", setMainContentMargin);

// Fetch price and community posts on page load
fetchAssdaqPrice();
fetchCommunityPosts();