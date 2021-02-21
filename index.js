require('dotenv').config()

const puppeteer = require('puppeteer')

;(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto('https://instagram.com')
      
        const email_input = await page.waitForXPath('//input[@name="username"]', { visible: true, timeout: 5000  })
        const password_input = await page.waitForXPath('//input[@type="password"]', { visible: true, timeout: 5000  })
        
        await page.type(email_input, process.env.EMAIL, { delay: 200 })

        await page.waitForTimeout(2000)

        await page.type(password_input, process.env.PASSWORD, { delay: 200 })
      
        await page.click('button[type="submit"]', { button: 'left', delay: 500 })

        await page.waitForTimeout(10000)

        await page.click('.aOOlW.HoLwm')

        await page.waitForTimeout(5000)

        await autoScroll(page)

        const button_like = await page.waitForXPath('//*[@id="react-root"]/section/main/section/div/div[2]/div/article[1]/div[3]/section[1]/span[1]/button[1]', { visible: true, timeout: 5000 })
        await button_like.click()

        

        //   await browser.close()
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