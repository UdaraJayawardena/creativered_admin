"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var system_service_service_1 = require("./system-service.service");
describe('SystemServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(system_service_service_1.SystemServiceService);
    expect(service).toBeTruthy();
  });
});
