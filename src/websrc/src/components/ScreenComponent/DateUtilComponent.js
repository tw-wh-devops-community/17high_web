class DateUtilComponent {
  formatFromTo(from, to){
    var begin = new Date(from);
    var end = new Date(to);

    return begin.getMonth()+ "月" + begin.getDate() + "日" + begin.getHours() + ":" + begin.getMinutes() + " - " + end.getHours() + ":" + end.getMinutes();
  }
}

export default DateUtilComponent
