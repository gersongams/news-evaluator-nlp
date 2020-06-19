import { urlChecker } from "./urlChecker";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error("error", error);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let url = document.getElementById("url").value;

  if (urlChecker(url)) {
    const response = await postData("/analyze", { url });
    if (response.success) {
      const { data } = response;
      const results = document.getElementById("results");
      const fragment = document.createDocumentFragment();
      Array.from(results.children).forEach((children) => {
        children.innerHTML = `<div style="margin-bottom: 1rem;"><h4 style="font-size: 16px; font-weight: 700; display: inline-block;">${
          children.id
        }</h4>: <span>${
          children.id !== "text"
            ? data[children.id]
            : data[children.id].slice(0, 300) + "..."
        }</span></div>`;
      });
      results.appendChild(fragment);
    } else {
      alert("Server error, could not process the url");
    }
  } else {
    alert("The url provided is not correct");
  }
}

export { handleSubmit };
