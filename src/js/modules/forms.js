const forms = () => {
	console.log('helloo')
	const form = document.querySelectorAll('form'),
		  input = document.querySelectorAll('input'),
		  phoneInputs = document.querySelectorAll('input[name="user_phone"]');
	
	phoneInputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		})
	})

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро с вами свяжутся!',
		failuer: 'Что-то пошло не так!...'
	};	  

	const postData = async (url, data) => {
		document.querySelector('.status').innerHTML = message.loading;

		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	}

	const clearInputs = () => {
		input.forEach(item => {
			item.value = '';
		})
	}

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			console.log('helloo')
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => {
					statusMessage.textContent = message.failuer;
				})
				.finally(() => {
					clearInputs();
					setTimeout(()=> {
						statusMessage.remove();
					}, 5000);
				})
		});	
	});
};

export default forms;