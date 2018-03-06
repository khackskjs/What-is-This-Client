import * as rangeParser from 'parse-numeric-range';

export default class UserInput {
  public english:           String;
  public korean:            String;
  public dayOfStudy:        Number;       // 학습 일자 (ex: 4일자)
  public cardLevel:         Number;       // 현재 학습 레벨...
  public genDate:           Date;         // 카드 생성일
  public dayCountForReview: Number;       // 최근 실패일로 부터 계산해야 함. 실패 시 1로 변경됨
  // public reviewDates:       Array<Number>;  // 몇일 몇일째에 리뷰 하고 싶은지 변경 가능하기 위해. to Be
  public reviewDates:       String;  // 몇일 몇일째에 리뷰 하고 싶은지 변경 가능하기 위해. to Be
  public cardType:          Number;       // bitwise 연산시 나오는 값으로 연산, 1: MAIN_SENTENCE / 2: EXPRESSION / 4: PHRASAL_VERB
  public userId:            String;
  
  constructor() {
    this.dayOfStudy = 1;
    this.cardLevel = 1;
    this.genDate = new Date();
    this.dayCountForReview = 1;
    this.reviewDates = [1,2,4,8,16,32,64].join(',');
    this.cardType = 1;  // MAIN_SENTENCE
  }
  
  /**
   *  store review dates string as array of number
   * refer to 'parse-numeric-range' module
   * @param {String} arrayString - "4,6,8-10,12,14..16,18,20...23"
   * @returns {Boolean} - 형식이 맞지 않으면 false
   */
  public setReviewDates(arrayString: String): Boolean {
    try {
      var rdArray: Array<Number> = rangeParser.parse(arrayString);
      this.reviewDates = rdArray.join(',');
      return true;
    }
    catch(e) {
      console.warn('review dates format is wrong');
      return false;
    }
  }
}
