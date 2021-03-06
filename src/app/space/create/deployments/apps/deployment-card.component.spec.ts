import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  initContext,
  TestContext
} from 'testing/test-context';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import {
  BsDropdownConfig,
  BsDropdownModule,
  BsDropdownToggleDirective
} from 'ngx-bootstrap/dropdown';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

import { ChartModule } from 'patternfly-ng/chart';
import 'patternfly/dist/js/patternfly-settings.js';
import {
  BehaviorSubject,
  Observable,
  Subject
} from 'rxjs';
import { createMock } from 'testing/mock';

import { NotificationsService } from 'app/shared/notifications.service';
import { CpuStat } from '../models/cpu-stat';
import { MemoryStat } from '../models/memory-stat';
import {
  DeploymentStatusService,
  Status,
  StatusType
} from '../services/deployment-status.service';
import { DeploymentsService } from '../services/deployments.service';
import { DeploymentCardComponent } from './deployment-card.component';

@Component({
  template: '<deployment-card></deployment-card>'
})
class HostComponent { }

@Component({
  selector: 'deployments-donut',
  template: ''
})
class FakeDeploymentsDonutComponent {
  @Input() mini: boolean;
  @Input() spaceId: string;
  @Input() applicationId: string;
  @Input() environment: string;
}

@Component({
  selector: 'delete-deployment-modal',
  template: ''
})
class FakeDeleteDeploymentModal {
  @Input() host: ModalDirective;
  @Input() applicationId: string;
  @Input() environmentName: string;
  @Output() deleteEvent = new EventEmitter();
}

@Component({
  selector: 'deployment-graph-label',
  template: ''
})
class FakeDeploymentGraphLabelComponent {
  @Input() type: any;
  @Input() dataMeasure: any;
  @Input() value: any;
  @Input() valueUpperBound: any;
}

@Component({
  selector: 'deployment-status-icon',
  template: ''
})
class FakeDeploymentStatusIconComponent {
  @Input() iconClass: string;
  @Input() toolTip: string;
}

@Component({
  selector: 'deployment-details',
  template: ''
})
class FakeDeploymentDetailsComponent {
  @Input() collapsed: boolean;
  @Input() applicationId: string;
  @Input() environment: string;
  @Input() spaceId: string;
  @Input() active: boolean;
}

function initMockSvc(): jasmine.SpyObj<DeploymentsService> {
  const mockSvc: jasmine.SpyObj<DeploymentsService> = createMock(DeploymentsService);

  mockSvc.getVersion.and.returnValue(Observable.of('1.2.3'));
  mockSvc.getDeploymentCpuStat.and.returnValue(Observable.of([{ used: 1, quota: 2, timestamp: 1 }] as CpuStat[]));
  mockSvc.getDeploymentMemoryStat.and.returnValue(Observable.of([{ used: 3, quota: 4, units: 'GB', timestamp: 1 }] as MemoryStat[]));
  mockSvc.getAppUrl.and.returnValue(Observable.of('mockAppUrl'));
  mockSvc.getConsoleUrl.and.returnValue(Observable.of('mockConsoleUrl'));
  mockSvc.getLogsUrl.and.returnValue(Observable.of('mockLogsUrl'));
  mockSvc.deleteDeployment.and.returnValue(Observable.of('mockDeletedMessage'));

  return mockSvc;
}

