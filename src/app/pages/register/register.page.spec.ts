import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

=======
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
import { RegisterPage } from './register.page';

// Mock Storage
class StorageMock {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve());
  set = jasmine.createSpy('set').and.returnValue(Promise.resolve());
}

// Mock Router
class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

// Mock NavController
class NavControllerMock {
  navigateRoot = jasmine.createSpy('navigateRoot');
  navigateForward = jasmine.createSpy('navigateForward');
  navigateBack = jasmine.createSpy('navigateBack');
}

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), FormsModule]
=======
      declarations: [ RegisterPage ],
      imports: [ IonicModule.forRoot(), FormsModule ],
      providers: [
        { provide: Storage, useClass: StorageMock },
        { provide: Router, useClass: RouterMock },
        { provide: NavController, useClass: NavControllerMock } // 👈 agregado aquí
      ]
>>>>>>> b06e66c (Corrijo tests unitarios, agrego pruebas E2E con Cypress y actualizo specs)
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título Registrarse', () => {
    const ionTitle = compiled.querySelector('ion-title');
    expect(ionTitle?.textContent).toContain('Registrarse');
  });

  it('debería inicializar usuario con valores vacíos', () => {
    expect(component.usuario.nombres).toBe('');
    expect(component.usuario.codigoPais).toBe('+56');
  });

});
