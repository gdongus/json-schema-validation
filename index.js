var Validator = require('jsonschema').Validator;
var v = new Validator();
var schema = {
    "type": "object",
    "additionalProperties": false,
    "patternProperties": {
        "^\\d{4}$": {
            "type": "object",
            "additionalProperties": true,
            "properties": {
                "branchNumber": {
                    "type": "string",
                    "description": "Branch number of the closest NDL"
                },
                "statusMessage": {
                    "type": "string",
                    "description": "Status of the operation, e.g. OK on success"
                },
                "lastUpdate": {
                    "type": "string",
                    "description": "Last update timestamp"
                },
                "openingDate": {
                    "type": "string",
                    "description": "openingDate timestamp"
                },
                "closingDate": {
                    "type": "string",
                    "description": "closingDate timestamp"
                },
                "address": {
                    "type": "object",
                    "additionalProperties": true,
                    "properties": {
                        "countryCode": {
                            "type": "string",
                            "description": "The country code using ISO-3166"
                        },
                        "state": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "zipCode": {
                            "type": "string"
                        },
                        "street": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "addon": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "fax": {
                            "type": "string"
                        }
                    }
                },
                "services": {
                    "type": "array",
                    "description": "The services the branch does offer. E.g. FMCP",
                    "items": {
                        "type": "string"
                    }
                },
                "region": {
                    "type": "string"
                },
                "regionName": {
                    "type": "string"
                },
                "area": {
                    "type": "string"
                },
                "areaName": {
                    "type": "string"
                },
                "companyName": {
                    "type": "string"
                },
                "openingHours": {
                    "type": "object",
                    "patternProperties": {
                        "^\\d{3}$": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "additionalProperties": true,
                                "properties": {
                                    "open": {
                                        "type": "string"
                                    },
                                    "close": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "specialOpeningHours": {
                    "type": "object",
                    "patternProperties": {
                        "^\\d{4}-\\d{2}-\\d{2}$": {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "additionalProperties": true,
                                    "properties": {
                                        "times": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "additionalProperties": true,
                                                "properties": {
                                                    "open": {
                                                        "type": "string"
                                                    },
                                                    "close": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    "type": "object",
                                    "additionalProperties": true,
                                    "properties": {
                                        "closed": {
                                            "type": "boolean"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
};

let instance = {
    "0123": {
        "lastUpdate": "2023-02-01T12:34:56Z",
        "openingDate": "2020-01-01",
        "closingDate": "2023-03-31",
        "address": {
            "countryCode": "DE",
            "state": "HH",
            "city": "Hamburg",
            "zipCode": "22083",
            "street": "Str 23",
            "name": " Zentrale",
            "addon": "ist keine NDL",
            "phone": "040 123 45 67",
            "fax": "040 123 45 68"
        },
        "services": [
            "FLMN",
            "FMCP",
            "FMCB",
            "FMST"
        ],
        "openingHours": {
            "010": [
                {
                    "open": "09:00:00",
                    "close": "13:00:00"
                },
                {
                    "open": "14:00:00",
                    "close": "18:00:00"
                }
            ]
        },
        "specialOpeningHours": {
            "2022-12-24": {
                "times": [
                    {
                        "open": "09:00:00",
                        "close": "12:00:00"
                    }
                ]
            },
            "2022-12-25": {
                "closed": true
            }
        },
        "region": "DE_2",
        "regionName": "Norddeutschland",
        "area": "DEU",
        "areaName": "Deutschland",
        "companyName": "Foo GmbH"
    },
    "0124": {

    }
};




console.log(v.validate(instance, schema));
