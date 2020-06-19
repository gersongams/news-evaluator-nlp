import { urlChecker } from "./urlChecker";
import { postData } from "./postData";
import { renderResponse } from "./renderResponse";

const handleSubmit = async (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let url = document.getElementById("url").value;

  console.log("::: Form Submitted :::", url);
  if (urlChecker(url)) {
    const response = await postData("/analyze", { url });
    console.log("API RESPONSE", response);
    if (response.success) {
      renderResponse(response.data);
    } else {
      alert("Server error, could not process the url");
    }
  } else {
    alert("The url provided is not correct");
  }
};

export { handleSubmit };
