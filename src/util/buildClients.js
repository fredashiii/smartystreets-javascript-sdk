const ClientBuilder = require("../ClientBuilder");

function instantiateClientBuilder(credentials) {
	return new ClientBuilder(credentials);
}

function buildUsStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsStreetApiClient();
}

function buildUsAutocompleteProApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsAutocompleteProClient();
}

function buildUsExtractApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsExtractClient();
}

function buildUsZipcodeApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsZipcodeClient();
}

function buildInternationalStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalStreetClient();
}

function buildUsReverseGeoApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsReverseGeoClient();
}

function buildInternationalAddressAutocompleteApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalAddressAutocompleteClient();
}

function buildUsEnrichmentApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsEnrichmentClient();
}

module.exports = {
	usStreet: buildUsStreetApiClient,
	usAutocompletePro: buildUsAutocompleteProApiClient,
	usExtract: buildUsExtractApiClient,
	usZipcode: buildUsZipcodeApiClient,
	internationalStreet: buildInternationalStreetApiClient,
	usReverseGeo: buildUsReverseGeoApiClient,
	internationalAddressAutocomplete: buildInternationalAddressAutocompleteApiClient,
	usEnrichment: buildUsEnrichmentApiClient,
};