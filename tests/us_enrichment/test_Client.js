const chai = require("chai");
const expect = chai.expect;
const Client = require("../../src/us_enrichment/Client");
const Lookup = require("../../src/us_enrichment/Lookup");
const errors = require("../../src/Errors");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;
const {Response, FinancialResponse, GeoResponse} = require("../../src/us_enrichment/Response");

describe("A US Enrichment Client", function () {
    it("composes principal url path properly", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendPrincipal(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/property/principal");
    })

    it("composes financial url path properly", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendFinancial(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/property/financial");
    })

    it("composes geo url path properly", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendGeo(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/geo-reference");
    })

    it("correctly builds parameters for a smartyKey only principal lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let smartyKey = '(>")>#';
        let include = "1";
        let lookup = new Lookup(smartyKey, include);
        let expectedParameters = {
            include: include,
        };

        client.sendPrincipal(lookup);

        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a smartyKey only financial lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let smartyKey = '(>")>#';
        let include = "1";
        let lookup = new Lookup(smartyKey, include);
        let expectedParameters = {
            include: include,
        };

        client.sendFinancial(lookup);

        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a smartyKey only geo lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let smartyKey = '(>")>#';
        let include = "1";
        let lookup = new Lookup(smartyKey, include);
        let expectedParameters = {
            include: include,
        };

        client.sendGeo(lookup);

        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a fully-populated principal lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let lookup = new Lookup("0","1","2","3","4");

        let expectedParameters = {
            include: "1",
            exclude: "2",
            dataset: "3",
            data_subset: "4",
        };

        client.sendPrincipal(lookup);
        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a fully-populated financial lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let lookup = new Lookup("0","1","2","3","4");

        let expectedParameters = {
            include: "1",
            exclude: "2",
            dataset: "3",
            data_subset: "4",
        };

        client.sendFinancial(lookup);
        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a fully-populated geo lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        let lookup = new Lookup("0","1","2","3","4");

        let expectedParameters = {
            include: "1",
            exclude: "2",
            dataset: "3",
            data_subset: "4",
        };

        client.sendGeo(lookup);
        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("throws an error if sending without a principal lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        expect(client.sendPrincipal).to.throw(errors.UndefinedLookupError);
    });

    it("throws an error if sending without a financial lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        expect(client.sendFinancial).to.throw(errors.UndefinedLookupError);
    });

    it("throws an error if sending without a geo lookup.", function () {
        let mockSender = new MockSender();
        let client = new Client(mockSender);
        expect(client.sendGeo).to.throw(errors.UndefinedLookupError);
    });

    it("rejects with an exception if the principal response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendPrincipal(lookup).catch((e) => {expect(e).to.equal(expectedError);});
    });

    it("rejects with an exception if the financial response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendFinancial(lookup).catch((e) => {expect(e).to.equal(expectedError);});
    });

    it("rejects with an exception if the geo response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendGeo(lookup).catch((e) => {expect(e).to.equal(expectedError);});
    });

    it("returns an empty array when no principal respo are returned.", () => {
        let mockSender = new MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendPrincipal(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("returns an empty array when no financial suggestions are returned.", () => {
        let mockSender = new MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendFinancial(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("returns an empty array when no geo suggestions are returned.", () => {
        let mockSender = new MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendGeo(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("attaches response to a principal lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new Response(rawMockResponse);

        let mockSender = new MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendPrincipal(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })

    it("attaches response to a financial lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new FinancialResponse(rawMockResponse);

        let mockSender = new MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendFinancial(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })

    it("attaches response to a geo lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new GeoResponse(rawMockResponse);

        let mockSender = new MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendGeo(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })
});
