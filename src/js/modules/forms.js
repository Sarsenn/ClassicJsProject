import phoneInputs from "./phoneInputs";

const forms = (state) => {
  const form = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");

  phoneInputs("input[name='user_phone']");

  const message = {
    loading: "Загрузка..",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    document.querySelector(".gif-load").src = "./assets/loading.gif";
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      let gifLoading = document.createElement("img");
      gifLoading.classList.add("gif-load");
      statusMessage.classList.add("status");
      // console.log(gifLoading);
      item.appendChild(statusMessage);
      item.appendChild(gifLoading);

      const formData = new FormData(item);
      if (item.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            gifLoading.remove();
          }, 200);
        });
    });
  });
};
export default forms;
