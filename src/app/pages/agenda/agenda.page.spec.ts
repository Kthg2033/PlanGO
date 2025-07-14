import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgendaPage } from './agenda.page';
import { Storage } from '@ionic/storage-angular';

// Creamos un mock sencillo para Storage
class StorageMock {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve());
  get = jasmine.createSpy('get').and.returnValue(Promise.resolve([]));
}

describe('AgendaPage', () => {
  let component: AgendaPage;
  let fixture: ComponentFixture<AgendaPage>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    console.log('🚀 [SPEC] beforeEach ejecutándose para AgendaPage');
    await TestBed.configureTestingModule({
      declarations: [ AgendaPage ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: Storage, useClass: StorageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaPage);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

<<<<<<< HEAD
  it('should create', () => {
    console.log('✅ [SPEC] Ejecutando el test should create');
=======
  it('debería crearse', () => {
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título Agenda', () => {
    const ionTitle = compiled.querySelector('ion-title');
    expect(ionTitle?.textContent).toContain('Agenda');
  });

  it('debería inicializar eventos como array vacío', () => {
    expect(component.eventos).toEqual([]);
  });

});
