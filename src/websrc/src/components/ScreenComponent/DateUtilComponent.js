class DateUtilComponent {
  formatFromTo(from, to){
    if(from != undefined && from.length > 0) {
      from  = from.replace(/-/g,"/");

    }
    if(to != undefined && to.length > 0) {
      to  = to.replace(/-/g,"/");

    }
    var begin = new Date(from);
    var end = new Date(to);

    return begin.getMonth()+ "月" + begin.getDate() + "日" + begin.getHours() + ":" + begin.getMinutes() + " - " + end.getHours() + ":" + end.getMinutes();
  }
}

export default DateUtilComponent
