const search = new URLSearchParams('size=M&color=1&color=2&manufacturer=aaa&manufacturer=eee');

for (const [key, value] of search) {
    const e = document.querySelector('form').elements[key];
    if (!e) continue;
    switch (e.constructor) {
        case RadioNodeList:
            for (const node of e) {
                if (node.value === value)
                    node.checked = true;
            }
            break;
        case HTMLSelectElement:
            for (const option of e) {
                if (option.value === value)
                    option.selected = true;
            }
            break;
        case HTMLInputElement:
            e.value = value;

            if (e.type === 'checkbox')
                e.checked = true;
            break;
    }
}

addEventListener('input', ({target}) => {
    if (!target.matches('form [name]')) return;
    const url = `${new URLSearchParams(new FormData(target.form))}`;
    console.log(url);
});

// Допустим, что по url
// http://любой_домен/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd
// находится страница, на которой есть такие поля:
// -радио для size (значения - S, M, L)
// -несколько чекбоксов для color (значения - 1, 2, 3, 4, 5)
// -мультиселект (select multiple) для manufacturer (значения - "aaa", "b&c", "ddd",
//     "eee")
// -чекбокс "распродажа" (значение - 1)

// Допустим также, что сервер при генерации html ни одно из полей не заполняет, то есть
// радио не выбран, чекбоксы пустые и т.д.
// Задачa: набросать самую элементарную разметку для указанных инпутов и написать
// скрипт, который
// -при загрузке страницы разберёт значения фильтров из url и расставит их по
// соответствующим полям
// -при изменении состояния в любом инпуте, кроме "распродажа", выведет в
// консоль аналогичный приведённому в условии url с актуальными значениями
// фильтров
