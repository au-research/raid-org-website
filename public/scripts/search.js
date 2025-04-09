"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Set to store files for downloading
var filesToDownload = new Set();
/**
 * Downloads files from an array of URLs
 * @param urls Array of URLs to download from
 */
function downloadFiles(urls) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (i) {
                        var url, urlParts, lastThreeParts, prefix, suffixWithDot, suffix, response, blob, objectUrl_1, link_1, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 4, , 5]);
                                    url = urls[i];
                                    if (!url)
                                        return [2 /*return*/, "continue"];
                                    urlParts = url.split("/");
                                    lastThreeParts = urlParts.slice(-3);
                                    prefix = lastThreeParts[0], suffixWithDot = lastThreeParts[1];
                                    suffix = suffixWithDot.split(".")[0];
                                    return [4 /*yield*/, fetch(url)];
                                case 1:
                                    response = _b.sent();
                                    return [4 /*yield*/, response.blob()];
                                case 2:
                                    blob = _b.sent();
                                    objectUrl_1 = window.URL.createObjectURL(blob);
                                    link_1 = document.createElement("a");
                                    link_1.href = objectUrl_1;
                                    link_1.download = url.split("/").pop() || "raid-".concat(prefix, "-").concat(suffix, ".json");
                                    link_1.style.display = "none";
                                    document.body.appendChild(link_1);
                                    link_1.click();
                                    setTimeout(function () {
                                        document.body.removeChild(link_1);
                                        window.URL.revokeObjectURL(objectUrl_1);
                                    }, 100);
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                                case 3:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _b.sent();
                                    console.error("Error downloading file ".concat(urls[i], ":"), error_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < urls.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Highlights search text in a string
 * @param text The text to search within
 * @param query The search query to highlight
 * @returns Text with search query highlighted
 */
var highlightText = function (text, query) {
    if (!query)
        return text;
    var escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp("(".concat(escapedQuery, ")"), "gi");
    return text.replace(regex, "<mark>$1</mark>");
};
/**
 * Searches a single API with the given criteria
 * @param apiUrl API URL to search
 * @param searchCriteria Search criteria object
 * @param operator Logical operator (AND/OR) for combining search terms
 * @returns Promise resolving to API response
 */
var searchSingleApi = function (apiUrl, searchCriteria, operator) { return __awaiter(void 0, void 0, void 0, function () {
    var queryParts, queryString, url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryParts = [];
                if (searchCriteria.title) {
                    queryParts.push("titles.title:*".concat(encodeURIComponent(searchCriteria.title), "*"));
                }
                if (searchCriteria.description) {
                    queryParts.push("descriptions.description:*".concat(encodeURIComponent(searchCriteria.description), "*"));
                }
                if (searchCriteria.creator) {
                    queryParts.push("creators.name:\"".concat(encodeURIComponent(searchCriteria.creator), "\""));
                }
                if (searchCriteria.related) {
                    queryParts.push("relatedIdentifiers.relatedIdentifier:\"".concat(encodeURIComponent(searchCriteria.related), "\""));
                }
                if (searchCriteria.organisation) {
                    queryParts.push("contributors.nameIdentifiers.nameIdentifier:\"".concat(encodeURIComponent(searchCriteria.organisation), "\""));
                }
                if (queryParts.length === 0) {
                    return [2 /*return*/, { data: [] }];
                }
                queryString = "(identifiers.identifier:*raid.org.au* AND (".concat(queryParts.join(" ".concat(operator, " ")), "))");
                url = "".concat(apiUrl, "?query=").concat(queryString, "&page[size]=10000");
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.json()];
        }
    });
}); };
/**
 * Searches DOIs across multiple APIs
 * @param searchCriteria Search criteria object
 * @param operator Logical operator for combining search terms
 * @returns Promise resolving to combined API response
 */
