function sortSalesData(sales) {
  const salesWithTotal = sales.map((sale) => ({
    ...sale,
    Total: sale.amount * sale.quantity,
  }));
  return salesWithTotal.sort((a, b) => b.Total - a.Total);
}

// Example usage
const sales = [
  { amount: 10000, quantity: 10 },
  { amount: 20000, quantity: 5 },
  { amount: 15000, quantity: 7 },
];

console.log("Sorted Sales Data:");
console.log(sortSalesData(sales));
console.log("\nOriginal Sales Array (unchanged):");
console.log(sales);
