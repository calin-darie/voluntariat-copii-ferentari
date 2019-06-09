import { KidsSearchQuery } from './kids-search.query'
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import "../../stringExtensions"

describe('KidsSearchQuery', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [KidsSearchQuery]
        });
    });

  
    it('should find search string in last name', inject(
        [HttpTestingController, KidsSearchQuery],
        (
          httpMock: HttpTestingController,
          query: KidsSearchQuery
        ) => {
            query.execute('ca').subscribe(kids => {
                expect(kids.length).toEqual(2);
              });
              
            const mockReq = httpMock.match(any => true)[0];
            mockReq.flush([
                {"name":{"last":"Codrin","first":"Mihai","nick":""},"grade":""          ,"id":"d713f952-dc8c-4018-92df-176fdfca3594"},
                {"name":{"last":"Călușaru","first":"Maria","nick":""},"grade":""        ,"id":"d713f952-dc8c-4018-92df-176fdfca3593"},
                {"name":{"last":"Kerekeș","first":"Nicu","nick":""},"grade":""         ,"id":"d713f952-dc8c-4018-92df-176fdfca3596"},
                {"name":{"last":"calușaru","first":"Mario","nick":"Bobo"},"grade":"8A","id":"c8e2b566-371e-4202-ac67-392e7a0177ef"}
            ]);
    }));
    
    it('should find search string in first name', inject(
        [HttpTestingController, KidsSearchQuery],
        (
          httpMock: HttpTestingController,
          query: KidsSearchQuery
        ) => {
            query.execute('n').subscribe(kids => {
                expect(kids.length).toEqual(1);
              });
              
            const mockReq = httpMock.match(any => true)[0];
            mockReq.flush([
                {"name":{"last":"Codrin","first":"Mihai","nick":""},"grade":""          ,"id":"d713f952-dc8c-4018-92df-176fdfca3594"},
                {"name":{"last":"Călușaru","first":"Maria","nick":""},"grade":""        ,"id":"d713f952-dc8c-4018-92df-176fdfca3593"},
                {"name":{"last":"Kerekeș","first":"Nicu","nick":""},"grade":""         ,"id":"d713f952-dc8c-4018-92df-176fdfca3596"},
                {"name":{"last":"calușaru","first":"Mario","nick":"Bobo"},"grade":"8A","id":"c8e2b566-371e-4202-ac67-392e7a0177ef"}
            ]);
    }));
  
    it('should find search string in nick', inject(
        [HttpTestingController, KidsSearchQuery],
        (
          httpMock: HttpTestingController,
          query: KidsSearchQuery
        ) => {
            query.execute('bob').subscribe(kids => {
                expect(kids.length).toEqual(1);
              });
              
            const mockReq = httpMock.match(any => true)[0];
            mockReq.flush([
                {"name":{"last":"Codrin","first":"Mihai","nick":""},"grade":""          ,"id":"d713f952-dc8c-4018-92df-176fdfca3594"},
                {"name":{"last":"Călușaru","first":"Maria","nick":""},"grade":""        ,"id":"d713f952-dc8c-4018-92df-176fdfca3593"},
                {"name":{"last":"Kerekeș","first":"Nicu","nick":""},"grade":""         ,"id":"d713f952-dc8c-4018-92df-176fdfca3596"},
                {"name":{"last":"calușaru","first":"Mario","nick":"Bobo"},"grade":"8A","id":"c8e2b566-371e-4202-ac67-392e7a0177ef"}
            ]);
    }));
    
  
    it('should treat multiple search words as *and* filters', inject(
        [HttpTestingController, KidsSearchQuery],
        (
          httpMock: HttpTestingController,
          query: KidsSearchQuery
        ) => {
            query.execute('ma cal').subscribe(kids => {
                expect(kids.length).toEqual(2);
              });
              
            const mockReq = httpMock.match(any => true)[0];
            mockReq.flush([
                {"name":{"last":"Calu","first":"Daniel","nick":""},"grade":""          ,"id":"d713f952-dc8c-4018-92df-176fdfca3594"},
                {"name":{"last":"Călușaru","first":"Maria","nick":""},"grade":""        ,"id":"d713f952-dc8c-4018-92df-176fdfca3593"},
                {"name":{"last":"Manga","first":"Marin","nick":""},"grade":""         ,"id":"d713f952-dc8c-4018-92df-176fdfca3596"},
                {"name":{"last":"Calafat","first":"Mario","nick":"Bobo"},"grade":"8A","id":"c8e2b566-371e-4202-ac67-392e7a0177ef"}
            ]);
    }));
  });