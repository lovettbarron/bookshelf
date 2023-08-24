"use strict";
// GENERATED DO NOT EDIT
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.Gender = exports.APIClient = void 0;
var Core = /** @class */ (function () {
    function Core(config) {
        var _this = this;
        this.config = config;
        this.ctx = {
            token: "",
            isAuthenticated: false,
        };
        this.client = {
            setHeaders: function (headers) {
                _this.config.headers = headers;
                return _this;
            },
            setHeader: function (key, value) {
                var _a;
                var headers = _this.config.headers;
                if (headers) {
                    headers[key] = value;
                }
                else {
                    _this.config.headers = (_a = {}, _a[key] = value, _a);
                }
                return _this;
            },
            setBaseUrl: function (value) {
                _this.config.baseUrl = value;
                return _this;
            },
            setToken: function (value) {
                _this.ctx.token = value;
                _this.ctx.isAuthenticated = true;
                return _this;
            },
            clearToken: function () {
                _this.ctx.token = "";
                _this.ctx.isAuthenticated = false;
                return _this;
            },
            rawRequest: function (action, body) { return __awaiter(_this, void 0, void 0, function () {
                var result, rawJson, data, errorMessage, errorData, error_1, requestId, errorCommon, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, globalThis.fetch(stripTrailingSlash(this.config.baseUrl) + "/json/" + action, {
                                    method: "POST",
                                    cache: "no-cache",
                                    headers: __assign(__assign({ accept: "application/json", "content-type": "application/json" }, this.config.headers), (this.ctx.token
                                        ? {
                                            Authorization: "Bearer " + this.ctx.token,
                                        }
                                        : {})),
                                    body: JSON.stringify(body),
                                })];
                        case 1:
                            result = _a.sent();
                            if (!(result.status >= 200 && result.status < 299)) return [3 /*break*/, 3];
                            return [4 /*yield*/, result.text()];
                        case 2:
                            rawJson = _a.sent();
                            data = JSON.parse(rawJson, reviver);
                            return [2 /*return*/, {
                                    data: data,
                                }];
                        case 3:
                            errorMessage = "unknown error";
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, result.json()];
                        case 5:
                            errorData = _a.sent();
                            errorMessage = errorData.message;
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _a.sent();
                            return [3 /*break*/, 7];
                        case 7:
                            requestId = result.headers.get("X-Amzn-Requestid") || undefined;
                            errorCommon = {
                                message: errorMessage,
                                requestId: requestId,
                            };
                            switch (result.status) {
                                case 400:
                                    return [2 /*return*/, {
                                            error: __assign(__assign({}, errorCommon), { type: "bad_request" }),
                                        }];
                                case 401:
                                    return [2 /*return*/, {
                                            error: __assign(__assign({}, errorCommon), { type: "unauthorized" }),
                                        }];
                                case 403:
                                    return [2 /*return*/, {
                                            error: __assign(__assign({}, errorCommon), { type: "forbidden" }),
                                        }];
                                case 404:
                                    return [2 /*return*/, {
                                            error: __assign(__assign({}, errorCommon), { type: "not_found" }),
                                        }];
                                case 500:
                                    return [2 /*return*/, {
                                            error: __assign(__assign({}, errorCommon), { type: "internal_server_error" }),
                                        }];
                                default:
                                    return [2 /*return*/, {
                                            error: __assign(__assign({}, errorCommon), { type: "unknown" }),
                                        }];
                            }
                            return [3 /*break*/, 9];
                        case 8:
                            error_2 = _a.sent();
                            return [2 /*return*/, {
                                    error: {
                                        type: "unknown",
                                        message: "unknown error",
                                        error: error_2,
                                    },
                                }];
                        case 9: return [2 /*return*/];
                    }
                });
            }); },
        };
    }
    return Core;
}());
// Utils
var stripTrailingSlash = function (str) {
    if (!str)
        return str;
    return str.endsWith("/") ? str.slice(0, -1) : str;
};
var RFC3339 = /^(?:\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))?(?:[T\s](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?(?:\.\d+)?(?:[Zz]|[+-](?:[01]\d|2[0-3]):?[0-5]\d)?)?$/;
function reviver(key, value) {
    // Convert any ISO8601/RFC3339 strings to dates
    if (typeof value === "string" && RFC3339.test(value)) {
        return new Date(value);
    }
    return value;
}
// API
var APIClient = /** @class */ (function (_super) {
    __extends(APIClient, _super);
    function APIClient(config) {
        var _this = _super.call(this, config) || this;
        _this.actions = {
            book: function (i) {
                return _this.client.rawRequest("book", i);
            },
            allBooks: function (i) {
                return _this.client.rawRequest("allBooks", i);
            },
            deleteBook: function (i) {
                return _this.client.rawRequest("deleteBook", i);
            },
            updateBook: function (i) {
                return _this.client.rawRequest("updateBook", i);
            },
            createBook: function (i) {
                return _this.client.rawRequest("createBook", i);
            },
            authenticate: function (i) {
                return _this.client.rawRequest("authenticate", i).then(function (res) {
                    if (res.data && res.data.token)
                        _this.client.setToken(res.data.token);
                    return res;
                });
            },
            requestPasswordReset: function (i) {
                return _this.client.rawRequest("requestPasswordReset", i);
            },
            resetPassword: function (i) {
                return _this.client.rawRequest("resetPassword", i);
            },
        };
        _this.api = {
            queries: {
                book: _this.actions.book.bind(_this),
                allBooks: _this.actions.allBooks.bind(_this),
            },
            mutations: {
                deleteBook: _this.actions.deleteBook.bind(_this),
                updateBook: _this.actions.updateBook.bind(_this),
                createBook: _this.actions.createBook.bind(_this),
                authenticate: _this.actions.authenticate.bind(_this),
                requestPasswordReset: _this.actions.requestPasswordReset.bind(_this),
                resetPassword: _this.actions.resetPassword.bind(_this),
            }
        };
        return _this;
    }
    return APIClient;
}(Core));
exports.APIClient = APIClient;
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Nonbinary"] = "Nonbinary";
    Gender["Other"] = "Other";
})(Gender || (exports.Gender = Gender = {}));
var Region;
(function (Region) {
    Region["Asia"] = "Asia";
    Region["Americas"] = "Americas";
    Region["Africa"] = "Africa";
    Region["Mena"] = "Mena";
    Region["Europe"] = "Europe";
    Region["Poles"] = "Poles";
    Region["Oceania"] = "Oceania";
})(Region || (exports.Region = Region = {}));
