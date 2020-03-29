import { DataService } from './data.service';
import { Person } from './sw.models';
import { cold } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs/operators';

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
  });
});
