# Wallet Microservice

This microservice is designed to manage user wallet data efficiently, providing essential functionalities for handling balances and transactions. Built using Node.js with the Nest.js framework and TypeScript, it offers the following capabilities:

## API Endpoints

### 1. GET /balance
- **Retrieves the current balance of a user.**
- Input: `user_id` (integer)
- Output: JSON object containing the user's balance.

### 2. POST /money
- **Allows addition or subtraction of money from a user's wallet.**
- Input: JSON payload with `user_id` (integer) and `amount` (integer; negative for deductions).
- Output: JSON object with the transaction reference ID.

## Technical Features

### Database Interaction
- **Utilizes PostgreSQL or MongoDB for data persistence.**
- **Implements a well-designed database schema to efficiently manage user wallet data.**

### Testing
- **Incorporates comprehensive test cases to ensure service reliability and functionality.**

### Logging
- **Logs all transactions with sufficient detail for auditing purposes.**

### Daily Totals
- **Calculates and logs the total amount of transactions processed each day, providing insights into service activity.**

## Additional Considerations

### Data Handling
- **Utilizes appropriate field types in the database to match input/output specifications, ensuring data consistency and integrity.**

### Containerization and Communication
- **Can be containerized using Docker for easy deployment and scalability.**
- **Supports communication protocols beyond REST, such as gRPC to enhance interoperability with other microservices.**

