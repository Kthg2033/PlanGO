import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

=======
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
import { NotasPage } from './notas.page';

describe('NotasPage', () => {
  let component: NotasPage;
  let fixture: ComponentFixture<NotasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotasPage],
<<<<<<< HEAD
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientTestingModule // 👈 agregado para mockear HttpClient
      ],
=======
      imports: [IonicModule.forRoot(), FormsModule],
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
<<<<<<< HEAD
            params: of({}),
            queryParams: of({})
=======
            queryParams: of({}),
            params: of({})
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });
});
