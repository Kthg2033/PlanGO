import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomePage } from './home.page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

// mocks
const alertCtrlMock = { create: jasmine.createSpy('create').and.returnValue(Promise.resolve({ present: () => Promise.resolve() })) };
const modalCtrlMock = { create: jasmine.createSpy('create').and.returnValue(Promise.resolve({ present: () => Promise.resolve(), onDidDismiss: () => Promise.resolve({ data: null }) })) };
const storageMock = { create: jasmine.createSpy('create').and.returnValue(Promise.resolve()), get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)), set: jasmine.createSpy('set').and.returnValue(Promise.resolve()) };
const apiServiceMock = { getTareas: jasmine.createSpy('getTareas').and.returnValue(of([])) };

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        FullCalendarModule
      ],
      providers: [
        { provide: AlertController, useValue: alertCtrlMock },
        { provide: ModalController, useValue: modalCtrlMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: Storage, useValue: storageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