describe('DeploymentCardComponent async tests', () => {

  let component: DeploymentCardComponent;
  let fixture: ComponentFixture<DeploymentCardComponent>;
  let mockSvc: jasmine.SpyObj<DeploymentsService>;
  let mockStatusSvc: jasmine.SpyObj<DeploymentStatusService>;
  let notifications: any;
  let active: Subject<boolean>;

  beforeEach(fakeAsync(() => {
    active = new BehaviorSubject<boolean>(true);
    mockSvc = initMockSvc();
    mockSvc.isApplicationDeployedInEnvironment.and.returnValue(active);
    mockStatusSvc = createMock(DeploymentStatusService);
    mockStatusSvc.getDeploymentAggregateStatus.and.returnValue(Observable.never());
    notifications = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['message']);

    TestBed.configureTestingModule({
      declarations: [
        DeploymentCardComponent,
        FakeDeploymentsDonutComponent,
        FakeDeploymentGraphLabelComponent,
        FakeDeploymentDetailsComponent,
        FakeDeploymentStatusIconComponent,
        FakeDeleteDeploymentModal
      ],
      imports: [
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        ChartModule,
        ModalModule.forRoot()
      ],
      providers: [
        BsDropdownConfig,
        { provide: NotificationsService, useValue: notifications },
        { provide: DeploymentsService, useValue: mockSvc },
        { provide: DeploymentStatusService, useValue: mockStatusSvc }
      ]
    });

    fixture = TestBed.createComponent(DeploymentCardComponent);
    component = fixture.componentInstance;

    component.spaceId = 'mockSpaceId';
    component.applicationId = 'mockAppId';
    component.environment = 'mockEnvironment';

    spyOn(component, 'openModal');
    fixture.detectChanges();
    flush();
    flushMicrotasks();
  }));

  describe('dropdown menus', () => {
    let menuItems: DebugElement[];

    function getItemByLabel(label: string): DebugElement {
      return menuItems
        .filter((item: DebugElement) => item.nativeElement.textContent.includes(label))[0];
    }

    beforeEach(fakeAsync(() => {
      const de: DebugElement = fixture.debugElement.query(By.directive(BsDropdownToggleDirective));
      de.triggerEventHandler('click', new CustomEvent('click'));

      fixture.detectChanges();
      tick();

      const menu: DebugElement = fixture.debugElement.query(By.css('.dropdown-menu'));
      menuItems = menu.queryAll(By.css('li'));
    }));

    it('should not display appUrl if none available', fakeAsync(() => {
      component.appUrl = Observable.of('');

      fixture.detectChanges();

      const menu: DebugElement = fixture.debugElement.query(By.css('.dropdown-menu'));
      menuItems = menu.queryAll(By.css('li'));
      const item: DebugElement = getItemByLabel('Open Application');
      expect(item).toBeFalsy();
    }));

    it('should call the delete modal open method', fakeAsync(()  => {
      const item: DebugElement = getItemByLabel('Delete');
      expect(item).toBeTruthy();
      item.query(By.css('a')).triggerEventHandler('click', new CustomEvent('click'));
      fixture.detectChanges();

      expect(component.openModal).toHaveBeenCalled();
    }));

    it('should call the delete service method when the modal event fires', fakeAsync(() => {
      const de: DebugElement = fixture.debugElement.query(By.directive(FakeDeleteDeploymentModal));
      expect(mockSvc.deleteDeployment).not.toHaveBeenCalled();
      de.componentInstance.deleteEvent.emit();
      expect(mockSvc.deleteDeployment).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
    }));

  });

  it('should not display inactive environments', fakeAsync(() => {
    active.next(false);
    fixture.detectChanges();

    expect(component.active).toBeFalsy();
  }));
});

