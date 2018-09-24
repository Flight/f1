import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
