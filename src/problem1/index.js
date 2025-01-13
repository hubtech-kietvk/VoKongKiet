var sum_to_n_a = function(n) {
    // using for loop
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
};

var sum_to_n_b = function(n) {
    // using Array.fill and reduce
    return Array(n).fill("").reduce((sum, item, index) => sum + index + 1, 0);
};

var sum_to_n_c = function(n) {
    // using recursion
    if (n <= 1){
        return n;
    };

    return n + sum_to_n_c(n - 1);
};