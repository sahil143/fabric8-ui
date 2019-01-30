import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportCsvComponent } from './export-csv.component';
import { FilterService } from '../../services/filter.service';
import { SpaceQuery } from '../../models/space';
import { NgLetModule } from '../../shared/ng-let';

@NgModule({
  imports: [CommonModule, NgLetModule],
  declarations: [ExportCsvComponent],
  exports: [ExportCsvComponent],
  providers: [FilterService, SpaceQuery],
})
export class ExportCsvModule {}
