| Scenario Name                                                             | Method | Expected Status  |
| ------------------------------------------------------------------------- | ------ | ---------------- |
| Positive: Update order with valid id = 1 + valid api_key                  | PUT    | 200 OK           |
| Positive: Update order with valid id = 2 + valid api_key                  | PUT    | 200 OK           |
| Positive: Update order with valid id = 3 + valid api_key                  | PUT    | 200 OK           |
| Negative: Update order with invalid api_key = 123                         | PUT    | 401 Unauthorized |
| Negative: Update order with invalid api_key = 123456789012345a            | PUT    | 401 Unauthorized |
| Negative: Update order with invalid "id": a                               | PUT    | 400 Bad Request  |
| Positive: Delete order with valid ID = 4                                  | DELETE | 204 No content   |
| Positive: Delete order with valid ID = 5                                  | DELETE | 204 No content   |
| Positive: Delete order with valid ID = 6                                  | DELETE | 204 No content   |
| Negative: Delete order with invalid api_key = 123                         | DELETE | 401 Unauthorized |
| Negative: Delete order with invalid api_key = 123456789012345b            | DELETE | 401 Unauthorized |
| Negative: Delete order with invalid api_key = x                           | DELETE | 401 Unauthorized |
| Positive: Get order with valid username: username1, password: Password123 | GET    | 200 OK           |
| Positive: Get order with valid username: username2, password: Hello123    | GET    | 200 OK           |
| Positive: Get order with valid username: username3, password: Welcome01   | GET    | 200 OK           |
| Negative: Get order with valid username: username4, missing password      | GET    | 500 Undocumented |
| Negative: Get order with empty username and password                      | GET    | 500 Undocumented |
| Negative: Get order with empty username, valid password: Valid123         | GET    | 500 Undocumented |

| Scenario Name                                                                   | Method | Expected Status |
| ------------------------------------------------------------------------------- | ------ | --------------- |
| Positive: riskDecision is negative for 17 year-old with income: 100             | POST   | 200 OK          |
| Positive: risk level is "Very High Risk" for 17 year-old with income: 100       | POST   | 200 OK          |
| Negative: income is 0                                                           | POST   | 400 Bad Request |
| Negative: income is negative (-200)                                             | POST   | 400 Bad Request |
| Positive: riskPeriods is [6, 9, 12] and riskDecision is positive                | POST   | 200 OK          |
| Positive: riskLevel is Medium Risk for Income: 20000, Age: 30 and LoanPeriod: 6 | POST   | 200 OK          |
| Negative: Debt is negative (-500)                                               | POST   | 400 Bad Request |
| Negative: loan amount is 0                                                      | POST   | 400 Bad Request |
| Positive: riskScore is 2.0375 for Income:20000, Age:30, LoanPeriod: 12          | POST   | 200 OK          |
| Positive: riskLevel is Low Risk for Income:20000, Age:30, LoanPeriod: 12        | POST   | 200 OK          |
| Negative: loan amount is negative (-150)                                        | POST   | 400 Bad Request |
| Negative: loan period is negative (-1)                                          | POST   | 400 Bad Request |
