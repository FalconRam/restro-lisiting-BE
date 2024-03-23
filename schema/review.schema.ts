import { TypeOf, z as zod } from "zod";
import { ReviewType } from "../utils/types";

/* Create Review */
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateReviewRequest:
 *       type: object
 *       required:
 *         - review
 *         - rating
 *         - restaurantId
 *         - ownerId
 *         - reviewType
 *       properties:
 *         review:
 *           type: string
 *         rating:
 *           type: number
 *         restaurantId:
 *           type: string
 *         ownerId:
 *           type: string
 *         reviewType:
 *           type: string
 *         repliedTo:
 *           type: string
 *       example:
 *         review: "Food city is Madurai, semma sappadu"
 *         rating: 5
 *         restaurantId: "65fd255c18affdf45d849141"
 *         ownerId: "65fc5760a6ebc1c47bdb99ed"
 *         reviewType: "review"
 *         repliedTo: ""
 *     CreateReviewResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           example: {}
 *         message:
 *           type: string
 *           example: Thank You for the Review!
 *
 */

export const createReviewSchema = zod.object({
  body: zod.object({
    review: zod
      .string({ required_error: "Add your review" })
      .min(3, "Add some more content"),
    rating: zod.number({ required_error: "Rating is Required" }).lte(5),
    restaurantId: zod.string({ required_error: " RestaurantId is Required" }),
    ownerId: zod.string({ required_error: "Restaurant OwnerId is Required" }),
    reviewType: zod.nativeEnum(ReviewType),
    repliedTo: zod.string().optional(),
  }),
});

/* My Review */
/**
 * @openapi
 * components:
 *   schemas:
 *     MyReviewResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             myReviews:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *         message:
 *           type: string
 *       example:
 *         status: true
 *         data:
 *           myReviews:
 *             - _id: "65fdcee0a5035b763d686521"
 *               reviewerId: "65fd08f34fb8cbd5f05aa159"
 *               reviewerName: "Ram Vignesh M"
 *               review: "Food city is Madurai, semma sappadu"
 *               rating: 5
 *               status: "NOTREPLIED"
 *               restaurantId: "65fd255c18affdf45d849141"
 *               restaurantName: "Madurai Villas"
 *               ownerId: "65fc5760a6ebc1c47bdb99ed"
 *               reviewType: "review"
 *               repliedTo: ""
 *               ownerReply: []
 *               createdAt: "2024-03-22T18:33:04.560Z"
 *             - _id: "65feaceee8bf31b267b531ad"
 *               reviewerId: "65fd08f34fb8cbd5f05aa159"
 *               reviewerName: "Ram Vignesh M"
 *               review: "Food city is Madurai, semma sappadu"
 *               rating: 5
 *               status: "REPLIED"
 *               restaurantId: "65fd255c18affdf45d849141"
 *               restaurantName: "Madurai Villas"
 *               ownerId: "65fc5760a6ebc1c47bdb99ed"
 *               reviewType: "review"
 *               repliedTo: ""
 *               ownerReply:
 *                 - _id: "h32GjvMYCQ"
 *                   reply: "Thanks for your review Sir!"
 *                   createdAt: "2024-03-23T10:22:59.923Z"
 *               createdAt: "2024-03-23T10:20:30.916Z"
 *         message: Your reviews retrieved successfully!...
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         reviewerId:
 *           type: string
 *         reviewerName:
 *           type: string
 *         review:
 *           type: string
 *         rating:
 *           type: number
 *         status:
 *           type: string
 *         restaurantId:
 *           type: string
 *         restaurantName:
 *           type: string
 *         ownerId:
 *           type: string
 *         reviewType:
 *           type: string
 *         repliedTo:
 *           type: string
 *         ownerReply:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               reply:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "65fdcee0a5035b763d686521"
 *         reviewerId: "65fd08f34fb8cbd5f05aa159"
 *         reviewerName: "Ram Vignesh M"
 *         review: "Food city is Madurai, semma sappadu"
 *         rating: 5
 *         status: "NOTREPLIED"
 *         restaurantId: "65fd255c18affdf45d849141"
 *         restaurantName: "Madurai Villas"
 *         ownerId: "65fc5760a6ebc1c47bdb99ed"
 *         reviewType: "review"
 *         repliedTo: ""
 *         ownerReply: []
 *         createdAt: "2024-03-22T18:33:04.560Z"
 *
 */

/* Business Owner Pending Reviews */
/**
 * @openapi
 * components:
 *   schemas:
 *     BusinessOwnerPendingReviewResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             pendingReview:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *         message:
 *           type: string
 *       example:
 *         status: true
 *         data:
 *           pendingReview:
 *             - _id: "65fdcee0a5035b763d686521"
 *               reviewerId: "65fd08f34fb8cbd5f05aa159"
 *               reviewerName: "Ram Vignesh M"
 *               review: "Food city is Madurai, semma sappadu"
 *               rating: 5
 *               status: "NOTREPLIED"
 *               restaurantId: "65fd255c18affdf45d849141"
 *               restaurantName: "Madurai Villas"
 *               ownerId: "65fc5760a6ebc1c47bdb99ed"
 *               reviewType: "review"
 *               repliedTo: ""
 *               ownerReply: []
 *               createdAt: "2024-03-22T18:33:04.560Z"
 *               updatedAt: "2024-03-22T18:33:04.560Z"
 *             - _id: "65feaceee8bf31b267b531ad"
 *               reviewerId: "65fd08f34fb8cbd5f05aa159"
 *               reviewerName: "Ram Vignesh M"
 *               review: "Food city is Madurai, semma sappadu"
 *               rating: 5
 *               status: "NOTREPLIED"
 *               restaurantId: "65fd255c18affdf45d849141"
 *               restaurantName: "Madurai Villas"
 *               ownerId: "65fc5760a6ebc1c47bdb99ed"
 *               reviewType: "review"
 *               repliedTo: ""
 *               ownerReply: []
 *               createdAt: "2024-03-23T10:20:30.916Z"
 *               updatedAt: "2024-03-23T10:20:30.916Z"
 *         message: Success
 */

