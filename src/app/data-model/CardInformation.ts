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
  // public reviewDates:       Array<Number>;  // 몇일 몇일째에 리뷰 하고 싶은지 변경 가능하기 위해. to Be
  public reviewDates:       String;       // 몇일 몇일째에 리뷰 하고 싶은지 변경 가능하기 위해. to Be
  public cardType:          Number;       // bitwise 연산시 나오는 값으로 연산, 1: MAIN_SENTENCE / 2: EXPRESSION / 4: PHRASAL_VERB
  public userId:            String;
  private id:               number;       // primary key of card TBL of DB
  
  /** For review */
  public reviewResult:      REVIEW_RESULT;// 당일에 복습 결과, 유저가 수동으로 업데이트 하지 않으면, 일자 변경될때 Server가 자동으로 업데이트 할 것
  public referenceDayCount: Number;       // 해당 숫자를 기준으로, level을 고려해서 다음복습일자(nextReviewDayCount)를 계산하면 됨 ex: 카드 등록 or 복습 실패 시, UserInformation.reviewDayCount 값을 가짐
  public nextReviewDayCount:Number;       // 다음번 복습 예정 일차. nextReviewDayCount <= UserInformation.reviewDayCount 경우, 복습하게 됨

  // todo: 리뷰 결과를 이용해서 뭘 많이 틀렸는지 등을 뽑아 낼 수 있음

  get DBID() {
    return this.id;
  }

  constructor() {
    this.dayOfStudy = 1;
    this.cardLevel = 1;
    this.genDate = new Date();
    this.reviewDates = [1,2,4,8,16,32,64].join(',');
    this.cardType = 1;  // MAIN_SENTENCE
    this.reviewResult = REVIEW_RESULT.NONE;
    // this.referenceDayCount = 1;   // 1을 설정하게 되면, 무조건 review 를 시작하고, 실패시 재등록을 하게 됨
  }
  
  /**
   * 
   * @param {JSON} ci - cardInfo
   * @param {Number} ci.cardLevel
   * @param {Number} ci.cardType
   * @param {Number} ci.dayOfStudy
   * @param {String} ci.english
   * @param {String} ci.genDate
   * @param {Number} ci.id
   * @param {String} ci.korean
   * @param {String} ci.reviewDates
   * @param {String} ci.userId
   * @param {String} ci.nextReviewDayCount
   */
  public static parseCardInfo(ci) {
    let newCI = new CardInformation();
    newCI.cardLevel         = ci.cardLevel;
    newCI.cardType          = ci.cardType;
    newCI.dayOfStudy        = ci.dayOfStudy;
    newCI.english           = ci.english;
    newCI.genDate           = ci.genDate;
    // newCI.id = ci.id;
    newCI.korean            = ci.korean;
    newCI.reviewDates       = ci.reviewDates;
    newCI.userId            = ci.userId;
    newCI.nextReviewDayCount= ci.nextReviewDayCount;
    newCI.reviewResult      = ci.reviewResult;
    newCI.referenceDayCount = ci.referenceDayCount;
    newCI.id                = ci.id;
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