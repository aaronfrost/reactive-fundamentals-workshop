import { DataService } from './data.service';
import { Person } from './sw.models';
import { cold, hot } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs/operators';
import { NEVER } from 'rxjs';

fdescribe('DataService', () => {
  let mockPeople;
  beforeEach(() => {
    mockPeople = [
      { name: 'Juke Piewalker' },
      { name: 'Sobe Han' }
    ] as Person[];
  });

  describe('getPeople', () => {
    let mockHttp;
    let dataService: DataService;
    beforeEach(() => {
      mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
      dataService = new DataService(mockHttp);
    });


    it('should get people', () => {
      const httpCall = cold('a|', { a: { results: mockPeople } });
      mockHttp.get.and.returnValue(httpCall);
      const actual = dataService.getPeople();
      const expected = cold('a|', { a: mockPeople });
      expect(actual).toBeObservable(expected);
    });

    it('should return an empty array when the http call fails', () => {
      const httpCall = cold('#');
      mockHttp.get.and.returnValue(httpCall);
      const actual = dataService.getPeople();
      const expected = cold('(a|)', { a: [] });
      expect(actual).toBeObservable(expected);
    });


    it('should get people more than once', () => {
      const text = 'rolling with marbles';
      const httpCall = cold('- -     a---b------a|', {
        a: { results: mockPeople },
        b: { results: text }
      });
      const expected = cold(' - -    a---b------a|', {
        a: mockPeople,
        b: text
      });
      mockHttp.get.and.returnValue(httpCall);
      const actual = dataService.getPeople();
      expect(actual).toBeObservable(expected);
    });

    fit('should fail if the http call takes too long', () => {
      const testScheduler = new TestScheduler((a, e) => {
        expect(a).toEqual(e);
      });
      testScheduler.run(helpers => {
        const { expectObservable } = helpers;
        const httpCall = NEVER;
        mockHttp.get.and.returnValue(httpCall);
        const actual = dataService.getPeople();
        expectObservable(actual).toBe('1s (a|)', { a: [] });
      });
    });

    fit('should fail if the http call takes too long via subscribe', (done) => {
      const httpCall = NEVER;
      mockHttp.get.and.returnValue(httpCall);
      dataService.getPeople().subscribe(people => {
        expect(people).toEqual([]);
        done();
      });
    });
  });
});
