class Soda {
    constructor(type) {
        this._type = type;
        this._strong = 0;
        this._soft = 0;
        this._weak = 0;
    }

    set type(type) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    set strong(degree) {
        this._strong = degree;
    }

    get strong() {
        return this._strong;
    }

    set soft(degree) {
        this._soft = degree;
    }

    get soft() {
        return this._soft;
    }

    set weak(degree) {
        this._weak = degree;
    }

    get weak() {
        return this._weak;
    }
}

class Run {
    constructor() {
        this._strong = 0;
        this._soft = 0;
        this._weak = 0;
    }

    set strong(degree) {
        this._strong = degree;
    }

    get strong() {
        return this._strong;
    }

    set soft(degree) {
        this._soft = degree;
    }

    get soft() {
        return this._soft;
    }

    set weak(degree) {
        this._weak = degree;
    }

    get weak() {
        return this._weak;
    }
}

class Ice {
    constructor() {
        this._degree = 0;
    }

    set degree(degree) {
        this._degree = degree;
    }

    get degree() {
        return this._degree;
    }
}

var check;

function checkML(input) {
    qtd = input.val();
    if (qtd > 100 || qtd < 0) {
        input.val("");
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Os valores devem ser entre 0ml e 100ml!');
        check = false;
    } else {
        check = true;
    }
}

function calculateSoda() {
    if (check) {
        let soda_ml = $('#qtd_refri').val();
        let soda_type = $('#refri').val();
        let run_ml = $('#qtd_run').val();
        let ice_ml = $('#qtd_gelo').val();
        var soda = new Soda(soda_type);
        var run = new Run();
        var ice = new Ice();
        SodaStrong(soda, soda_ml);
        SodaSoft(soda, soda_ml);
        SodaWeak(soda, soda_ml);
        RunStrong(run, run_ml);
        RunSoft(run, run_ml);
        RunWeak(run, run_ml);
        IceDegree(ice, ice_ml);
        console.log(run);
        console.log(soda);
        console.log(ice);
        let strong_max_val = CalculateStrong(run, ice, soda);
        let soft_max_val = CalculateSoft(run, ice, soda);
        let weak_max_val = CalculateWeak(run, ice, soda);
        taste = CalculateTaste(strong_max_val, soft_max_val, weak_max_val);
        console.log("Paladar: " + taste);
        price = CalculatePrice(taste);
        alert("O Preço da bebida é " + price + " e o drink " + TranslateTaste(taste));
        console.log("O Preço da bebida é " + price);
    }
}

function TranslateTaste(taste) {
    if (taste == "Weak") {
        return "é Cuba Libre fraco";
    } else if (taste == "Soft") {
        return "é Cuba Libre suave";
    } else if (taste == "Strong") {
        return "é Cuba Libre forte";
    } else {
        return "não é Cuba Libre";
    }
}

function CalculatePrice(taste) {
    if (taste == "Weak") {
        return 15;
    } else if (taste == "Soft") {
        return 20;
    } else if (taste == "Strong") {
        return 25;
    } else {
        return 30;
    }
}

function CalculateTaste(strong_max_val, soft_max_val, weak_max_val) {
    if (strong_max_val + soft_max_val + weak_max_val > 0) {
        let keys = ["Strong", "Soft", "Weak"];
        let max_value = max([strong_max_val, soft_max_val, weak_max_val]);
        return keys[[strong_max_val, soft_max_val, weak_max_val].indexOf(max_value)];
    } else {
        return "not cuba"
    }
}

function CalculateStrong(run, ice, soda) {
    let strong_max_val = max([min([ice.degree, soda.strong, run.soft]), min([ice.degree, soda.strong, run.strong]), min([ice.degree, soda.soft, run.strong])]);
    console.log("Strong max value: " + strong_max_val)
    return strong_max_val
}

function CalculateSoft(run, ice, soda) {
    let soft_max_val = max([min([ice.degree, soda.strong, run.weak]), min([ice.degree, soda.soft, run.soft]), min([ice.degree, soda.weak, run.strong])]);
    console.log("Soft max value: " + soft_max_val)
    return soft_max_val
}

function CalculateWeak(run, ice, soda) {
    let weak_max_val = max([min([ice.degree, soda.weak, run.weak]), min([ice.degree, soda.weak, run.soft]), min([ice.degree, soda.soft, run.weak])]);
    console.log("Weak max value: " + weak_max_val)
    return weak_max_val
}

