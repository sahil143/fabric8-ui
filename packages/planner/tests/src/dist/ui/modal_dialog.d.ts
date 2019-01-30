import { ElementFinder } from 'protractor';
import * as ui from '../ui';
import { BaseElement } from './base.element';
export declare class ModalDialog extends BaseElement {
    content: ui.BaseElement;
    footer: ui.BaseElement;
    confirm: ui.Clickable;
    constructor(element: ElementFinder, name?: string);
    ready(): Promise<void>;
    open(): Promise<any>;
    clickConfirmButton(): Promise<void>;
}
