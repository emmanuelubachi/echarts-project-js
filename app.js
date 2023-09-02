import * as dataForge from "data-forge";
import { readFileSync } from "fs";

// Read the CSV file synchronously
const csvContent = readFileSync("2022_trade.csv", "utf8");

// Parse the CSV content into a DataFrame
const df = dataForge.readFileSync(csvContent).parseCSV();

console.log(df);
