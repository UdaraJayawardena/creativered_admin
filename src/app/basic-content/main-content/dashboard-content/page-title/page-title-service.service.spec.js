"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var page_title_service_service_1 = require("./page-title-service.service");
describe('PageTitleServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(page_title_service_service_1.PageTitleServiceService);
    expect(service).toBeTruthy();
  });
});
