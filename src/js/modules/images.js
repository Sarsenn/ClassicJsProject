const images = () => {
  const imgPopup = document.createElement("div"),
    workSection = document.querySelector(".works"),
    bigImg = document.createElement("img");

  imgPopup.classList.add("popup");
  workSection.appendChild(imgPopup);

  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignItems = "center";
  imgPopup.style.display = "none";
  imgPopup.appendChild(bigImg);

  workSection.addEventListener("click", (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains("preview")) {
      imgPopup.classList.add("animated", "fadeIn");
      imgPopup.style.display = "flex";
      document.body.style.overflow = "hidden";
      const path = target.parentNode.getAttribute("href");
      bigImg.setAttribute("src", path);
      bigImg.style.width = "35vw";
      bigImg.style.height = "45vw";
    }

    if (target && target.matches("div.popup")) {
      imgPopup.style.display = "none";
      document.body.style.overflow = "";
      imgPopup.classList.remove("animated", "fadeIn");
    }
  });
};
export default images;
