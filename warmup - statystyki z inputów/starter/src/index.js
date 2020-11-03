class generate {
    constructor() {
        this.generate = function () {
            let newValue = parseInt(document.getElementById("newInputs").value);
            let newInputsPlace = document.getElementById("inputplace");
            let inputsString = "";
            for (let i = 0; i < newValue; i++) {
                inputsString += "<input/><br>";
            }
            newInputsPlace.innerHTML = inputsString;
        };
    }
}
class SumCountClass {
    constructor() {
        this.sum = 0;
        this.sumCount = function () {
            let sumInputs = document.getElementsByTagName("input").length;
            console.log(sumInputs);
            this.sum = this.sum + sumInputs - 1;
            console.log(this.sum);
            document.getElementById("sum").innerHTML = this.sum.toString();
        };
    }
}
class MinCountClass {
    constructor() {
        this.min = 0;
        this.minCount = function () {
            let inputSum = document.getElementsByTagName("input");
            if (this.min == 0 || this.min > inputSum.length - 1) {
                this.min = inputSum.length - 1;
            }
            document.getElementById("min").innerHTML = this.min.toString();
        };
    }
}
class MaxCountClass {
    constructor() {
        this.max = 0;
        this.maxCount = function () {
            let inputSum = document.getElementsByTagName("input");
            if (this.max == 0 || this.max < inputSum.length - 1) {
                this.max = inputSum.length - 1;
            }
            document.getElementById("max").innerHTML = this.max.toString();
        };
    }
}
class AvgCountClass {
    constructor() {
        this.newClickSum = 0;
        this.avg = 0;
        this.newInputsSum = 0;
        this.avgCount = function () {
            this.newClickSum += 1;
            this.newInputsSum += ((document.getElementsByTagName("input").length) - 1);
            this.avg = this.newInputsSum / this.newClickSum;
            document.getElementById("avg").innerHTML = this.avg.toString();
        };
    }
}
class DeleteAll {
    constructor() {
        this.deleteInputs = function () {
            document.getElementById("inputplace").innerHTML = "";
        };
    }
}
let sumCountClass = new SumCountClass();
let minCountClass = new MinCountClass();
let maxCountClass = new MaxCountClass();
let avgCountClass = new AvgCountClass();
document.getElementById("generate").addEventListener("click", function () {
    if (Number.isInteger(parseInt(document.getElementById("newInputs").value))) {
        new generate().generate();
        sumCountClass.sumCount();
        minCountClass.minCount();
        maxCountClass.maxCount();
        avgCountClass.avgCount();
    }
    else {
        document.getElementById("inputplace").innerHTML = "Czekam na prawidłową wartość!";
    }
});
document.getElementById("deleteAll").addEventListener("click", new DeleteAll().deleteInputs);
//# sourceMappingURL=index.js.map