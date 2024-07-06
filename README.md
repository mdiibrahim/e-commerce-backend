# E-commerce Backend

Develop a TypeScript-based Express API with MongoDB using Mongoose for managing e-commerce products and orders.
_Key features include:_

## Product Management:

- Create, retrieve, update, searching and delete products.

## Order Management:

- Create orders and get orders by email.
- Adjust product inventory on order creation.

and Zod for data validation

## Running the Application Locally

Follow these steps to set up and run the application on your local machine:

### Prerequisites

Ensure you have the following software installed on your system:

- Node.js
- MongoDB (localhost or a MongoDB Atlas)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/mdiibrahim/e-commerce-backend.git
   cd e-commerce-backend

   ```

2. **Install Dependencies**

   ```sh
   npm install

   ```

3. **Environment Variables**
   Create a '.env' file in the root directory and add the following environment variables:

   ```sh
   PORT=5000
   DATABASE_URL=<your-mongodb-connection-string>
   NODE_ENV=development

   ```

## Running the Application

1. **Ensure the MongoDB connection**
2. **Run the Server**
   ```sh
   npm run start:dev
   ```

Now, you can access:
The order route is: http://localhost:5000/api/orders
The product route is: http://localhost:5000/api/products
