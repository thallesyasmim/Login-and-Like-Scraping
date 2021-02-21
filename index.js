require('dotenv').config()

const puppeteer = require('puppeteer')

;(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto('https://instagram.com')
      
        await page.waitForTimeout(5000)
        
        await page.type('[name="username"]', process.env.EMAIL, { delay: getRandomInt(200, 400) })

        await page.waitForTimeout(2000)

        await page.type('[type="password"]', process.env.PASSWORD, { delay: getRandomInt(200, 400) })
      
        await page.click('button[type="submit"]', { button: 'left', delay: 500 })

        await page.waitForTimeout(10000)

        await page.click('.aOOlW.HoLwm')

        await page.waitForTimeout(2100)

        await autoScroll(page)

        await page.waitForTimeout(2500)

        const button_like = await page.waitForXPath('//*[@id="react-root"]/section/main/section/div/div[2]/div/article[1]/div[3]/section[1]/span[1]/button[1]', { visible: true, timeout: 5000 })
        await button_like.click()

        
        await page.waitForTimeout(3000)
        await browser.close()
    } catch (error) {
        throw new Error(error)
    }
 
})()


async function autoScroll(page){
    return await page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= 700){
                    clearInterval(timer);
                    resolve();
                }
            }, 120);
        });
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}