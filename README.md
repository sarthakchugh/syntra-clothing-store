
# Syntra Clothing Store

Syntra is a full-featured clothing e-commerce web application built using the MERN stack. It offers a seamless shopping experience with a wide range of apparel and accessories for men, women, and children.




## Features

- Browse and search for clothing and accessories
- Secure authentication and user accounts
- Add items to cart and checkout
- Order management and tracking
- Payment Integration with PayPal
- Admin Dashboard for tracking stock of porducts
- Responsive and user-friendly UI


## Tech Stack

**Client:** React, Redux, TailwindCSS, React-Router

**Server:** Node, Express

**Database:** MongoDB, Mongoose (ODM)

**UI:** ShadCN, Recharts (Graphs)

**Image Management:** Cloudinary

**Authentication:** JWT





## Customer Journey

![Login/Register](https://github.com/user-attachments/assets/3211aab6-6d60-4111-875e-dbc277e1e0b9)

As soon as you open [Syntra](https://syntra.sarthakchugh.me) on your browser, you would land on the **Login/Register** page. If you're new, just register using your name, an email Id and password.

---

![App Dashboard](https://github.com/user-attachments/assets/aa7b4df5-aa94-433b-a447-b0c8df09b3ff)

Once logged in, you're greeted with a clean and minimalistic **Home page** with hero section, categories and brands.

---

![Products Page](https://github.com/user-attachments/assets/656ad65c-1fd3-4bbb-81a0-6ca7dc56d9d8)

Clicking on products on the navigation bar will take you to **Products page** which features apparels and accessories for Men, Women and Children.

---

![Product Filters](https://github.com/user-attachments/assets/e764181d-c5d1-4647-bae5-8311a7432c71)

Want to check a certain category or brand? There are **filters** to help you narrow down on the products you're interested in. 

---

![Search Page](https://github.com/user-attachments/assets/254285ec-71a0-41e8-83b2-259147e33540)

Overwhelmed with the exhaustive catalogue of products or not sure what you're looking for? Use the **Search** page to search for specific brands and products.

---

![Cart Panel](https://github.com/user-attachments/assets/96912a74-b8ca-46f4-a0e7-8a9540e1c237)

A stylish T-shirt or jeans caught your eye? Add them to the **Cart** panel.

---

![Checkout](https://github.com/user-attachments/assets/36046b6f-d2a6-4ae0-8f47-be1ec7c91997)

Add/Manage your addresses and verify your purchase before payment on the **Checkout** page.

---

![PayPal Payment](https://github.com/user-attachments/assets/c419c063-5023-4b00-9d99-49386ecc79f1)

Pay instantly without hassle with **PayPal**. 

---

![Order Confirmation](https://github.com/user-attachments/assets/1b2cdd3e-0454-44ed-a944-f0f6022c476d)

As soon as the payment is verified, you get the **order confirmation**. 

---

![Order History](https://github.com/user-attachments/assets/da4c9b02-73c0-494f-9039-66e44ef6da45)

Want to know the current status of your order? Check the order status and history from the **Order History** page.

---

![Order Details](https://github.com/user-attachments/assets/01a276b4-c51e-43ba-a9de-cde1c929a5b6)

Forgot what you ordered? No worries. Get detailed order summary from the **Order Details** modal.






## Admin Tasks

![Admin Dashboard](https://github.com/user-attachments/assets/9199d6d3-6e69-4d34-b3e0-08054130f25e)

**Admin Dashboard -** As an admin, you can keep track of the monthly sales, check which products are the most ordered, breakdown orders by categories and keep track of the products that are low on stock.

---

![Admin Products page](https://github.com/user-attachments/assets/ce9dedc8-375e-480c-80bd-e1f09658e141)

**Products Page -** Manage the products from the admin products page.

---

![Add Products](https://github.com/user-attachments/assets/862ad6d7-7d52-48e6-980f-07346e79f8bd)

**Add Products -** Add new products using the Add Products panel.

---

![Order History](https://github.com/user-attachments/assets/e99c4334-a25b-4d37-8ea7-7f0ed3a3ebde)

**Order History -** View orders from every customer in the Orders page.

---

![Order Status](https://github.com/user-attachments/assets/c8318fcb-822d-4a34-a825-baca5d1ab40a)

**Order Status -** View and Update order status for individual orders.





## Run Locally

Clone the project

```bash
  git clone https://github.com/sarthakchugh/syntra-clothing-store.git
```

Before following the next steps, please check the [environment variables](#environment-variables) required to run the project.

Go to the project directory

```bash
  cd syntra-clothing-store
```

Go to the server directory

```bash
  cd server
```

Install server dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

In a new terminal, navigate to the client directory

```bash
  cd client
```
Install server dependencies

```bash
  npm install
```
Start the client

```bash
  npm run dev
```
Navigate to the link in the terminal (http://localhost:5173)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server directory:

To use Mongo DB - 
`MONGODB_URI`

To link to client -
`APP_URL`

For PayPal integration - 
`CLIENT_ID`
`CLIENT_SECRET`

To use Cloudinary - 
`CLOUD_NAME`
`API_KEY`
`API_SECRET`

Add the following environment variables to your .env file in the client directory:

To link to server -
`VITE_API_URL`





## Feedback

If you liked this project, please star it on Github. If you have any feedback, please reach out to me at sar.chugh@gmail.com. 

