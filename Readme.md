# 📦 URA EFRIS Commodity Category Codes Dictionary Search

A fast and efficient Node.js utility for fuzzy searching and matching the URA EFRIS commodity category codes and names.

---

## 🚀 Features

- 🔍 Fuzzy string matching on `commodityName` using Fuse.js
- 🔢 Closest numeric match on `commodityCode`
- 🎯 Returns top 20 relevant, unique results
- ⚡ Fast and lightweight – designed to handle the large dataset
- 🧪 Fully tested with Mocha & Chai

---

## 📦 Installation

```bash
npm install ura-efris-commodity-category-codes
```

---

## 📘 Usage

```js
const { searchDictionary } = require("ura-efris-commodity-category-codes");

// Search by name (fuzzy string match)
const resultsByName = searchDictionary("cats");

// Search by commodity code (closest numeric match)
const resultsByCode = searchDictionary(10101500);

// Optional: limit results (default is 20)
const top5 = searchDictionary("dogs", 5);

console.log(resultsByName);
```

---