describe('DeploymentCardComponent', () => {
  type Context = TestContext<DeploymentCardComponent, HostComponent>;
  let active: Subject<boolean>;
  let deleting: Subject<string> = new Subject<string>();
  let mockSvc: jasmine.SpyObj<DeploymentsService>;
  let mockStatusSvc: jasmine.SpyObj<DeploymentStatusService>;
  let mockStatus: Subject<Status> = new BehaviorSubject({ type: StatusType.WARN, message: 'warning message' });
  let notifications: any;
  let mockCpuData: Subject<CpuStat[]> = new BehaviorSubject([{ used: 1, quota: 5, timestamp: 1 }] as CpuStat[]);
  let mockMemoryData: Subject<MemoryStat[]> = new BehaviorSubject([{ used: 1, quota: 5, timestamp: 1 }] as MemoryStat[]);

  beforeEach(fakeAsync(() => {
    active = new BehaviorSubject<boolean>(true);
    mockSvc = initMockSvc();
    mockSvc.isApplicationDeployedInEnvironment.and.returnValue(active);
    mockSvc.getDeploymentCpuStat.and.returnValue(mockCpuData);
    mockSvc.getDeploymentMemoryStat.and.returnValue(mockMemoryData);
    mockSvc.deleteDeployment.and.returnValue(deleting);
    mockStatusSvc = createMock(DeploymentStatusService);
    mockStatusSvc.getDeploymentAggregateStatus.and.returnValue(mockStatus);
    notifications = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['message']);

    flush();
    flushMicrotasks();
  }));

  initContext(DeploymentCardComponent, HostComponent, {
    declarations: [
      DeploymentCardComponent,
      FakeDeploymentsDonutComponent,
      FakeDeploymentGraphLabelComponent,
      FakeDeploymentDetailsComponent,
      FakeDeploymentStatusIconComponent,
      FakeDeleteDeploymentModal
    ],
    imports: [
      BsDropdownModule.forRoot(),
      CollapseModule.forRoot(),
      ChartModule,
      ModalModule.forRoot()
    ],
    providers: [
      BsDropdownConfig,
      { provide: NotificationsService, useFactory: () => notifications },
      { provide: DeploymentsService, useFactory: () => mockSvc },
      { provide: DeploymentStatusService, useFactory: () => mockStatusSvc }
    ]
  },
    (component: DeploymentCardComponent) => {
      component.spaceId = 'mockSpaceId';
      component.applicationId = 'mockAppId';
      component.environment = 'mockEnvironment';
    });

  it('should be active', function(this: Context) {
    let detailsComponent = this.testedDirective;
    expect(detailsComponent.active).toBeTruthy();
  });

  describe('#delete', () => {
    it('should clear "deleting" flag when request completes successfully', function(this: Context) {
      expect(this.testedDirective.active).toBeTruthy();
      expect(this.testedDirective.deleting).toBeFalsy();

      this.testedDirective.delete();
      expect(this.testedDirective.active).toBeTruthy();
      expect(this.testedDirective.deleting).toBeTruthy();

      deleting.next('delete success');
      expect(this.testedDirective.active).toBeFalsy();
      expect(this.testedDirective.deleting).toBeFalsy();
    });

    it('should clear "deleting" flag when request completes with error', function(this: Context) {
      expect(this.testedDirective.active).toBeTruthy();
      expect(this.testedDirective.deleting).toBeFalsy();

      this.testedDirective.delete();
      expect(this.testedDirective.active).toBeTruthy();
      expect(this.testedDirective.deleting).toBeTruthy();

      deleting.error('delete failure');
      expect(this.testedDirective.active).toBeTruthy();
      expect(this.testedDirective.deleting).toBeFalsy();
    });
  });

  it('should set versionLabel from mockSvc.getVersion result', function(this: Context) {
    let de: DebugElement = this.fixture.debugElement.query(By.css('#versionLabel'));
    let el: HTMLElement = de.nativeElement;
    expect(mockSvc.getVersion).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
    expect(el.textContent).toEqual('1.2.3');
  });

  it('should invoke deployments service calls with the correct arguments', function(this: Context) {
    expect(mockSvc.isApplicationDeployedInEnvironment).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
    expect(mockSvc.getLogsUrl).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
    expect(mockSvc.getConsoleUrl).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
    expect(mockSvc.getAppUrl).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
  });

  it('should not display inactive environments', fakeAsync(function(this: Context) {
    active.next(false);
    this.detectChanges();

    expect(this.testedDirective.active).toBeFalsy();
  }));

  it('should set icon status from DeploymentStatusService aggregate', function(this: Context) {
    expect(mockStatusSvc.getDeploymentAggregateStatus).toHaveBeenCalledWith('mockSpaceId', 'mockEnvironment', 'mockAppId');
    expect(this.testedDirective.toolTip).toEqual('warning message');
    expect(this.testedDirective.iconClass).toEqual('pficon-warning-triangle-o');
    expect(this.testedDirective.cardStatusClass).toEqual('status-ribbon-warn');

    mockStatus.next({ type: StatusType.ERR, message: 'error message' });
    expect(this.testedDirective.toolTip).toEqual('error message');
    expect(this.testedDirective.iconClass).toEqual('pficon-error-circle-o');
    expect(this.testedDirective.cardStatusClass).toEqual('status-ribbon-err');

    mockStatus.next({ type: StatusType.OK, message: '' });
    expect(this.testedDirective.toolTip).toEqual(DeploymentCardComponent.OK_TOOLTIP);
    expect(this.testedDirective.iconClass).toEqual('pficon-ok');
    expect(this.testedDirective.cardStatusClass).toEqual('');
  });
});
