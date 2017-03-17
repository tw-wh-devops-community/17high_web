class DateUtilComponent {

  formatFromTo(from, to) {
    function single2duble(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }

    if (from != undefined && from.length > 0) {
      from = from.replace(/-/g, "/");

    }
    if (to != undefined && to.length > 0) {
      to = to.replace(/-/g, "/");

    }
    var begin = new Date(from);
    var end = new Date(to);

    var fromMouth = begin.getMonth();
    var fromDay = begin.getDate();

    var toMouth = end.getMonth();
    var toDay = end.getDate();
    var formatBuilder = single2duble(fromMouth) + "月" + single2duble(fromDay) + "日" + single2duble(begin.getHours()) +
      ":" + single2duble(begin.getMinutes()) + " - ";

    var toHourMinuteFormat = single2duble(end.getHours()) + ":" + single2duble(end.getMinutes());
    if(fromMouth == toMouth) {
      if(toDay == fromDay) {
        return formatBuilder + toHourMinuteFormat;
      }else{
        return formatBuilder + single2duble(toDay) +"日" + toHourMinuteFormat;
      }
    }else{
      return formatBuilder + single2duble(fromMouth) + "月" + single2duble(fromDay) + "日" + toHourMinuteFormat;
    }
  }
}

export default DateUtilComponent
