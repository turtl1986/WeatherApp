import {createElement} from "../../utils/common.js";

export default class ProgressBar{
    #progressCircle
    #valueProgressFunction
    #currentValue = 0
    #isLite=true
    #progressBarBlock;

    setIsLite(val=true){
        this.#isLite=val
        return this
    }

    getIsLite(){
        return this.#isLite
    }

    setValueProgressCallback(callback){
        this.#valueProgressFunction = callback;
        return this;
    }

    getValueProgressCallback(){
        return this.#valueProgressFunction;
    }

    setValue(value) {
        this.#currentValue = value;
        this.#updateProgressCircle();
        return this;
    }

    getValue() {
        return this.#currentValue;
    }

    #updateProgressCircle() {
        if (this.#progressCircle && this.getValueProgressCallback() && this.#progressBarBlock)
            this.getValueProgressCallback()(this.getValue(), this.#progressCircle,this.#progressBarBlock);
    }

    render(){
        this.#progressBarBlock = createElement('div','progress-bar_cover');
        const progressLine = createElement('div',this.getIsLite()?'progress-line':'progress-line__black');
        this.#progressCircle = createElement('div',this.getIsLite()?'progress-circle':'progress-circle__black');
        this.#updateProgressCircle();
        this.#progressBarBlock.append(progressLine, this.#progressCircle);
        return this.#progressBarBlock;
    }

}