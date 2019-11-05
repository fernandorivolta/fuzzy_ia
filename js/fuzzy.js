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
        let soda_relevance_degree = returnSodaDegree(soda_ml, soda_type);
        let run_relevance_degree = returnRunDegree(run_ml);
        let ice_relevance_degree = returnIceDegree(ice_ml);
        console.log(soda_relevance_degree);
        console.log(run_relevance_degree);
        console.log(ice_relevance_degree);
    }
}

function returnIceDegree(ice_ml) {
    if (ice_ml == 20) {
        return {
            type: 'ice',
            relevance_degree: 1,
            taste: 'cuba'
        }
    } else {
        return {
            type: 'ice',
            relevance_degree: 0,
            taste: 'not cuba'
        }
    }
}

function returnRunDegree(run_ml) {
    let rel_deg;
    if (run_ml < 10) {
        return {
            type: 'run',
            relevance_degree: 0,
            taste: 'not cuba'
        }
    } else if (run_ml >= 10 && run_ml < 15) {
        return {
            type: 'run',
            relevance_degree: 1,
            taste: 'weak'
        }
    } else if (run_ml >= 15 && run_ml < 20) {
        rel_deg = (20 - run_ml) / (20 - 15);
        return {
            type: 'run',
            relevance_degree: rel_deg,
            taste: rel_deg > 0.51 ? "soft" : "weak"
        }
    } else if (run_ml >= 20 && run_ml < 25) {
        return {
            type: 'run',
            relevance_degree: 1,
            taste: "soft"
        }
    } else {
        rel_deg = (27 - run_ml) / (27 - 25);
        return {
            type: 'run',
            relevance_degree: rel_deg,
            taste: rel_deg > 0.51 ? "strong" : "soft"
        }
    }
}


function returnSodaDegree(soda_ml, soda_type) {
    let rel_deg;
    if (soda_type == "coke") {
        if (soda_ml < 50) {
            return {
                type: 'coke',
                relevance_degree: 0,
                taste: 'not cuba'
            }
        } else if (soda_ml >= 50 && soda_ml < 52) {
            return {
                type: 'coke',
                relevance_degree: 1,
                taste: 'strong'
            }
        } else if (soda_ml >= 52 && soda_ml < 54) {
            rel_deg = (54 - soda_ml) / (54 - 52);
            return {
                type: 'coke',
                relevance_degree: rel_deg,
                taste: rel_deg > 0.51 ? "soft" : "strong"
            }
        } else if (soda_ml >= 54 && soda_ml < 56) {
            return {
                type: 'coke',
                relevance_degree: 1,
                taste: 'soft'
            }
        } else if (soda_ml >= 56 && soda_ml < 58) {
            rel_deg = (58 - soda_ml) / (58 - 56);
            return {
                type: 'coke',
                relevance_degree: rel_deg,
                taste: rel_deg > 0.51 ? "weak" : "soft"
            }
        } else if (soda_ml >= 58 && soda_ml <= 60) {
            return {
                type: 'coke',
                relevance_degree: 1,
                taste: 'weak'
            }
        } else if (soda_ml > 60) {
            return {
                type: 'coke',
                relevance_degree: 0,
                taste: 'not cuba'
            }
        }
    } else {
        if (soda_ml < 60) {
            return {
                type: 'pepsi',
                relevance_degree: 0,
                taste: 'not cuba'
            }
        } else if (soda_ml >= 60 && soda_ml < 62) {
            return {
                type: 'pepsi',
                relevance_degree: 1,
                taste: 'strong'
            }
        } else if (soda_ml >= 62 && soda_ml < 64) {
            rel_deg = (64 - soda_ml) / (64 - 62);
            return {
                type: 'pepsi',
                relevance_degree: rel_deg,
                taste: rel_deg > 0.51 ? "soft" : "strong"
            }
        } else if (soda_ml >= 64 && soda_ml < 66) {
            return {
                type: 'pepsi',
                relevance_degree: 1,
                taste: 'soft'
            }
        } else if (soda_ml >= 66 && soda_ml < 68) {
            rel_deg = (68 - soda_ml) / (68 - 66);
            return {
                type: 'pepsi',
                relevance_degree: rel_deg,
                taste: rel_deg > 0.51 ? "weak" : "soft"
            }
        } else if (soda_ml >= 68 && soda_ml <= 70) {
            return {
                type: 'pepsi',
                relevance_degree: 1,
                taste: 'weak'
            }
        } else if (soda_ml > 70) {
            return {
                type: 'pepsi',
                relevance_degree: 0,
                taste: 'not cuba'
            }
        }
    }
}