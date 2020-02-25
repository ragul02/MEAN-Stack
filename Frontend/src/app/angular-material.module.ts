import { NgModule } from '@angular/core';

import {
    MatInputModule, MatCardModule,
    MatExpansionModule,
    MatButtonModule, MatToolbarModule, MatDialogModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatToolbarModule,
        MatDialogModule
    ]

})

export class AngularMaterialModule { }
