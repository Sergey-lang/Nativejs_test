const returnResponse = (status, message) => {
    let messageToParent = {
        status, message
    };
    window.top.postMessage(JSON.parse(JSON.stringify(messageToParent)), '*',);
}

window.onmessage = async (event) => {
    switch (event.data.action) {
        case  'readIframeLocalStorageData':

            let localStorageData = await localStorage.getItem('from domain.one');
            if (!localStorageData) {
                localStorageData = 'localStorage is empty'
            }
            returnResponse('readSuccessfully', localStorageData);
            window.callBackParent()
            return;

        case 'updateIframeLocalStorageData':
            await localStorage.setItem('from domain.one', event.data.payload);
            returnResponse('updatedSuccessfully', 'written');
            return;

        case  'removeIframeLocalStorageData':
            await localStorage.removeItem('from domain.one');
            returnResponse('deletedSuccessfully', 'removed');
            return;
        default:
            return;
    }
};