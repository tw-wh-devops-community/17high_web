class DateUtilComponent {

  formatFromTo(from, to) {
    function single2double(num) {
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
    let begin = new Date(from);
    let end = new Date(to);

    let fromMouth = begin.getMonth() + 1;
    let fromDay = begin.getDate();

    let toMouth = end.getMonth() + 1;
    let toDay = end.getDate();
    let formatBuilder = `${single2double(fromMouth)}月${single2double(fromDay)}日  ${single2double(begin.getHours())}:${single2double(begin.getMinutes())}-`;
    let toHourMinuteFormat = single2double(end.getHours()) + ":" + single2double(end.getMinutes());
    if(fromMouth == toMouth) {
      if(toDay == fromDay) {
        return formatBuilder + toHourMinuteFormat;
      }else{
        return formatBuilder + single2double(toDay) +"日" + toHourMinuteFormat;
      }
    }else{
      return formatBuilder + single2double(fromMouth) + "月" + single2double(fromDay) + "日" + toHourMinuteFormat;
    }
  }
}

export default DateUtilComponent;
