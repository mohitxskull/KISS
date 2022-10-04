const CalcAgo = (MS: number) => {
  const ms = Date.now() - MS;
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  let Res = '';

  if (days > 0) {
    Res += `${days} Day`;
  }
  if (hours > 0) {
    Res += ` ${hours} Hour`;
  }
  if (minutes > 0) {
    Res += ` ${minutes} Min`;
  }

  if (minutes < 1) {
    Res += ` ${sec} Sec`;
  }

  Res += ' Ago';
  return Res;
};

export default CalcAgo;
