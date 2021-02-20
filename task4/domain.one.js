const iframe = document.querySelector('.iframe');
const localStorageInputText = document.querySelector('.localStorageInputText');
const lStorageReadDataButton = document.querySelector('.lStorageReadDataButton');
const lStorageUpdateDataButton = document.querySelector('.lStorageUpdateDataButton');
const lStorageRemoveDataButton = document.querySelector('.lStorageRemoveDataButton');

window.onmessage = (event) => {
    switch (event.data.status) {
        case 'readSuccessfully':
            console.log(event.data.message);
            console.log('event.data', event.data);
            return;
        case 'updatedSuccessfully':
            console.log(event.data.message);
            return;
        case 'deletedSuccessfully':
            console.log(event.data.message);
            return;
        default:
            return;
    }
};

const foo = () => {
    console.warn('status : action completed')
}

const sendRequest = (action, payload) => {
    const messageToIframe = {action, payload};
    iframe.contentWindow.postMessage(messageToIframe, '*');
    iframe.contentWindow.callBackParent = foo;
}

lStorageReadDataButton.addEventListener('click',
    () => sendRequest('readIframeLocalStorageData', ''));
lStorageUpdateDataButton.addEventListener('click',
    () => sendRequest('updateIframeLocalStorageData', localStorageInputText.value));
lStorageRemoveDataButton.addEventListener('click',
    () => sendRequest('removeIframeLocalStorageData', ''));

// Существует страница на домене domain.one, на которой загружается iframe с
// другого домена - domain.two. Нужно на странице domain.one использовать скрипт для
// записи/чтения/удаления данных из localStorage домена domain.two. При этом оба
// домена под нашим управлением, то есть, мы можем изменять файлы и там, и там, как
// нам удобно.
// Задача: написать реализацию методов для чтения/записи/удаления данных из
// доступного localStorage другого домена. Пусть при успешном чтении данные
// выводятся в консоль, а при успешной записи/удалении в консоль отправляется лог
// вроде “written” или “removed”.
// Для работы с кросс-доменным localStorage понадобилось не только
// чтение/запись/удаление данных из него, но и их дополнительная обработка.