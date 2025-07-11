import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NotasPage } from './notas.page';

describe('NotasPage', () => {
  let component: NotasPage;
  let fixture: ComponentFixture<NotasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotasPage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientTestingModule // 👈 agregado para mockear HttpClient
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
