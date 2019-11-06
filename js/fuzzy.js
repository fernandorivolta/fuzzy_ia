var check;

function checkML(input) {
    qtd = input.val();
    if (qtd > 100 || qtd < 0) {
        input.val("");
        $('#feedback').fadeIn();
        setTimeout(() => {
            $('#feedback').fadeOut();
        }, 3000);
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
        let soda_object = returnSodaDegree(soda_ml, soda_type);
        let run_object = returnRunDegree(run_ml);
        let ice_object = returnIceDegree(ice_ml);
        console.log(run_object);
        console.log(ice_object);
        console.log(soda_object);
        console.log('---------------------------');
        let strong_value = calculateStrong(soda_object, run_object, ice_object);
        let weak_value = calculateWeak(soda_object, run_object, ice_object);
        let soft_value = calculateSoft(soda_object, run_object, ice_object);
    }
}

function calculateWeak(soda_object, run_object, ice_object) {
    let min_value = 9999;
    let max_value = -1;
    let first_arr_val = [soda_object.relevance_degree_weak, run_object.relevance_degree_weak, ice_object.relevance_degree_ice];
    first_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    first_min_value = min_value;
    let second_arr_val = [soda_object.relevance_degree_weak, run_object.relevance_degree_soft, ice_object.relevance_degree_ice];
    min_value = 9999;
    second_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    second_min_value = min_value;
    let third_arr_val = [soda_object.relevance_degree_soft, run_object.relevance_degree_weak, ice_object.relevance_degree_ice];
    min_value = 9999;
    third_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    third_min_value = min_value;
    arr_max = [first_min_value, second_min_value, third_min_value];
    arr_max.forEach(element => {
        if (element > max_value) {
            max_value = element;
        }
    });
    return max_value;
}

function calculateSoft(soda_object, run_object, ice_object) {
    let min_value = 9999;
    let max_value = -1;
    let first_arr_val = [soda_object.relevance_degree_strong, run_object.relevance_degree_weak, ice_object.relevance_degree_ice];
    first_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    first_min_value = min_value;
    let second_arr_val = [soda_object.relevance_degree_soft, run_object.relevance_degree_soft, ice_object.relevance_degree_ice];
    min_value = 9999;
    second_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    second_min_value = min_value;
    let third_arr_val = [soda_object.relevance_degree_weak, run_object.relevance_degree_strong, ice_object.relevance_degree_ice];
    min_value = 9999;
    third_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    third_min_value = min_value;
    arr_max = [first_min_value, second_min_value, third_min_value];
    arr_max.forEach(element => {
        if (element > max_value) {
            max_value = element;
        }
    });
    return max_value;
}

function calculateStrong(soda_object, run_object, ice_object) {
    let min_value = 9999;
    let max_value = -1;
    let first_arr_val = [soda_object.relevance_degree_strong, run_object.relevance_degree_soft, ice_object.relevance_degree_ice];
    first_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    first_min_value = min_value;
    let second_arr_val = [soda_object.relevance_degree_strong, run_object.relevance_degree_strong, ice_object.relevance_degree_ice];
    min_value = 9999;
    second_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    second_min_value = min_value;
    let third_arr_val = [soda_object.relevance_degree_soft, run_object.relevance_degree_strong, ice_object.relevance_degree_ice];
    min_value = 9999;
    third_arr_val.forEach(element => {
        if (element < min_value) {
            min_value = element;
        }
    });
    third_min_value = min_value;
    arr_max = [first_min_value, second_min_value, third_min_value];
    arr_max.forEach(element => {
        if (element > max_value) {
            max_value = element;
        }
    });
    return max_value;
}

function returnIceDegree(ice_ml) {
    if (ice_ml == 20) {
        return {
            type: 'ice',
            relevance_degree_ice: 1
        }
    } else {
        return {
            type: 'ice',
            relevance_degree_ice: 0
        }
    }
}

function returnRunDegree(run_ml) {
    let rel_deg;
    if (run_ml < 10) {
        return {
            type: 'run',
            relevance_degree_weak: 0,
            relevance_degree_strong: 0,
            relevance_degree_soft: 0
        }
    } else if (run_ml >= 10 && run_ml < 15) {
        return {
            type: 'run',
            relevance_degree_weak: 1,
            relevance_degree_strong: 0,
            relevance_degree_soft: 0
        }
    } else if (run_ml >= 15 && run_ml < 20) {
        rel_deg = (20 - run_ml) / (20 - 15);
        if (rel_deg > 0.5) {
            rel_deg_soft = rel_deg;
            rel_deg_weak = 1 - rel_deg;
        } else if (rel_deg == 0.5) {
            rel_deg_soft = 0.5;
            rel_deg_weak = 0.5;
        } else {
            rel_deg_weak = rel_deg;
            rel_deg_soft = 1 - rel_deg;
        }
        return {
            type: 'run',
            relevance_degree_weak: rel_deg_weak,
            relevance_degree_strong: 0,
            relevance_degree_soft: rel_deg_soft
        }
    } else if (run_ml >= 20 && run_ml < 23) {
        return {
            type: 'run',
            relevance_degree_weak: 0,
            relevance_degree_strong: 0,
            relevance_degree_soft: 1
        }
    } else if (run_ml >= 23 && run_ml < 27.1) {
        if (run_ml >= 23 && run_ml < 25) {
            rel_deg_soft = 1;
            rel_deg_strong = (28 - run_ml) / (28 - 23);
        } else if (run_ml >= 25 && run_ml < 27) {
            rel_deg_soft = (27 - run_ml) / (27 - 25);
            rel_deg_strong = (28 - run_ml) / (28 - 23);
        }
        return {
            type: 'run',
            relevance_degree_weak: 0,
            relevance_degree_strong: 1 - rel_deg_strong,
            relevance_degree_soft: rel_deg_soft
        }
    } else if (run_ml >= 27.1 && run_ml < 28) {
        rel_deg_strong = (28 - run_ml) / (28 - 23);
        return {
            type: 'run',
            relevance_degree_weak: 0,
            relevance_degree_strong: rel_deg_strong,
            relevance_degree_soft: 0
        }
    } else if (run_ml >= 28 && run_ml <= 30) {
        return {
            type: 'run',
            relevance_degree_weak: 0,
            relevance_degree_strong: 1,
            relevance_degree_soft: 0
        }
    }
}


