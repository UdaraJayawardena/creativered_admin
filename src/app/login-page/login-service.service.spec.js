"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var login_service_service_1 = require("./login-service.service");
describe('LoginServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(login_service_service_1.LoginServiceService);
    expect(service).toBeTruthy();
  });
});
