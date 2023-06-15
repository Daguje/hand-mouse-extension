import { browser } from "webextension-polyfill-ts";

export class Loading {
    static async show(){
        const loadingUrl = await fetch(browser.runtime.getURL('/loading.html'))
        const loadingHtml = await loadingUrl.text()
        document.body.insertAdjacentHTML('beforebegin', loadingHtml);
    }

    static hide() {
        const loadingElement = document.querySelector('.hm-loading')
        loadingElement.remove()
    }
}