function sumRange(n, total = 0) {
  // let total = 0;
  // for (let i = n; i > 0; i--) {
  //   total += i;
  // }

  if (n <= 0) return total;

  return sumRange(n - 1, total + n);
}

console.log(sumRange(5));
