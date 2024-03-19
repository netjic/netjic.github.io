new Vue({
    el: "#app",
    data: {
        isStart: 1,
        score: 10,
        list: [
            { img: 'img/j1.png', title: '谢谢参与' },
            { img: 'img/j2.png', title: '美女一个' },
            { img: 'img/j1.png', title: '宝马一辆' },
            { img: 'img/j2.png', title: '单车一辆' },
            { img: 'img/j1.png', title: '鸡蛋一蓝' },
            { img: 'img/j2.png', title: '500红包' },
            { img: 'img/j1.png', title: '靓号一个' },
            { img: 'img/j2.png', title: '鲜花一蓝' }],
        index: -1,
        count: 8,
        timer: 0,
        speed: 200,
        times: 0,
        cycle: 50,
        prize: -1,
        click: true,
        showToast: false,
    },
    mounted() { },
    methods: {
        startLottery() {
            if (!this.click) { return }
            this.click = false
            this.startRoll();
        },
        startRoll() {
            this.times += 1
            this.oneRoll()
            if (this.times > this.cycle + 10 && this.prize === this.index) {
                clearTimeout(this.timer)
                this.prize = -1
                this.times = 0
                this.speed = 200
                this.click = true; var that = this; setTimeout(res => { that.showToast = true; }, 500)
            } else {
                if (this.times < this.cycle) { this.speed -= 10 } else if (this.times === this.cycle) { const index = parseInt(Math.random() * 10, 0) || 0; this.prize = index; if (this.prize > 7) { this.prize = 7 } } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) { this.speed += 110 } else { this.speed += 20 }
                if (this.speed < 40) { this.speed = 40 }
                this.timer = setTimeout(this.startRoll, this.speed)
            }
        },
        oneRoll() {
            let index = this.index
            const count = this.count
            index += 1
            if (index > count - 1) { index = 0 }
            this.index = index
        },
    }
})