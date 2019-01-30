"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
    constructor() {
        this['areaTitle1'] = '/' + process.env.SPACE_NAME_SCRUM + '/Area_6';
        this['areaTitle2'] = '/' + process.env.SPACE_NAME_SCRUM + '/Area_7';
        this['childType'] = 'Epic';
        this['commentCollaboratorTest'] = 'Work Item 1';
        this['dropdownareaTitle1'] = 'Area_6';
        this['dropdownareaTitle2'] = 'Area_7';
        this['dropdownIteration1'] = 'Iteration_1/Iteration1_1';
        this['dropdownIteration_2'] = 'Iteration_2';
        this['dropdownIteration2'] = 'Iteration_1';
        this['filterLabel'] = 'state: Closed';
        this['group1'] = 'Work Items';
        this['group2'] = 'Work Items';
        this['group3'] = 'Work Items';
        this['iteration1'] = '/' + process.env.SPACE_NAME_SCRUM + '/Iteration_1/Iteration1_1';
        this['iteration2'] = '/' + process.env.SPACE_NAME_SCRUM + '/Iteration_2';
        this['newIteration'] = 'new Iteration';
        this['newIteration1'] = 'new Iteration 1';
        this['parentIteration'] = '/' + process.env.SPACE_NAME_SCRUM + '/Iteration_2';
        this['rootIteration'] = '/' + process.env.SPACE_NAME_SCRUM;
        this['stateOpen'] = 'Open';
        this['stateNew'] = 'New';
        this['stateClosed'] = 'Closed';
        this['stateInProgress'] = 'In Progress';
        this['stateResolved'] = 'Resolved';
        this['type'] = ' Defect';
        this['typeIssue'] = 'Defect';
        // Required since we need 2 users. Do not remove
        this['user2'] = process.env.USER_FULLNAME;
        this['Workitem_Title_4'] = '4 - Workitem_Title_4';
        this['Workitem_Title_3'] = '3 - Workitem_Title_3';
        this['workitem'] = { title: 'new detail workItem', type: 'Task' };
        this['workItemTypeFilter'] = 'workitemtype: Defect';
        this['user_avatar'] = 'https=//www.gravatar.com/avatar/f56b4884b4041f14b13d919008fd7d44.jpg&s=25';
    }
}
exports.Constants = Constants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3VwcG9ydC9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLFNBQVM7SUFBdEI7UUFDRSxrQkFBWSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUM5RCxrQkFBWSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUM5RCxpQkFBVyxHQUFHLE1BQU0sQ0FBQztRQUNyQiwrQkFBeUIsR0FBRyxhQUFhLENBQUM7UUFDMUMsMEJBQW9CLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLDBCQUFvQixHQUFHLFFBQVEsQ0FBQztRQUNoQywwQkFBb0IsR0FBRywwQkFBMEIsQ0FBQztRQUNsRCwyQkFBcUIsR0FBRyxhQUFhLENBQUM7UUFDdEMsMEJBQW9CLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLG1CQUFhLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLGNBQVEsR0FBRyxZQUFZLENBQUM7UUFDeEIsY0FBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixjQUFRLEdBQUcsWUFBWSxDQUFDO1FBQ3hCLGtCQUFZLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7UUFDaEYsa0JBQVksR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDbkUsb0JBQWMsR0FBRyxlQUFlLENBQUM7UUFDakMscUJBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUNwQyx1QkFBaUIsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDeEUscUJBQWUsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNyRCxpQkFBVyxHQUFHLE1BQU0sQ0FBQztRQUNyQixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixtQkFBYSxHQUFHLFFBQVEsQ0FBQztRQUN6Qix1QkFBaUIsR0FBRyxhQUFhLENBQUM7UUFDbEMscUJBQWUsR0FBRyxVQUFVLENBQUM7UUFDN0IsWUFBTSxHQUFHLFNBQVMsQ0FBQztRQUNuQixpQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixnREFBZ0Q7UUFDaEQsYUFBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3BDLHdCQUFrQixHQUFHLHNCQUFzQixDQUFDO1FBQzVDLHdCQUFrQixHQUFHLHNCQUFzQixDQUFDO1FBQzVDLGdCQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzVELDBCQUFvQixHQUFHLHNCQUFzQixDQUFDO1FBQzlDLG1CQUFhLEdBQUcsMkVBQTJFLENBQUM7SUFDOUYsQ0FBQztDQUFBO0FBbENELDhCQWtDQyJ9