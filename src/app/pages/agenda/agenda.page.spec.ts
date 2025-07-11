import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AgendaPage } from './agenda.page';

describe('AgendaPage', () => {
  let component: AgendaPage;
  let fixture: ComponentFixture<AgendaPage>;

  beforeEach(async () => {
    console.log('🚀 [SPEC] beforeEach ejecutándose para AgendaPage');
    await TestBed.configureTestingModule({
      declarations: [AgendaPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('✅ [SPEC] Ejecutando el test should create');
    expect(component).toBeTruthy();
  });
});
