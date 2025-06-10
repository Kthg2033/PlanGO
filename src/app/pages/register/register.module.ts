import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';   // necesario para [(ngModel)]
import { IonicModule }   from '@ionic/angular';
import { RouterModule }  from '@angular/router';

import { RegisterPage }  from './register.page';

@NgModule({
  declarations: [RegisterPage],
  imports: [
    CommonModule,
    FormsModule,                            // va en el módulo, no en el componente
    IonicModule,
    RouterModule.forChild([{ path: '', component: RegisterPage }]),
  ],
})
export class RegisterPageModule {}

