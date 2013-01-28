var relativeDate = (function(undefined){

  var SECOND = 1000,
      MINUTE = 60 * SECOND,
      HOUR = 60 * MINUTE,
      DAY = 24 * HOUR,
      WEEK = 7 * DAY,
      YEAR = DAY * 365,
      MONTH = YEAR / 12;

  var formats = [
    [ 0.7 * MINUTE, 'gerade jetzt' ],
    [ 1.5 * MINUTE, 'vor einer Minute' ],
    [ 60 * MINUTE, 'Minuten', MINUTE ],
    [ 1.5 * HOUR, 'einer Stunde' ],
    [ DAY, 'Stunden', HOUR ],
    [ 2 * DAY, 'gestern' ],
    [ 7 * DAY, 'Tagen', DAY ],
    [ 1.5 * WEEK, 'vor einer WOche'],
    [ MONTH, 'Wochen', WEEK ],
    [ 1.5 * MONTH, 'vor einem Monat' ],
    [ YEAR, 'Monat', MONTH ],
    [ 1.5 * YEAR, 'vor einem Jahr' ],
    [ Number.MAX_VALUE, 'Jahren', YEAR ]
  ];

  function relativeDate(input, reference){
    !reference && ( reference = (new Date).getTime() );
    reference instanceof Date && ( reference = reference.getTime() );
    input instanceof Date && ( input = input.getTime() );

    var delta = reference - input,
        format, i, len;

    for(i = -1, len=formats.length; ++i < len; ){
      format = formats[i];
      if(delta < format[0]){
        return format[2] == undefined ? format[1] : 'vor ' + Math.round(delta/format[2]) + ' ' + format[1];
      }
    };
  }

  return relativeDate;

})();

if(typeof module != 'undefined' && module.exports){
  module.exports = relativeDate;
}