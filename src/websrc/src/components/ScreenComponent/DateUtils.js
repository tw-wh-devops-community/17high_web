class DateUtils {
  static formatFromTo(fromParam, toParam) {
    let from = fromParam;
    let to = toParam;
    function single2double(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    }
    if (from !== undefined && from.length > 0) {
      from = from.replace(/-/g, '/');
    }
    if (to !== undefined && to.length > 0) {
      to = to.replace(/-/g, '/');
    }
    const begin = new Date(from);
    const end = new Date(to);
    const fromMouth = begin.getMonth() + 1;
    const fromDay = begin.getDate();
    const toMouth = end.getMonth() + 1;
    const toDay = end.getDate();
    const formatBuilder = `${single2double(fromMouth)}月${single2double(fromDay)}日${single2double(begin.getHours())}:${single2double(begin.getMinutes())} - `;
    const toHourMinuteFormat = `${single2double(end.getHours())}:${single2double(end.getMinutes())}`;
    if (fromMouth === toMouth) {
      if (toDay === fromDay) {
        return formatBuilder + toHourMinuteFormat;
      }
      return `${formatBuilder + single2double(toDay)}日${toHourMinuteFormat}`;
    }
    return `${formatBuilder} ${toHourMinuteFormat}`;
  }
}

export default DateUtils;
