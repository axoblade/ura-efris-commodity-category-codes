const { expect } = require("chai");
const { searchDictionary } = require("../index");

describe("searchDictionary", () => {
	it("should return close matches for numeric commodityCode", () => {
		const results = searchDictionary(10101500);
		expect(results).to.be.an("array");
		expect(results.length).to.be.at.least(1);
		expect(results[0]).to.have.property("commodityCode");
	});

	it("should return close matches for string commodityName", () => {
		const results = searchDictionary("cat");
		expect(results).to.be.an("array");
		const names = results.map((r) => r.commodityName.toLowerCase());
		expect(names.some((n) => n.includes("cat"))).to.be.true;
	});

	it("should return empty array for invalid input", () => {
		const results = searchDictionary("");
		expect(results).to.be.an("array").that.is.empty;
	});

	it("should deduplicate results by commodityCode", () => {
		const results = searchDictionary("cats");
		const codes = results.map((r) => r.commodityCode);
		const uniqueCodes = new Set(codes);
		expect(uniqueCodes.size).to.equal(codes.length);
	});

	it("should return no more than 20 results by default", () => {
		const results = searchDictionary("cats");
		expect(results.length).to.be.at.most(20);
	});
});
