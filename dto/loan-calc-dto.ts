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

  static requestBodyFromExample1(): LoanCalcDto {
    return new LoanCalcDto(100, 0, 17, true, 1000, 12)
  }

  static requestBodyFromExample1withoutAge(): LoanCalcDto {
    return new LoanCalcDto(100, 0, undefined, true, 1000, 12)
  }
  static requestBodyFromExample1withIncomeAsString(): LoanCalcDto {
    return new LoanCalcDto('100', 0, undefined, true, 1000, 12)
  }
  static requestBodyFromExample2(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 30, true, 500, 6)
  }
  static requestBodyFromExample2withLoanPeriodEmpty(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 30, true, 500)
  }
  static requestBodyFromExample2withEmployedAsString(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 30, 'no', 500, 6)
  }
  static requestBodyFromExample3(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 30, true, 500, 12)
  }
  static requestBodyFromExample3withDebtBoolean(): LoanCalcDto {
    return new LoanCalcDto(20000, false, 30, true, 500, 12)
  }
  static requestBodyFromExample3withAgeString(): LoanCalcDto {
    return new LoanCalcDto(20000, 0, 'thirty', true, 500, 12)
  }
}
