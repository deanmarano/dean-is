import Route from '@ember/routing/route';
import Life from 'dean-is/models/life';
/* global moment */

export default Route.extend({
  model() {
    return Life.create({
      name: 'Dean',
      birthdate: moment('1987-08-13'),
      events: [
        { date: moment('1990-10-05'), type: 'family', text: 'Kevin was born.' },
        { date: moment('1994-03-03'), type: 'family', text: '3N131 Sycamore house fire.' },
        { date: moment('1994-05-18'), type: 'family', text: 'Alex was born.' },

        // https://www.wikitree.com/wiki/McGowan-299
        // http://articles.chicagotribune.com/1997-07-30/news/9707300240_1_west-chicago-carol-stream-brother
        { date: moment('1997-07-27'), type: 'family', text: 'Auntie Anna died.' },
        // https://www.wikitree.com/wiki/Stedtefeld-6
        { date: moment('1997-11-08'), type: 'family', text: 'Nani died.' },
        { date: moment('2000-08-18'), type: 'family', text: 'Aunt  Sheri (Sharba) died.' },
        // MARANO, VINCENT F. was born 11 October 1937, received Social Security number 359-26-7598 (indicating Illinois) and, Death Master File says, died 19 November 2003 1497812
        { date: moment('2003-11-19'), type: 'family', text: 'Grandpa died.' },
        { date: moment('2005-10-18'), type: 'family', text: 'Chewy was born.'},
        { date: moment('2005-12-02'), type: 'family', text: 'Mom and Dad separate.'},
        { date: moment('2014-11-17'), type: 'family', text: 'Dad and Debi get married.'},
        { date: moment('2017-01-16'), type: 'family', text: 'Grandma died'},
        { date: moment('2019-12-31'), type: 'family', text: 'Asked Kelsey to marry me.'},
        { date: moment('2019-08-10'), type: 'family', text: 'Chewy died.'},
        { date: moment('2021-09-04'), type: 'family', text: 'Kelsey and I get married.'},
        { date: moment('2020-07-25'), type: 'family', text: 'Odie was born.'},

        { date: moment('2001-06-03'), type: 'education', text: 'Graudated from Benjamin Middle School' },
        { date: moment('2001-08-20'), type: 'education', text: 'Started St. Francis High School.' },
        { date: moment('2005-05-20'), type: 'education', text: 'Graudated from St. Francis High School.' },
        { date: moment('2005-08-18'), type: 'education', text: 'Started Hope College bachelors degree in biology and chemistry.' },
        { date: moment('2009-05-24'), type: 'education', text: 'Graduated Hope College bachelors degree in computer science.' },
        { date: moment('2011-09-05'), type: 'education', text: 'Started DePaul University masters degree in computer science with AI emphasis.' },
        { date: moment('2019-06-15'), type: 'education', text: 'Graduated DePaul University masters degree in computer science with AI emphasis.' },

        // https://www.google.com/maps/@41.9168864,-88.1297122,3a,75y,268h,90t/data=!3m7!1e1!3m5!1smD0vfkAGV7754h0baO9kJQ!2e0!6s%2F%2Fgeo2.ggpht.com%2Fcbk%3Fpanoid%3DmD0vfkAGV7754h0baO9kJQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D268.1987%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656!6m1!1e1
        { date: moment('1987-08-13'), type: 'life', text: 'Dean was born into 552 Haiawatha Dr., Carol Stream, IL.' },
        { date: moment('1993-11-03'), type: 'life', text: 'Moved to 3N131 Sycamore, West Chicago, IL.' },
        // http://www.hope.edu/student/residential/halls/cook.htm
        { date: moment('2007-08-25'), type: 'life', text: 'Moved to Cook Hall 105, 106 E. 13th St, Holland, MI.' },
        { date: moment('2008-05-28'), type: 'life', text: 'Moved to 1109 Mystic Ct, Carol Stream, IL.' },
        // http://www.hope.edu/student/residential/apartments/brumler.htm
        { date: moment('2008-08-25'), type: 'life', text: 'Moved to Brumler Apartment 8, 106 E. 13th St, Holland, MI.' },
        { date: moment('2009-05-25'), type: 'life', text: 'Moved to 3N131 Sycamore, West Chicago, IL.' },
        { date: moment('2011-08-01'), type: 'life', text: 'Moved to 1281 W. Westgate Terrace, Chicago, IL.' },
        { date: moment('2011-10-09'), type: 'life', text: 'Completed 2011 Chicago Marathon.' },
        { date: moment('2012-07-15'), type: 'life', text: 'Completed 2013 Racine Ironman 70.3.' },
        { date: moment('2012-07-31'), type: 'life', text: 'Moved to 3N131 Sycamore, West Chicago, IL.' },
        { date: moment('2012-09-01'), type: 'life', text: 'Moved to 2040 N. Racine Ave., Chicago, IL.' },
        { date: moment('2012-10-07'), type: 'life', text: 'Completed 2012 Chicago Marathon.' },
        { date: moment('2013-08-01'), type: 'life', text: 'Moved to 1008 W. Armitage Ave., Chicago, IL.' },
        { date: moment('2013-10-13'), type: 'life', text: 'Completed 2013 Chicago Marathon.' },
        { date: moment('2015-08-01'), type: 'life', text: 'Moved to 1730 N. Western Ave, Chicago, IL.' },
        { date: moment('2017-08-25'), type: 'life', text: 'Moved to 2140 N. Concord Pl, Chicago, IL.' },
        { date: moment('2017-09-14'), type: 'life', text: 'First date with Kelsey.' },
        { date: moment('2018-06-01'), type: 'life', text: 'Moved to 1730 W Thomas St, Chicago, IL.' },
        { date: moment('2020-04-10'), type: 'life', text: 'Bought home at 1211 Sigsbee St SE with Kelsey, Grand Rapids, MI.' },

        { date: moment('2008-05-05'), type: 'work', text: 'Started job at Hope Computer Information and Technology department.' },
        { date: moment('2008-05-15'), type: 'work', text: 'Started internship at Allstate as Systems Analyst.' },
        { date: moment('2008-08-20'), type: 'work', text: 'Finished internship at Allstate.' },
        { date: moment('2009-05-05'), type: 'work', text: 'Left job at Hope Computer Information and Technology department.' },
        { date: moment('2009-07-29'), type: 'work', text: 'Started at Computer System Innovations as Systems Analyst.' },
        { date: moment('2011-12-20'), type: 'work', text: 'Left job at Computer System Innovations.' },
        { date: moment('2012-01-16'), type: 'work', text: 'Started at Groupon as Software Engineer I.' },
        { date: moment('2015-11-16'), type: 'work', text: 'Left job at Groupon as Software Engineer III.' },
        { date: moment('2015-12-16'), type: 'work', text: 'Started job at eSpark Learning as Senior Software Engineer.' },
        { date: moment('2016-08-19'), type: 'work', text: 'Left job at eSpark Learning as Senior Software Engineer.' },
        { date: moment('2017-06-05'), type: 'work', text: 'Started job at BMW Technology as Developer Team Lead.' },
        { date: moment('2018-03-31'), type: 'work', text: 'Left job at BMW Technology as Developer Team Lead.' },
        { date: moment('2018-04-02'), type: 'work', text: 'Started job at Kin Insurance as Senior Software Engineer.' },
        { date: moment('2018-11-02'), type: 'work', text: 'Left job at Kin Insurance as Senior Software Engineer.' },
        { date: moment('2018-11-05'), type: 'work', text: 'Started job at Trice Imaging as Senior Software Engineer.' },

        { date: moment('1994-11-04'), type: 'world', text: 'Bill Clinton elected president of US.' },
        // https://en.wikipedia.org/wiki/Game_6_of_the_1998_NBA_Finals
        { date: moment('1997-06-14'), type: 'world', text: 'Bull repeat the three-peat, 6th NBA Championship win.' },
        { date: moment('2000-11-04'), type: 'world', text: 'George W. Bush elected president of US.' },
        { date: moment('2001-09-11'), type: 'world', text: '9/11 Terrorist Attacks.' },
        { date: moment('2008-11-04'), type: 'world', text: 'Barack Obama elected president of US.' },
        { date: moment('2016-11-03'), type: 'world', text: 'Cubs win World Series.' },
        { date: moment('2016-11-08'), type: 'world', text: 'Donald Trump elected president of US.' }
      ]
    });
  }
});
