import { BaseElement, Clickable } from '../ui';
import { BasePage } from './base.page';
export declare abstract class AppPage extends BasePage {
    appTag: import("protractor/built/element").ElementFinder;
    mainNavBar: BaseElement;
    planTab: Clickable;
    backLogTab: Clickable;
    boardTab: Clickable;
    QueryTab: Clickable;
    /**
     * Extend this class, to describe Application Page(after logging in)
     *
     * @param {url} string URL where the extended page resides
     */
    constructor(url?: string);
    /**
     * Returns an instance of the BaseElement that can be found using
     * the {css} and contains the {text}.
     *
     * @param {ui} The Base Element Class e.g. Button, TextInput
     * @param {css}  Css within the appTag that identifies the element
     * @param {text} text in the element
     *
     */
    innerElement(ui: typeof BaseElement, css: string, text: string): BaseElement;
    ready(): Promise<void>;
    clickPlanTab(): Promise<void>;
    clickBacklogTab(): Promise<void>;
    clickBoardTab(): Promise<void>;
    clickQueryTab(): Promise<void>;
}
