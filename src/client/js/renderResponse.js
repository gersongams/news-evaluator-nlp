import { shortner } from "./shortner";

const renderResponse = (data) => {
  const results = document.getElementById("results");
  const fragment = document.createDocumentFragment();
  Array.from(results.children).forEach((children) => {
    children.innerHTML = `<div style="margin-bottom: 1rem;"><h4 style="font-size: 16px; font-weight: 700; display: inline-block;">${
      children.id
    }</h4>: <span>${
      children.id !== "text" ? data[children.id] : shortner(data[children.id])
    }</span></div>`;
  });
  results.appendChild(fragment);
};

export { renderResponse };
