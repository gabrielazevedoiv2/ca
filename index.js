var canvasWidth = 500;
var canvasHeight = 500;

var started = true;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

class CA {
    constructor() {
        this.cells = [];
        this.ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
        this.generations = 0;
        this.cellsize = 10;
        this.randomRuleset = true; // if true randomize ruleset after finishing
    }

    applyOptions(cW, cH, cS) {
        this.cellsize = cS;
        resizeCanvas(cW, cH)
    }

    CA() {
        for (var i = 0; i < (canvasWidth / this.cellsize); i++) {
            this.cells[i] = 0;
        }
        this.cells[parseInt(this.cells.length/2)] = 1;
    }

    Generate() {
        var nextGen = [];
        nextGen[0] = 0
        nextGen[this.cells.length-1] = 0
        for (var i = 1; i < this.cells.length-1; i++) {
            const left = this.cells[i-1]
            const mid = this.cells[i]
            const right = this.cells[i+1]
            nextGen[i] = this.rules(left, mid, right);
        }
        this.cells = [...nextGen];
        this.generations = this.generations + 1
    }

    rules(left, mid, right) {
        var s = "" + left + mid + right;
        var index = parseInt(s, 2);
        return this.ruleset[index];
    }

    draw() {
        for (var i = 0; i <= this.cells.length; i++) {
            if (this.cells[i] == 0) fill(255);
            else fill(0);
            stroke(0);
            square(i * this.cellsize, this.generations * this.cellsize, this.cellsize);
        }
        if (this.generations == (height / this.cellsize) && this.randomRuleset) {
            this.ruleset = []
            for (var i = 0; i < 8; i++) {
                this.ruleset[i] = Math.floor(Math.random() * 2);
            }
            this.generations = 0;
        }
    }
}

var ca = new CA();
ca.CA();

function applyOptions() {
    canvasWidth = document.getElementById("canvasWidth").value;
    canvasHeight = document.getElementById("canvasHeight").value;
    cellSize = document.getElementById("cellSize").value;
    ca.applyOptions(canvasWidth, canvasHeight, cellSize);
    ca.CA();
}

function draw() {
    if (started) {
        ca.Generate();
        ca.draw();
    }
}
