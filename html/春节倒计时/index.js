document.addEventListener('DOMContentLoaded', function () {
    // 设置春节的日期，这里以2024年为例
    const springFestivalDate = new Date('2024-02-10T00:00:00');

    function updateCountdown() {
        const currentDate = new Date();
        const timeDifference = springFestivalDate - currentDate;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerHTML = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
        } else {
            document.getElementById('countdown').innerHTML = '春节已经开始！';
        }
    }

    // 初始更新
    updateCountdown();

    // 每秒更新一次
    setInterval(updateCountdown, 1000);
});
