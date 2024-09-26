import { discountMap } from '../constants/discount.constant';

// Method 1: Dynamic Programming & Backtracking
export const calculateDiscountInDP = (books: number[]) => {
  const map = new Map();

  const backtracking = (basket: number[]) => {
    const key = basket.join('.');

    if (map.has(key)) return map.get(key);
    if (basket.length === 0) return 0;

    for (let bookToTake = 1; bookToTake <= basket.length; bookToTake++) {
      const discount = 1 - (discountMap[bookToTake as keyof typeof discountMap] || 0);

      for (let takePosition = 0; takePosition <= basket.length - bookToTake; takePosition++) {
        const _basket = [...basket];

        for (let token = 0; token < bookToTake; token++) {
          _basket[takePosition + token]--;
        }

        const currentPrice = bookToTake * 8 * discount + backtracking(_basket.filter((i) => i));

        map.set(key, Math.min(map.get(key) || Infinity, currentPrice));
      }
    }

    return map.get(key);
  };

  return backtracking(books).toFixed(2);
};

// Method 2: Greedy & Two Pointer
export const calculateDiscountInGreedy = (basket: number[]) => {
  basket.sort((a, b) => b - a);
  console.log('basket', basket);

  const discountSet: number[][] = Array.from({ length: basket[0] }, () => []);

  basket.forEach((sameBook, series: number) => {
    for (let s = 0; s < sameBook; s++) {
      discountSet[s].push(series);
    }
  });

  // move 1 book from set(5) to set(3), use two pointer
  let p1 = 0;
  let p2 = discountSet.findLastIndex((s) => s.length === 3);

  while (discountSet[p1]?.length === 5 && discountSet[p2]?.length === 3) {
    const bookTransfered = discountSet[p1].pop() as number;
    discountSet[p2].push(bookTransfered);
    p1++;
    p2--;
  }

  return {
    totalPrice: discountSet
      .reduce((acc, s) => acc + s.length * 8 * (1 - (discountMap[s.length as keyof typeof discountMap] || 0)), 0)
      .toFixed(2),
    sets: discountSet,
  };
};