function min(arr) {
    let min_value = 9999;
    arr.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    return min_value;
}

function max(arr) {
    let max_value = -1;
    arr.forEach(element => {
        if (element > max_value) {
            max_value = element;
        }
    });
    return max_value;
}

function IceDegree(ice, ice_ml) {
    if (ice_ml == 20) {
        ice.degree = 1;
    }
}

function RunStrong(run, run_ml) {
    if (run_ml < 23) {
        run.strong = 0;
    } else if (run_ml >= 23 && run_ml < 28) {
        run.strong = 1 - (28 - run_ml) / (28 - 23);
    } else if (run_ml >= 28 && run_ml <= 30) {
        run.strong = 1;
    } else {
        run.strong = 0;
    }
}

function RunSoft(run, run_ml) {
    if (run_ml < 15) {
        run.soft = 0;
    } else if (run_ml >= 15 && run_ml < 20) {
        run.soft = 1 - (20 - run_ml) / (20 - 15);
    } else if (run_ml >= 20 && run_ml <= 25) {
        run.soft = 1;
    } else if (run_ml > 25 && run_ml <= 27) {
        run.soft = (27 - run_ml) / (27 - 25);
    } else {
        run.soft = 0;
    }
}

function RunWeak(run, run_ml) {
    if (run_ml < 10) {
        run.weak = 0;
    } else if (run_ml >= 10 && run_ml < 15) {
        run.weak = 1;
    } else if (run_ml >= 15 && run_ml <= 20) {
        run.weak = (20 - run_ml) / (20 - 15);
    } else {
        run.weak = 0;
    }
}

function SodaStrong(soda, soda_ml) {
    if (soda._type == "coke") {
        if (soda_ml < 50) {
            soda.strong = 0;
        } else if (soda_ml >= 50 && soda_ml < 52) {
            soda.strong = 1;
        } else if (soda_ml >= 52 && soda_ml <= 54) {
            soda.strong = (54 - soda_ml) / (54 - 52);
        } else {
            soda.strong = 0;
        }
    } else {
        if (soda_ml < 60) {
            soda.strong = 0;
        } else if (soda_ml >= 60 && soda_ml < 62) {
            soda.strong = 1;
        } else if (soda_ml >= 62 && soda_ml <= 64) {
            soda.strong = (64 - soda_ml) / (64 - 62);
        } else {
            soda.strong = 0;
        }
    }
}

function SodaSoft(soda, soda_ml) {
    if (soda._type == "coke") {
        if (soda_ml < 52) {
            soda.soft = 0;
        } else if (soda_ml >= 52 && soda_ml < 54) {
            soda.soft = 1 - (54 - soda_ml) / (54 - 52);
        } else if (soda_ml >= 54 && soda_ml <= 56) {
            soda.soft = 1;
        } else if (soda_ml > 56 && soda_ml <= 58) {
            soda.soft = (58 - soda_ml) / (58 - 56);
        } else {
            soda.soft = 0;
        }
    } else {
        if (soda_ml < 62) {
            soda.soft = 0;
        } else if (soda_ml >= 62 && soda_ml < 64) {
            soda.soft = 1 - (64 - soda_ml) / (64 - 62);
        } else if (soda_ml >= 64 && soda_ml <= 66) {
            soda.soft = 1;
        } else if (soda_ml > 66 && soda_ml <= 68) {
            soda.soft = (68 - soda_ml) / (68 - 66);
        } else {
            soda.soft = 0;
        }
    }
}

function SodaWeak(soda, soda_ml) {
    if (soda._type == "coke") {
        if (soda_ml < 56) {
            soda.weak = 0;
        } else if (soda_ml >= 56 && soda_ml < 58) {
            soda.weak = 1 - (58 - soda_ml) / (58 - 56);
        } else if (soda_ml >= 58 && soda_ml <= 60) {
            soda.weak = 1;
        } else {
            soda.weak = 0;
        }
    } else {
        if (soda_ml < 66) {
            soda.weak = 0;
        } else if (soda_ml >= 66 && soda_ml < 68) {
            soda.weak = 1 - (68 - soda_ml) / (68 - 66);
        } else if (soda_ml >= 68 && soda_ml <= 70) {
            soda.weak = 1;
        } else {
            soda.weak = 0;
        }
    }
}