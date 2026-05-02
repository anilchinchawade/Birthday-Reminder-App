const cron = require('node-cron');
const fs = require('fs');

cron.schedule('30 3 * * *', () => {
    console.log("Checking birthdays...");
    checkBirthdays();
});

function checkBirthdays() {
    let data = [];

    try {
        const fileContent = fs.readFileSync('birthdays.json', 'utf-8').trim();
        if (fileContent) {
            data = JSON.parse(fileContent);
        }
    } catch (err) {
        console.log("Error:", err.message);
    }

    const today = new Date();
    const todayStr = String(today.getMonth() + 1).padStart(2, '0') + "-" +
        String(today.getDate()).padStart(2, '0');

    const todaysBirthdays = data.filter(p => p.date === todayStr);

    if (todaysBirthdays.length > 0) {
        let message = "🎉 Birthday Alert 🎉\n\n";

        todaysBirthdays.forEach(p => {
            message += `🎂 ${p.name}\n`;
        });

        message += "\nWish them! 🥳";

        const link = "https://web.whatsapp.com/send?text=" + encodeURIComponent(message);

        console.log("Send this message:");
        console.log(link);
    } else {
        console.log("No birthdays today.");
    }
}