var searchDois = function (searchCriteria, operator) { return __awaiter(void 0, void 0, void 0, function () {
    var hasAtLeastOneQuery, apis, results, combinedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hasAtLeastOneQuery = Object.values(searchCriteria).some(function (value) { return value.trim() !== ""; });
                if (!hasAtLeastOneQuery) {
                    throw new Error("At least one search criterion is required");
                }
                apis = ["https://api.datacite.org/dois"];
                return [4 /*yield*/, Promise.allSettled(apis.map(function (api) { return searchSingleApi(api, searchCriteria, operator); }))];
            case 1:
                results = _a.sent();
                combinedData = results.reduce(function (acc, result) {
                    if (result.status === "fulfilled") {
                        return __spreadArray(__spreadArray([], acc, true), result.value.data, true);
                    }
                    return acc;
                }, []);
                return [2 /*return*/, { data: combinedData }];
        }
    });
}); };
/**
 * Creates an HTML element for a search result
 * @param item Result item data
 * @param searchCriteria Original search criteria
 * @returns HTML div element with the result
 */
var createResultElement = function (item, searchCriteria) {
    var _a, _b, _c, _d, _e;
    var attributes = item.attributes;
    var resultDiv = document.createElement("div");
    resultDiv.className = "search-result";
    var titles = ((_a = attributes === null || attributes === void 0 ? void 0 : attributes.titles) === null || _a === void 0 ? void 0 : _a.map(function (t) {
        return searchCriteria.title
            ? highlightText(t.title, searchCriteria.title)
            : t.title;
    }).filter(Boolean).join(" | ")) || "No Title";
    var doi = attributes === null || attributes === void 0 ? void 0 : attributes.doi;
    var doiLink = doi
        ? "<a href=\"https://raid.org/".concat(doi, "\" target=\"_blank\">").concat(searchCriteria.related
            ? highlightText(doi, searchCriteria.related)
            : doi, "</a>")
        : "No DOI";
    var creatorsLinks = "";
    if ((attributes === null || attributes === void 0 ? void 0 : attributes.creators) && (attributes === null || attributes === void 0 ? void 0 : attributes.creators.length) > 0) {
        for (var _i = 0, _f = attributes === null || attributes === void 0 ? void 0 : attributes.creators; _i < _f.length; _i++) {
            var creator = _f[_i];
            var highlightedName = searchCriteria.creator
                ? highlightText(creator.name, searchCriteria.creator)
                : creator.name;
            creatorsLinks += "<a href=\"".concat(creator.name, "\" target=\"_blank\">").concat(highlightedName, "</a> & ");
        }
        creatorsLinks = creatorsLinks.slice(0, -3);
    }
    var relatedIdentifiersLinks = "";
    if ((attributes === null || attributes === void 0 ? void 0 : attributes.relatedIdentifiers) &&
        attributes.relatedIdentifiers.length > 0) {
        for (var _g = 0, _h = attributes.relatedIdentifiers; _g < _h.length; _g++) {
            var relatedId = _h[_g];
            var highlightedId = searchCriteria.related
                ? highlightText(relatedId.relatedIdentifier, searchCriteria.related)
                : relatedId.relatedIdentifier;
            relatedIdentifiersLinks += "<a href=\"".concat(relatedId.relatedIdentifier, "\" target=\"_blank\">").concat(highlightedId, "</a> & ");
        }
        relatedIdentifiersLinks = relatedIdentifiersLinks.slice(0, -3);
    }
    var organisationsLinks = "";
    if ((attributes === null || attributes === void 0 ? void 0 : attributes.contributors) && attributes.contributors.length > 0) {
        for (var _j = 0, _k = attributes.contributors; _j < _k.length; _j++) {
            var contributor = _k[_j];
            if (contributor.nameIdentifiers &&
                contributor.nameIdentifiers.length > 0) {
                for (var _l = 0, _m = contributor.nameIdentifiers; _l < _m.length; _l++) {
                    var nameId = _m[_l];
                    if (nameId.nameIdentifier &&
                        nameId.nameIdentifier.includes("ror.org")) {
                        var rorId = nameId.nameIdentifier.split("/").pop() || "";
                        var highlightedName = searchCriteria.organisation
                            ? highlightText(nameId.nameIdentifier, searchCriteria.organisation)
                            : nameId.nameIdentifier;
                        organisationsLinks += "<a href=\"https://ror.org/".concat(rorId, "\" target=\"_blank\">").concat(highlightedName, "</a> & ");
                    }
                }
            }
        }
        organisationsLinks = organisationsLinks
            ? organisationsLinks.slice(0, -3)
            : "";
    }
    var description = searchCriteria.description
        ? highlightText(((_c = (_b = attributes === null || attributes === void 0 ? void 0 : attributes.descriptions) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.description) || "No Description", searchCriteria.description)
        : ((_e = (_d = attributes === null || attributes === void 0 ? void 0 : attributes.descriptions) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.description) || "No Description";
    resultDiv.innerHTML = "\n      <h3>".concat(titles, "</h3>\n      <p>RAiD: ").concat(doiLink, "</p>\n      <p>Creators: ").concat(creatorsLinks || "No creators", "</p>\n      <p>Related Identifiers: ").concat(relatedIdentifiersLinks || "No related identifiers", "</p>\n      <p>Organisations: ").concat(organisationsLinks || "No organisations", "</p>\n      <p>Description: ").concat(description, "</p>\n  ");
    return resultDiv;
};
/**
 * Renders search results to a container
 * @param container HTML element to render results into
 * @param data API response data
 * @param searchCriteria Original search criteria
 */
var renderResults = function (container, data, searchCriteria) {
    var _a;
    if (!((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.length)) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }
    var downloadButton = document.createElement("button");
    container.innerHTML = "";
    downloadButton.innerText = "Download Results";
    downloadButton.id = "download-results";
    downloadButton.style.backgroundColor = "#008ccf";
    container.appendChild(downloadButton);
    data.data.forEach(function (item) {
        container.appendChild(createResultElement(item, searchCriteria));
        filesToDownload.add("https://static.prod.raid.org.au/raids/".concat(item.attributes.doi, ".download/"));
    });
    downloadButton.addEventListener("click", function () {
        downloadFiles(Array.from(filesToDownload));
    });
};
/**
 * Performs search based on form input values
 * @param event Optional form submission event
 */
function performSearch(event) {
    return __awaiter(this, void 0, void 0, function () {
        var container, searchCriteria, operatorElement, operator, hasAtLeastOneCriterion, data, error_2;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    // If event exists (form submission), prevent default
                    if (event) {
                        event.preventDefault();
                    }
                    container = document.getElementById("results-container");
                    if (!container) {
                        console.error("Results container not found");
                        return [2 /*return*/];
                    }
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    searchCriteria = {
                        title: ((_a = document.getElementById("title-search")) === null || _a === void 0 ? void 0 : _a.value) ||
                            "",
                        description: ((_b = document.getElementById("description-search")) === null || _b === void 0 ? void 0 : _b.value) || "",
                        creator: ((_c = document.getElementById("creator-search")) === null || _c === void 0 ? void 0 : _c.value) || "",
                        related: ((_d = document.getElementById("related-search")) === null || _d === void 0 ? void 0 : _d.value) || "",
                        organisation: ((_e = document.getElementById("organisation-search")) === null || _e === void 0 ? void 0 : _e.value) || "",
                    };
                    operatorElement = document.querySelector('input[name="operator"]:checked');
                    operator = (operatorElement === null || operatorElement === void 0 ? void 0 : operatorElement.value) || "AND";
                    hasAtLeastOneCriterion = Object.values(searchCriteria).some(function (value) { return value.trim() !== ""; });
                    if (!hasAtLeastOneCriterion) {
                        alert("Please enter at least one search term");
                        return [2 /*return*/];
                    }
                    container.innerHTML = "Loading...";
                    return [4 /*yield*/, searchDois(searchCriteria, operator)];
                case 2:
                    data = _f.sent();
                    renderResults(container, data, searchCriteria);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _f.sent();
                    console.error("Error:", error_2);
                    container.innerHTML = "<p>Error fetching results. Please try again.</p>";
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Add event listeners when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the search form
    var searchForm = document.getElementById("search-form");
    // Add submit event listener to the form
    if (searchForm) {
        searchForm.addEventListener("submit", performSearch);
    }
    else {
        console.error("Search form not found");
        // Fallback to button click if form not found
        var searchButton = document.getElementById("search-button");
        if (searchButton) {
            searchButton.addEventListener("click", performSearch);
        }
        else {
            console.error("Search button not found");
        }
    }
    // Add event listeners for example buttons
    var exampleButtons = document.querySelectorAll(".example-button");
    exampleButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var _a;
            var fieldId = this.getAttribute("data-field");
            if (fieldId) {
                var field = document.getElementById(fieldId);
                if (field) {
                    field.value = ((_a = this.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                }
            }
        });
    });
});