/*Business Owner Reply */
/**
 * @openapi
 * components:
 *   schemas:
 *     BusinessOwnerReplyRequestBody:
 *       type: object
 *       properties:
 *         reply:
 *           type: string
 *       example:
 *         reply: "Thanks for your review Sir!"
 *
 *     BusinessOwnerReplyResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             restaurantDetails:
 *               type: object
 *               properties:
 *                 contactInfo:
 *                   type: object
 *                   properties:
 *                     emailId:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                 address:
 *                   type: object
 *                   properties:
 *                     line_1:
 *                       type: string
 *                     street:
 *                       type: string
 *                     city:
 *                       type: string
 *                     pincode:
 *                       type: string
 *                     country:
 *                       type: string
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     onwerName:
 *                       type: string
 *                     ownerType:
 *                       type: string
 *                 _id:
 *                   type: string
 *                 restaurantName:
 *                   type: string
 *                 tableCapacity:
 *                   type: number
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 foodMenu:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       itemName:
 *                         type: string
 *                       itemPrice:
 *                         type: string
 *                 reviewsInfo:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       review:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       reviewerId:
 *                         type: string
 *                       reviewerName:
 *                         type: string
 *                       ownerReply:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             reply:
 *                               type: string
 *                             createdAt:
 *                               type: string
 *                       createdAt:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 __v:
 *                   type: number
 *             updatedReviewDetails:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 reviewerId:
 *                   type: string
 *                 reviewerName:
 *                   type: string
 *                 review:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 status:
 *                   type: string
 *                 restaurantId:
 *                   type: string
 *                 restaurantName:
 *                   type: string
 *                 ownerId:
 *                   type: string
 *                 reviewType:
 *                   type: string
 *                 repliedTo:
 *                   type: string
 *                 ownerReply:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       reply:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 __v:
 *                   type: number
 *         message:
 *           type: string
 *       example:
 *         status: true
 *         data:
 *           restaurantDetails:
 *             contactInfo:
 *               emailId: "maduraivillas@gmail.com"
 *               phoneNumber: "1234567890"
 *             address:
 *               line_1: "12"
 *               street: "Vizhakuthoon"
 *               city: "Madurai"
 *               pincode: "625001"
 *               country: "India"
 *             createdBy:
 *               _id: "65fc5760a6ebc1c47bdb99ed"
 *               onwerName: "BO"
 *               ownerType: "bo"
 *             _id: "65fd255c18affdf45d849141"
 *             restaurantName: "Madurai Villas"
 *             tableCapacity: 50
 *             images:
 *               - "https://example.com/image1.jpg"
 *             foodMenu:
 *               - _id: "SjelAZ0CSG"
 *                 itemName: "Mutton Biriyani"
 *                 itemPrice: "210.00"
 *               - _id: "PfCQ9PS09j"
 *                 itemName: "Chicken Biriyani"
 *                 itemPrice: "180.00"
 *             reviewsInfo:
 *               - _id: "65fdcee0a5035b763d686521"
 *                 review: "Food city is Madurai, semma sappadu"
 *                 rating: 5
 *                 reviewerId: "65fd08f34fb8cbd5f05aa159"
 *                 reviewerName: "Ram Vignesh M"
 *                 ownerReply: []
 *                 createdAt: "2024-03-22T18:33:04.610Z"
 *               - _id: "65feaceee8bf31b267b531ad"
 *                 review: "Food city is Madurai, semma sappadu"
 *                 rating: 5
 *                 reviewerId: "65fd08f34fb8cbd5f05aa159"
 *                 reviewerName: "Ram Vignesh M"
 *                 ownerReply:
 *                   - _id: "h32GjvMYCQ"
 *                     reply: "Thanks for your review Sir!"
 *                     createdAt: "2024-03-23T10:22:59.923Z"
 *                 createdAt: "2024-03-23T10:20:30.989Z"
 *             createdAt: "2024-03-22T06:29:48.830Z"
 *             updatedAt: "2024-03-23T10:20:30.993Z"
 *             __v: 0
 *           updatedReviewDetails:
 *             _id: "65feaceee8bf31b267b531ad"
 *             reviewerId: "65fd08f34fb8cbd5f05aa159"
 *             reviewerName: "Ram Vignesh M"
 *             review: "Food city is Madurai, semma sappadu"
 *             rating: 5
 *             status: "REPLIED"
 *             restaurantId: "65fd255c18affdf45d849141"
 *             restaurantName: "Madurai Villas"
 *             ownerId: "65fc5760a6ebc1c47bdb99ed"
 *             reviewType: "review"
 *             repliedTo: ""
 *             ownerReply:
 *               - _id: "h32GjvMYCQ"
 *                 reply: "Thanks for your review Sir!"
 *                 createdAt: "2024-03-23T10:22:59.923Z"
 *             createdAt: "2024-03-23T10:20:30.916Z"
 *             updatedAt: "2024-03-23T10:22:59.991Z"
 *             __v: 0
 *         message: "Replied successfully to User Review"
 *
 */

/* Delete Review */
/**
 * @openapi
 * components:
 *   schemas:
 *     ReviewDeletedResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         data:
 *           type: object
 *         message:
 *           type: string
 *       example:
 *         status: true
 *         data: {}
 *         message: Review deleted Successfully!...
 */

/**
 * Define the type for the input data
 */
export type CreateReviewInput = TypeOf<typeof createReviewSchema>["body"];
