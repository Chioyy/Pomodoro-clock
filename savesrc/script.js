"use strict";

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break: 5,
            session: 25,
            time: "25:00",
            minutes: 25,
            seconds: 0,
            pause: true,
            mode: true
        };
        this.breakInc = this.breakInc.bind(this);
        this.breakDec = this.breakDec.bind(this);
        this.sessionInc = this.sessionInc.bind(this);
        this.sessionDec = this.sessionDec.bind(this);
        this.clockRun = this.clockRun.bind(this);
        this.resetClock = this.resetClock.bind(this);
        this.clockTimer = this.clockTimer.bind(this);
    }
    breakInc() {
        if (this.state.break <= 59) {
            this.setState({
                break: this.state.break * 1 + 1
            });
        }
    }
    breakDec() {
        if (this.state.break >= 2) {
            this.setState({
                break: this.state.break - 1
            });
        }
    }
    sessionInc() {
        if (this.state.session <= 59 && this.state.pause == true) {
            this.setState({
                session: this.state.session * 1 + 1,
                minutes: this.state.session + 1,
                seconds: 0,
                time: this.state.session * 1 + 1 + ":00" 
            });
        }
    }
    sessionDec() {
        if (this.state.session >= 2 && this.state.pause == true) {
            this.setState({
                session: this.state.session - 1,
                minutes: this.state.session - 1,
                seconds: 0,
                time: this.state.session - 1 + ":00"
            });
        }
    }
    clockRun() {
        this.state.pause = !this.state.pause;
    }
    clockTimer() {
        if (this.state.pause == false) {
            if (this.state.seconds == 0 && this.state.minutes == 0) {
                this.setState({
                    seconds: this.state.seconds - 1
                });
            }
            if (this.state.seconds >= 1 || this.state.minutes >= 1) {
                this.setState({
                    seconds: this.state.seconds - 1
                });
            }
            if (this.state.seconds <= -1 && this.state.minutes >= 1) {
                this.setState({
                    seconds: 59,
                    minutes: this.state.minutes - 1 
                });
            }
            if (this.state.seconds <= -1 && this.state.minutes <= 0 && this.state.mode == true) {
                this.setState({
                    seconds: 59,
                    minutes: this.state.break - 1,
                    mode: !this.state.mode
                });
                document.getElementById("timer-label").textContent = "Break";
                document.getElementById("beep").play();
            }
            if (this.state.seconds <= -1 && this.state.minutes <= 0 && this.state.mode == false) {
                this.setState({
                    seconds: 59,
                    minutes: this.state.session - 1,
                    mode: !this.state.mode
                });
                document.getElementById("timer-label").textContent = "Session";
                document.getElementById("beep").play();
            }
            if (this.state.seconds <= 9 && this.state.minutes >= 10) {
                this.setState({
                    time: this.state.minutes + ":0" + this.state.seconds
                });
            }
            else if (this.state.minutes <= 9 && this.state.seconds >= 10) {
                this.setState({
                    time: "0" + this.state.minutes + ":" + this.state.seconds
                });
            }
            else if (this.state.minutes <= 9 && this.state.seconds <= 9) {
                this.setState({
                    time: "0" + this.state.minutes + ":0" + this.state.seconds
                });
            } 
            else {
                this.setState({
                    time: this.state.minutes + ":" + this.state.seconds
                });
            }
        }
    }
    componentDidMount() {
        this.setState({
            break: "5",
            session:"25",
            time: "25:00",
            seconds: 0,
            minutes: 25
        });
        this.interval = setInterval(this.clockTimer, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    resetClock() {
        this.setState({
            break: 5,
            session: 25,
            time: "25:00",
            seconds: 0,
            minutes: 25,
            pause: true,
            mode: true
        });  
        document.getElementById("beep").pause();
        document.getElementById("beep").load();
    }
    render() {
        document.body.style = "background: antiquewhite";
        return (
            <div className="clock">
                <h1>Pomodoro Clock</h1>
                <div>
                    <span id="session-label" className="session">Session Length</span>
                    <span id="break-label" className="session">Break Length</span>
                </div>
                <div className="settings">
                    <span id="session-increment" className="increment" onClick={this.sessionInc}>+</span>
                    <span id="session-length" className="numbers">{this.state.session}</span>
                    <span id="session-decrement" className="decrement" onClick={this.sessionDec}>-</span>
                    <span id="break-increment" className="increment" onClick={this.breakInc}>+</span>
                    <span id="break-length" className="numbers">{this.state.break}</span>
                    <span id="break-decrement" className="decrement" onClick={this.breakDec}>-</span>
                </div>
                <div id="timer-label" className="label">Session</div>
                <div id="time-left" className="time">{this.state.time}</div>
                <div id="start_stop" className="icon" onClick={this.clockRun}><img src="pause.png"/></div>
                <div id="reset" className="label" onClick={this.resetClock}>Reset</div>
                <audio id="beep" src="horn.ogg" />
            </div>
        );
    }
}
const domContainer = document.querySelector("#container");
ReactDOM.render(React.createElement(Pomodoro), domContainer);