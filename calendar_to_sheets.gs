function export_gcal_to_gsheet(){
var mycal = "akhil.rs@xxxxxx.com";
var cal = CalendarApp.getCalendarById(mycal);
var events = cal.getEvents(new Date("February 17, 2020 00:00:00 CST"), new Date("February 22, 2020 23:59:59 CST"));

var sheet = SpreadsheetApp.getActiveSheet();
sheet.clearContents();  
var header = [["Event Title", "Event Description", "Event Start", "Event End", "Calculated Duration"]]
var range = sheet.getRange(1,1,1,5);
range.setValues(header);

  var sec=1000;
  var min=60*sec;
  var hour=60*min;
  var day=24*hour;
  
// Loop through all calendar events found and write them out starting on calulated ROW 2 (i+2)
for (var i=0;i<events.length;i++) {
  var row=i+2;
  var myformula_placeholder = '';
  var diff = events[i].getEndTime().valueOf() -events[i].getStartTime().valueOf();
  var days=Math.floor(diff/day);
  var hours=Math.floor(diff%day/hour);
  var minutes=Math.floor(diff%day%hour/min);
   var tim = "";
  if (hours>0)
  {
    tim = tim+hours+" Hour";
  }
  if (minutes>0)
  {
    if (hours>0)
    {
      tim = tim+" : ";
    }
    tim = tim+minutes+" Minutes";
  }
  var details=[[
    events[i].getTitle(), 
    events[i].getDescription(), 
    Utilities.formatDate(events[i].getStartTime(), "IST", "hh:mm a"), 
    Utilities.formatDate(events[i].getEndTime(), "IST", "hh:mm a"), 
    tim ]];

var range=sheet.getRange(row,1,1,5);
range.setValues(details);
//
//var cell=sheet.getRange(row,5);
//cell.setFormula('=(HOUR(' +events[i].getStartTime()+ ')+(MINUTE(C' +events[i].getStartTime()+ ')/60))-(HOUR(' +events[i].getEndTime()+ ')+(MINUTE(' +events[i].getEndTime()+ ')))');
//cell.setNumberFormat('.00');

}
}
