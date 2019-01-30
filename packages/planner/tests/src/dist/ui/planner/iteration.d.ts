import * as ui from '../../ui';
export declare class Iteration extends ui.BaseElement {
    iterationDialog: ui.BaseElement;
    iterationName: ui.TextInput;
    parentIteration: ui.TextInput;
    parentDropdownList: ui.DropdownMenu;
    parentDropdown: ui.Dropdown;
    createIterationButton: ui.Button;
    datePickerDiv: ui.BaseElement;
    private showStartDateCalendar;
    private showEndDateCalendar;
    calendarDiv: ui.BaseElement;
    selectStartdate: ui.Clickable;
    selectEndDate: ui.Clickable;
    month: ui.Clickable;
    year: ui.Clickable;
    cancel: ui.Button;
    addNewIteration(iterationName: string, parentIteration?: string, withDates?: boolean): Promise<void>;
    editIteration(iterationName: string): Promise<void>;
    selectCalendarDate(): Promise<void>;
    getMonth(): Promise<String>;
    getYear(): Promise<String>;
    clickCreateIteration(): Promise<void>;
    getLastDayOfMonth(): Promise<String>;
    clickCancel(): Promise<void>;
}
