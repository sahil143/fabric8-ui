import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { Http }         from '@angular/http';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Fabric8WitModule } from 'ngx-fabric8-wit';

import { FeatureFlagModule } from '../feature-flag/feature-flag.module';

import { LoadingWidgetModule } from '../dashboard-widgets/loading-widget/loading-widget.module';
import { RecentPipelinesWidgetModule } from '../dashboard-widgets/recent-pipelines-widget/recent-pipelines-widget.module';
import { RecentWorkspacesWidgetModule } from '../dashboard-widgets/recent-workspaces-widget/recent-workspaces-widget.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WorkItemWidgetModule } from './work-item-widget/work-item-widget.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoadingWidgetModule,
    Fabric8WitModule,
    FeatureFlagModule,
    WorkItemWidgetModule,
    RecentPipelinesWidgetModule,
    RecentWorkspacesWidgetModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule {
  constructor(http: Http) {}
}
