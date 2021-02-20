window.addEventListener('load', function () {
    const input = document.getElementById('name_input')
    const input_start_value = input.value

    function changeColor (e) {
        input_start_value !== e.currentTarget.value
            ? input.classList.add('red')
            : input.classList.remove('red')
    }

    input.addEventListener('input', changeColor)
})

//Задача: без хардкода и без использования глобальных переменных написать скрипт,
// который при вводе данных в поле будет добавлять ему класс red, если его текущее
// значение поля не совпадает с изначальным, и удалять этот класс, если значения
// совпадают