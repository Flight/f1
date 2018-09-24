import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialModule { }
