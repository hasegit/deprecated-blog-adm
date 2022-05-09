const fetchPrismLanguages = (): Promise<string[]> => {
    // 一覧のスクリプトを取得し、設定を抽出
    // 1行目の=以降が設定となるので、末尾セミコロンを除去した上でJSON化する
    const url = "https://raw.githubusercontent.com/PrismJS/prism/master/components.js";
    const languages = fetch(url)
        .then(response => response.text())
        .then(script => JSON.parse(script.split("\n")[0].split("= ")[1].replace(/;$/, "")))
        .then(components => components.languages)
    console.log(languages)
    return languages
}

export const GetPrismLanguages = (): any => {

    // ローカルで利用中のlanguageを取得し、キー一覧を生成
    const prism = require("/js/prism.js")
    const keys: string[] = Object.keys(prism.languages)

    // 一覧のスクリプトを取得し、設定を抽出
    // 1行目の=以降が設定となるので、末尾セミコロンを除去した上でJSON化する
    const url = "https://raw.githubusercontent.com/PrismJS/prism/master/components.js";
    return fetch(url)
        .then(response => response.text())
        .then(script => JSON.parse(script.split("\n")[0].split("= ")[1].replace(/;$/, "")))
        .then(components => components.languages)
        .then(allLanguages => {
            const usedLanguages = keys.filter(key => key in allLanguages)
            return usedLanguages.map(key => {
                return { [key]: allLanguages[key].title }
            })
        })
}
