require('dotenv').config()

const puppeteer = require('puppeteer')

;(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto('https://instagram.com')
      
        const email_input = await page.waitForXPath('//input[@name="username"]', { visible: true, timeout: 5000  })
        const password_input = await page.waitForXPath('//input[@type="password"]', { visible: true, timeout: 5000  })
        
        await page.type('[name="username"]', process.env.EMAIL, { delay: 200 })

        await page.waitForTimeout(2000)

        await page.type('[name="password"]', process.env.PASSWORD, { delay: 200 })
      
        await page.click('button[type="submit"]', { button: 'left', delay: 500 })

        await page.waitForTimeout(10000)

        await page.click('.aOOlW.HoLwm')

        await page.waitForTimeout(5000)

        await autoScroll(page, 100)

        //   await browser.close()
    } catch (error) {
        throw new Error(error)
    }
 
})()


async function autoScroll(page, distance){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}