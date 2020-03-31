// function to retrieve data from Sheet and add to Calendar
function simpleSheetsToCalendar() {
  
  // get spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('NAMEOFSHEET');
  
  // get the data from Google Sheet. The three numbers mean: current row, start with column one, end with column 6.
  var data = sheet.getRange(sheet.getLastRow(),1,1,6).getValues();
 
  //  create variables
  var title = data[0][0];
  var eventDesc = data[0][1];
  var eventLoca = data[0][2];
  var startDate = data[0][3];
  var endDate = data[0][4];
  var attendees = data[0][5];
 
  // get calendar
  var masterCal = CalendarApp.getCalendarById('PUTCALENDARIDHERE');
  
  // add to calendar
  masterCal.createEvent(title,
                        new Date(startDate),
                        new Date(endDate),
                        {location:eventLoca,description:eventDesc,guests:attendees,sendInvites:true});  
  
}
