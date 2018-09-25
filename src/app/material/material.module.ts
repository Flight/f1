import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatTableModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: []
})
export class MaterialModule { }
