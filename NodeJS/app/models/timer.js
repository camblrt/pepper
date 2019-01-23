"use strict";


class Timer {

    constructor (duration) {
        this.duration = duration;
        this.timestamp = null;
        this._timerRunning = false;
        this._timer = {};
    }

    start (callback) {
        if (!this.isRunning()) {
            this.timestamp = Date.now();
            this.expected = this.timestamp + this.duration;

            this._run(callback);
        } else {
            //throw new Error("attempted to start a timer while one already runs");
        }
    }

    reset (duration) {
        this._stops();
        this.duration = duration;
        this.timestamp = null;
    }

    /**
     * is triggered when a user connects out of nowhere to know where the F*ck they are
     * @returns {*}
     */
    whereAmI () {
        if (this.isRunning()) {
            return {timestamp: this.timestamp, duration: this.duration}
        }
        return {err: "Not running"}
    }

    /**
     * gives the timer's state
     * @returns {boolean} Running or not
     */
    isRunning () {
        return this._timerRunning;
    }

    /**
     *
     *
     * "_" functions are not supposed to be called from outside this class
     *
     *
     */

    _runs() {
        this._timerRunning = true;
    }

    _stops () {
        this._timerRunning = false;
        clearTimeout(this._timer);
    }

    _run (callback) {
        this._runs();
        this._timer = setTimeout(this._step, this.duration, this, callback); // func, time, param1, param2
    }

    _step(that, callback) {
        let drift = Date.now() - that.expected;
        if (drift > that.duration) {
            console.warn("The drift exceeded the timer duration.");
        }

        that._stops();
        callback();
    }
}

module.exports = Timer;
