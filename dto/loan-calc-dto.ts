export class LoanCalcDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static Income100Age17(): LoanCalcDto {
    return new LoanCalcDto(100, 0, 17, true, 1000, 12)
  }

  static Income20000Age30LoanPeriod6(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 30, true, 500, 6)
  }

  static Income20000Age30LoanPeriod12(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 30, true, 500, 12)
  }
}
