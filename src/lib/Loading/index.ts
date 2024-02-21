import { browser } from "webextension-polyfill-ts";

export default class LoadingToast {
    static async show(){
        const loadingUrl = await fetch(browser.runtime.getURL('/loading.html'))
        const loadingHtml = await loadingUrl.text()
        document.body.insertAdjacentHTML('beforebegin', loadingHtml);
    }

    static hide() {
        const loadingElement = document.getElementById('hm-loading')
        loadingElement.remove()
    }
}