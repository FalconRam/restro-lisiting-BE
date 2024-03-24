# Restaurant Listing Backend Application

> Stack Used:

1.  Runtime - Nodejs
2.  ExpressJs
3.  Typescript
4.  NonRelational Database - MongoDB
5.  Authentication - JWT
6.  API documentation - Swagger(OpenAPI Specification)

## Database Schema

> **User**

All the User records stored here and the Business owner & Admin Role inherit the same User collection through Mongoose discriminator.

> **Restaurant Listing**

The Restaurant records are available which are created by Business owners and admin. Contains Restaurant information & Reviews.

> **Review**

A separate collection to track Reviews, so any one can retrieve their reviews and contains special field called status, which allows Business Owners to retrieve not responded Reviews by owners based on the Status.

## Project Setup (Locally)

1.  Clone the repo
    `git clone https://github.com/FalconRam/restro-lisiting-BE.git`
2.  Make sure you are on Main branch`git checkout main`
3.  Add .env file in root folder, which will contains MongoDB connection URL, JWT secret keys, Port number.
4.  `npm install`
5.  `npm run dev` (under the hood it will runs `npx nodemon index.ts`) - this will auto compile typescript file and start the server.
    Access all the api from the localhost base URL - http://localhost:5000
6. In postman_collection directory, all the Routes collection available along with swagger.json file.
7. Import all the collection and Interact with as per "API Functionalities" defined below.
8. Use Swagger-UI or swagger.json to import in postman to undestand, how is the request body & response body returned.

## Business Rule

> Business Owner

Role - _bo_

- They can create, update and read details of a Restaurant
- They can Respond to User Review on the owned Restaurant and update the responded reply.
- They can't delete Restaurant, User Review and can't create a review for the Restaurant.

> Admin

Role - _admin_

- Admin have all access like create, update, delete, read on any Restaurant and Review.
- Admin also can respond to review which User made, only if they created the Restaurant.

> User

Role - _user_

- User are only be able read Restaurant,
- Create, Update, Delete Review to any of the Restaurant which they made.

## API Functionalities

_Note: Refer Swagger UI - http://localhost:5000/docs where you can run api with sample payload after local server is up_

**All the Routes are Protected Routes**

**Auth Route**

> Post Method
1.  `/auth/create-user` - Create New User, role should be provided from one of - user, admin, bo.
2.  `/auth/signin` - Based on User credentials, User will be allowed to login and JWT access given.

_Access Token contains user id as '\_id', user email as 'emailId', user type as 'userType' (Based on login Credentials)_

**Note: For all the below Routing, get the accessToken from `/auth/signin` route and add in authorization headers in the format "Bearer accessToken"**

**Listing Route**

> Get Method
1.  `/listing` - Get Restaurant lists
> Post Method
2.  `/listing/create-restaurant` - This endpoint allows creating a new restaurant. Only users with the role of admin or business owner can access this endpoint.
> Patch Method
3.  `/listing` - Update details of a restaurant. This endpoint is accessible only by users with roles 'admin' or 'bo'. In which the Restaurant owned Users from roles bo, admin only can update. Update payload should be in right format as per schema.
> Delete Method
4.  `/listing` - Delete a restaurant with the restaurantId passed in query param. This route only can accessed by Admin.

**Review Route**

> Post Method
1.  `/review/create-review` - Admin & User can create a review on a restaurant
2.  `/review/reply` - Business Owner & Admin can Reply to a review only if they are owner of Restaurant
> Get Method
3.  `/review/getMyReviews` - Get reviews submitted by Logged in User session
4.  `/review/getPendingReviews` - Get pending reviews for a business owner to respond. Accessed only by Logged in Business Owner/Admin.
> Patch Method
5.  `/review` - Admin & User can update to their Review if they created it.
6.  `/review/reply-update` - Buisness Owner & Admin can update to their Reply to a review only if they are owner of Restaurant
> Delete Method
7.  `/review` - Delete a review by its reviewId and restaurantId. Admin can delete any review, but User can only delete their own review.
