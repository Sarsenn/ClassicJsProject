const modals = (state) => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true, // параметр для упарвление подложками с калякулятором
    modalContent = false, // для модулей с калулятором для добваление подсказки
    stateObj = false, // для проверки объекта на наличие данных
    numberOfOption = null // указание на количиество данных
  ) {
    const trigger = document.querySelectorAll(triggerSelector), // определение триггеров
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    trigger.forEach((item) => {
      // навещиваем триггеры
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (stateObj && Object.keys(stateObj).length < numberOfOption) {
          // если есть параметры stateObj проводим эту инструкцию
          if (modalContent) {
            let modalInner = document.querySelector(modalContent);
            console.log(modalInner);

            let message = document.querySelector(".inner-msg"); // что будет при превом испольнение этой инструкций?
            if (message) message.remove();

            message = document.createElement("div");
            message.classList.add("inner-msg");
            message.style.marginTop = "10px";
            message.style.color = "red";
            message.innerText = "Не выбраны все опций";
            modalInner.appendChild(message);

            setTimeout(() => {
              message.remove();
            }, 2000);
          }

          return;
        }
        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        //   document.body.classList.add("modal-open");
      });
    });

    close.addEventListener("click", () => {
      modal.style.display = "none";
      windows.forEach((item) => {
        item.style.display = "none";
      });
      document.body.style.overflow = "";
      //   document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        modal.style.display = "none";
        windows.forEach((item) => {
          item.style.display = "none";
        });
        document.body.style.overflow = "";
        // document.body.classList.remove("modal-open");
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );

  bindModal(".phone_link", ".popup", ".popup .popup_close");
  bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false,
    ".popup_calc_content",
    state,
    4
  );
  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false,
    ".popup_calc_profile_content",
    state,
    5
  );
  // showModalByTime(".popup", 3000);
};

export default modals;
