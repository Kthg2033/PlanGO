import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
<<<<<<< HEAD
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot()
      ],
=======
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
<<<<<<< HEAD
            snapshot: {
              paramMap: {
                get: (key: string) => null
              }
            },
=======
            queryParams: of({}),
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
            params: of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
