export interface CalendarType {
  formatYear: string;
  formatMonth: string;
  today: string;
  ago: string;
  after: string;
  oneAgo: string;
  oneAfter: string;
  month: {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;
    September: string;
    October: string;
    November: string;
    December: string;
  } & Record<string, any>;
  week: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  } & Record<string, any>;
  selfCustomized: {
    dayoff: string;
    payday: string;
    birthday: string;
    studyday: string;
  } & Record<string, any>;
}
