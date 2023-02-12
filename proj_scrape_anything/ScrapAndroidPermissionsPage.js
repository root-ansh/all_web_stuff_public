import puppeteer from 'puppeteer';
import * as fs from "fs";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://developer.android.com/reference/android/Manifest.permission');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});


    await page.waitForSelector('.devsite-article-body');


    const permissionsJson = await page.$$eval(
        '.api-name',
        h3Tags => {
            let allPermissions = h3Tags.map(
                h3 => {
                    let permission = {}

                    try {
                        permission.title = h3.textContent
                    } catch (e) {
                        permission.title = ""
                    }

                    try {
                        permission.addedIn = h3.parentElement.querySelector('.api-level > a').textContent.replace('API level ', '').replace('Added in Android ', '')
                    } catch (e) {
                        permission.addedIn = "not available"
                    }

                    try {
                        let x = h3.parentElement
                        let rawData = Array.prototype.map.call(x.querySelectorAll('p'), it => it.textContent.replaceAll("\n", "").replaceAll("  ", ""))

                        rawData = rawData.filter(it => it.length > 1)

                        try {
                            permission.constantName = rawData.find(it => it.startsWith("Constant")).replace("Constant Value:", "").replaceAll("\"", "")
                        } catch (e) {
                            permission.constantName = ""
                        }

                        try {
                            permission.level = rawData.find(it => it.startsWith("Protection")).replace("Protection level: ", "").split('|')
                        } catch (e) {
                            permission.level = []
                        }

                        try {
                            let constantString = rawData.find(it => it.startsWith("Constant"))
                            let levelString = rawData.find(it => it.startsWith("Protection"))
                            permission.info = rawData.filter(it => it !== constantString).filter(it => it !== levelString)
                        } catch (e) {
                            permission.info = rawData
                        }

                    } catch (e) {
                    }


                    return permission
                }
            )
            return allPermissions
        }
    )

    console.log("permissionsJson=", permissionsJson)
    fs.mkdirSync("outputs",{recursive:true})
    fs.writeFile("outputs/permissions.json", JSON.stringify(permissionsJson), "utf8", (error) => console.log(error))
    console.log("saved to file!")
    await browser.close();
})();