function returnSodaDegree(soda_ml, soda_type) {
    let rel_deg;
    if (soda_type == "coke") {
        if (soda_ml < 50) {
            return {
                type: 'coke',
                relevance_degree_soft: 0,
                relevance_degree_strong: 0,
                relevance_degree_weak: 0
            }
        } else if (soda_ml >= 50 && soda_ml < 52) {
            return {
                type: 'coke',
                relevance_degree_strong: 1,
                relevance_degree_soft: 0,
                relevance_degree_weak: 0
            }
        } else if (soda_ml >= 52 && soda_ml < 54) {
            rel_deg = (54 - soda_ml) / (54 - 52);
            if (rel_deg > 0.5) {
                rel_deg_soft = rel_deg;
                rel_deg_strong = 1 - rel_deg;
            } else if (rel_deg == 0.5) {
                rel_deg_soft = 0.5;
                rel_deg_strong = 0.5;
            } else {
                rel_deg_strong = rel_deg;
                rel_deg_soft = 1 - rel_deg;
            }
            return {
                type: 'coke',
                relevance_degree_strong: rel_deg_strong,
                relevance_degree_soft: rel_deg_soft,
                relevance_degree_weak: 0
            }
        } else if (soda_ml >= 54 && soda_ml < 56) {
            return {
                type: 'coke',
                relevance_degree_soft: 1,
                relevance_degree_weak: 0,
                relevance_degree_strong: 0
            }
        } else if (soda_ml >= 56 && soda_ml < 58) {
            rel_deg = (58 - soda_ml) / (58 - 56);
            if (rel_deg > 0.5) {
                rel_deg_weak = rel_deg;
                rel_deg_soft = 1 - rel_deg;
            } else if (rel_deg == 0.5) {
                rel_deg_weak = 0.5;
                rel_deg_soft = 0.5;
            } else {
                rel_deg_soft = rel_deg;
                rel_deg_weak = 1 - rel_deg;
            }
            return {
                type: 'coke',
                relevance_degree_soft: rel_deg_soft,
                relevance_degree_weak: rel_deg_weak,
                relevance_degree_strong: 0
            }
        } else if (soda_ml >= 58 && soda_ml <= 60) {
            return {
                type: 'coke',
                relevance_degree_weak: 1,
                relevance_degree_strong: 0,
                relevance_degree_soft: 0
            }
        } else if (soda_ml > 60) {
            return {
                type: 'coke',
                relevance_degree_weak: 0,
                relevance_degree_strong: 0,
                relevance_degree_soft: 0
            }
        }
    } else {
        if (soda_ml < 60) {
            return {
                type: 'pepsi',
                relevance_degree_soft: 0,
                relevance_degree_strong: 0,
                relevance_degree_weak: 0
            }
        } else if (soda_ml >= 60 && soda_ml < 62) {
            return {
                type: 'pepsi',
                relevance_degree_strong: 1,
                relevance_degree_soft: 0,
                relevance_degree_weak: 0
            }
        } else if (soda_ml >= 62 && soda_ml < 64) {
            rel_deg = (64 - soda_ml) / (64 - 62);
            if (rel_deg > 0.5) {
                rel_deg_soft = rel_deg;
                rel_deg_strong = 1 - rel_deg;
            } else if (rel_deg == 0.5) {
                rel_deg_soft = 0.5;
                rel_deg_strong = 0.5;
            } else {
                rel_deg_strong = rel_deg;
                rel_deg_soft = 1 - rel_deg;
            }
            return {
                type: 'pepsi',
                relevance_degree_strong: rel_deg_strong,
                relevance_degree_soft: rel_deg_soft,
                relevance_degree_weak: 0
            }
        } else if (soda_ml >= 64 && soda_ml < 66) {
            return {
                type: 'pepsi',
                relevance_degree_soft: 1,
                relevance_degree_weak: 0,
                relevance_degree_strong: 0
            }
        } else if (soda_ml >= 66 && soda_ml < 68) {
            rel_deg = (68 - soda_ml) / (68 - 66);
            if (rel_deg > 0.5) {
                rel_deg_weak = rel_deg;
                rel_deg_soft = 1 - rel_deg;
            } else if (rel_deg == 0.5) {
                rel_deg_weak = 0.5;
                rel_deg_soft = 0.5;
            } else {
                rel_deg_soft = rel_deg;
                rel_deg_weak = 1 - rel_deg;
            }
            return {
                type: 'pepsi',
                relevance_degree_soft: rel_deg_soft,
                relevance_degree_weak: rel_deg_weak,
                relevance_degree_strong: 0
            }
        } else if (soda_ml >= 68 && soda_ml <= 70) {
            return {
                type: 'pepsi',
                relevance_degree_weak: 1,
                relevance_degree_strong: 0,
                relevance_degree_soft: 0
            }
        } else if (soda_ml > 70) {
            return {
                type: 'pepsi',
                relevance_degree_weak: 0,
                relevance_degree_strong: 0,
                relevance_degree_soft: 0
            }
        }
    }
}