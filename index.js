const Fuse = require("fuse.js");
const dataset = require("./category-codes.json");

const fuse = new Fuse(dataset.data, {
	keys: ["commodityName"],
	threshold: 0.4,
});

function searchDictionary(query, limit = 20) {
	if (!query) return [];

	const results = [];
	const normalizedQuery =
		typeof query === "string" ? query.trim().toLowerCase() : query;

	// Numeric match on commodityCode
	if (!isNaN(normalizedQuery)) {
		const numQuery = Number(normalizedQuery);
		const byCode = dataset.data
			.map((item) => ({
				...item,
				distance: Math.abs(Number(item.commodityCode) - numQuery),
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, limit);
		results.push(...byCode);
	}

	// Fuzzy match on commodityName
	if (typeof normalizedQuery === "string") {
		const byName = fuse
			.search(normalizedQuery)
			.slice(0, limit)
			.map((res) => res.item);
		results.push(...byName);
	}

	// Deduplicate by commodityCode and cap to limit
	const unique = new Map();
	for (const r of results) {
		unique.set(r.commodityCode, r);
		if (unique.size >= limit) break;
	}

	return Array.from(unique.values());
}

module.exports = { searchDictionary };
