// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// async function scrapeAndDownloadImages() {
//     const browser = await puppeteer.launch({ headless: false }); // Set headless: false to see the browser UI
//     const page = await browser.newPage();
//     const url = 'https://www.sixt.com.eg/betafunnel/#/offerlist?zen_pu_location=c32c92f3-6926-4d5f-bcc1-1c24cc02fb58&zen_do_location=c32c92f3-6926-4d5f-bcc1-1c24cc02fb58&zen_pu_title=Munich%20Airport&zen_do_title=Munich%20Airport&zen_pu_time=2024-05-06T12%3A30&zen_do_time=2024-05-10T08%3A30&zen_pu_branch_id=BRANCH%3A11&zen_do_branch_id=BRANCH%3A11&zen_offer_matrix_id=fb76fd4f-5ce5-4b29-a5d2-ce5b3b4fe9ed&zen_vehicle_type=car&zen_pickup_country_code=DE&zen_resident_country_required=false&zen_basic_enabled=true&zen_filters=%7B%22group_type%22%3A%5B%5D%2C%22transmission_type%22%3A%5B%5D%2C%22passengers_count%22%3A%5B%5D%2C%22large_bags_count%22%3A%5B%5D%2C%22minimum_driver_age%22%3A%5B%5D%7D'; // The URL of the Sixt Egypt website

//     await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the network to be idle

//     // Extract all image URLs
//     const images = await page.evaluate(() => {
//         const imageElements = Array.from(document.querySelectorAll('img'));
//         return imageElements.map(img => img.src);
//     });

//     // Directory where images will be saved
//     const downloadDirectory = './images';
//     if (!fs.existsSync(downloadDirectory)) {
//         fs.mkdirSync(downloadDirectory);
//     }

//     // Download each image
//     for (const imageUrl of images) {
//         const imageName = path.basename(imageUrl);
//         const imagePath = path.join(downloadDirectory, imageName);

//         await page.goto(imageUrl, { waitUntil: 'networkidle2' });
//         await page.screenshot({ path: imagePath });
//         console.log(`Downloaded ${imageName}`);
//     }

//     await browser.close();
// }

// scrapeAndDownloadImages().catch(console.error);





// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// async function scrapeFooterWithStyles() {
//     const browser = await puppeteer.launch({ headless: false }); // Set headless: false to see the browser UI
//     const page = await browser.newPage();
//     const url = 'https://www.sixt.com.eg/?gad_source=1#/?prpd=Y&pccstatsugg=Egypt&sxamc=Google|Search&fir=1&gclid=CjwKCAjw3NyxBhBmEiwAyofDYcR-hZrGJrHrcZQe3DvwjY8YHQfI997QPIdmZyLJQpJPWm0ty-cnjhoCZsEQAvD_BwE&exactag_uk=818eb587c9f94e6985e17e0e39adc6c6';

//     await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the network to be idle

//     // Extract footer HTML
//     const footerHTML = await page.evaluate(() => {
//         const footerElement = document.querySelector('footer');
//         return footerElement ? footerElement.outerHTML : null;
//     });

//     // Extract computed styles of the footer
//     const footerStyles = await page.evaluate(() => {
//         const footerElement = document.querySelector('footer');
//         const computedStyles = window.getComputedStyle(footerElement);
//         return Array.from(computedStyles).reduce((acc, style) => {
//             acc[style] = computedStyles.getPropertyValue(style);
//             return acc;
//         }, {});
//     });

//     await browser.close();

//     return { html: footerHTML, styles: footerStyles };
// }

// scrapeFooterWithStyles()
//     .then(({ html, styles }) => {
//         if (html) {
//             // Write footer HTML and styles to a file
//             fs.writeFileSync('footer.html', html);
//             fs.writeFileSync('footer_styles.json', JSON.stringify(styles, null, 2));
//             console.log('Footer HTML and styles have been saved.');
//         } else {
//             console.log('Footer element not found on the page.');
//         }
//     })
//     .catch(console.error);


const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeAndDownloadSVGs() {
    const browser = await puppeteer.launch({ headless: false }); // Set headless: false to see the browser UI
    const page = await browser.newPage();
    const url = 'https://www.sixt.com.eg/betafunnel/#/offerlist?zen_pu_location=b7710325-1b86-4b0b-8721-6c9086b0868b&zen_do_location=b7710325-1b86-4b0b-8721-6c9086b0868b&zen_pu_title=Miami%20Int%20Airport&zen_do_title=Miami%20Int%20Airport&zen_pu_time=2024-06-05T12%3A30&zen_do_time=2024-06-09T08%3A30&zen_pu_branch_id=BRANCH%3A4&zen_do_branch_id=BRANCH%3A4&zen_offer_matrix_id=bdaa0bd0-6cd1-4f3b-b699-4467256cde18&zen_vehicle_type=car&zen_pickup_country_code=US&zen_resident_country_required=false&zen_basic_enabled=false&zen_filters=%7B%22group_type%22%3A%5B%5D%2C%22transmission_type%22%3A%5B%5D%2C%22passengers_count%22%3A%5B%5D%2C%22large_bags_count%22%3A%5B%5D%2C%22minimum_driver_age%22%3A%5B%5D%7D'; // The URL of the website you want to scrape

    await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the network to be idle

    // Extract all SVG elements
    const svgs = await page.evaluate(() => {
        const svgElements = Array.from(document.querySelectorAll('svg'));
        return svgElements.map(svg => svg.outerHTML);
    });

    // Directory where SVGs will be saved
    const downloadDirectory = './svgs';
    if (!fs.existsSync(downloadDirectory)) {
        fs.mkdirSync(downloadDirectory);
    }

    // Download each SVG
    for (const svg of svgs) {
        const svgName = 'svg_' + Date.now(); // Generate a unique name for each SVG
        const svgPath = path.join(downloadDirectory, `${svgName}.svg`);

        // Save the SVG as a file
        fs.writeFileSync(svgPath, svg);

        console.log(`Downloaded ${svgName}`);
    }

    await browser.close();
}

scrapeAndDownloadSVGs().catch(console.error);
