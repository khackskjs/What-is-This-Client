import * as rangeParser from 'parse-numeric-range';

export enum CARD_COLOR {
  PASS = 'blue',
  FAIL = 'yello',
  NONE = 'white'
}

export enum REVIEW_RESULT {
  NONE = 0,
  PASS,
  FAIL,
}

export class CardInformation {
  public english:           String;
  public korean:            String;
  public dayOfStudy:        Number;       // 학습 일자 (ex: 4일자)
  public cardLevel:         Number;       // 현재 학습 레벨...
  public genDate:           Date;         // 카드 생성일
  public dayCountForReview: Number;       // 최근 실패일로 부터 계산해야 함. 실패 시 1로 변경됨
  // public reviewDates:       Array<Number>;  // 몇일 몇일째에 리뷰 하고 싶은지 변경 가능하기 위해. to Be
  public reviewDates:       String;       // 몇일 몇일째에 리뷰 하고 싶은지 변경 가능하기 위해. to Be
  public cardType:          Number;       // bitwise 연산시 나오는 값으로 연산, 1: MAIN_SENTENCE / 2: EXPRESSION / 4: PHRASAL_VERB
  public userId:            String;
  public nextReviewDayCount:Number;       // 다음번 복습 예정 일차. <= UserInformation.reviewDayCount 경우, 복습하게 됨
  
  /** For review */
  public reviewResult:          REVIEW_RESULT;  // 최근 복습 결과


  // todo: 리뷰 결과를 이용해서 뭘 많이 틀렸는지 등을 뽑아 낼 수 있음

  constructor() {
    this.dayOfStudy = 1;
    this.cardLevel = 1;
    this.genDate = new Date();
    this.dayCountForReview = 1;
    this.reviewDates = [1,2,4,8,16,32,64].join(',');
    this.cardType = 1;  // MAIN_SENTENCE
    this.reviewResult = REVIEW_RESULT.NONE;
  }
  
  /**
   * 
   * @param {JSON} ci - cardInfo
   * @param {Number} ci.cardLevel
   * @param {Number} ci.cardType
   * @param {Number} ci.dayCountForReview
   * @param {Number} ci.dayOfStudy
   * @param {String} ci.english
   * @param {String} ci.genDate
   * @param {Number} ci.id
   * @param {String} ci.korean
   * @param {String} ci.reviewDates
   * @param {String} ci.userId
   */
  public static parseCardInfo(ci) {
    let newCI = new CardInformation();
    newCI.cardLevel = ci.cardLevel;
    newCI.cardType = ci.cardType;
    newCI.dayCountForReview = ci.dayCountForReview;
    newCI.dayOfStudy = ci.dayOfStudy;
    newCI.english = ci.english;
    newCI.genDate = ci.genDate;
    // newCI.id = ci.id;
    newCI.korean = ci.korean;
    newCI.reviewDates = ci.reviewDates;
    newCI.userId = ci.userId;
    newCI.reviewResult = ci.reviewResult;
    return newCI;
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