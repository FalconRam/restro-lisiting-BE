import { TypeOf, z as zod } from "zod";

/* Create Restaurant */
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateRestaurantListingInput:
 *       type: object
 *       required:
 *         - restaurantName
 *         - contactInfo
 *         - address
 *       properties:
 *         restaurantName:
 *           type: string
 *           minLength: 3
 *           example: Example Restaurant
 *         contactInfo:
 *           type: object
 *           properties:
 *             emailId:
 *               type: string
 *               format: email
 *               example: restaurant@gmail.com
 *             phoneNumber:
 *               type: string
 *               minLength: 10
 *               maxLength: 10
 *               example: 1234567890
 *         address:
 *           type: object
 *           required:
 *             - city
 *             - pincode
 *             - country
 *           properties:
 *             line_1:
 *               type: string
 *               example: 123 Main Street
 *             street:
 *               type: string
 *               example: Downtown
 *             city:
 *               type: string
 *               example: City
 *             pincode:
 *               type: string
 *               minLength: 6
 *               maxLength: 6
 *               example: 123456
 *             country:
 *               type: string
 *               example: Country
 *         tableCapacity:
 *           type: integer
 *           example: 50
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://example.com/image1.jpg"
 *         foodMenu:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: Burger
 *               itemPrice:
 *                 type: string
 *                 example: 150.00
 *
 *     CreateRestaurantListingResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65fe79b1b576257cde2d913e"
 *         restaurantName:
 *           type: string
 *           example: "Example Restaurant"
 *         contactInfo:
 *           type: object
 *           properties:
 *             emailId:
 *               type: string
 *               example: "restaurant@gmail.com"
 *             phoneNumber:
 *               type: string
 *               example: "1234567890"
 *         address:
 *           type: object
 *           properties:
 *             line_1:
 *               type: string
 *               example: "123 Main Street"
 *             street:
 *               type: string
 *               example: "Downtown"
 *             city:
 *               type: string
 *               example: "City"
 *             pincode:
 *               type: string
 *               example: "123456"
 *             country:
 *               type: string
 *               example: "Country"
 *         tableCapacity:
 *           type: integer
 *           example: 50
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://example.com/image1.jpg"
 *         foodMenu:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: "Burger"
 *               itemPrice:
 *                 type: string
 *                 example: "150.00"
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             onwerName:
 *               type: string
 *               example: "Owner Name"
 *             ownerType:
 *               type: string
 *               example: "bo"
 *         reviewsInfo:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "1234567890"
 *               review:
 *                 type: string
 *                 example: "Great restaurant!"
 *               rating:
 *                 type: number
 *                 example: 5
 *               reviewerId:
 *                 type: string
 *                 example: "987654321"
 *               reviewerName:
 *                 type: string
 *                 example: "Reviewer Name"
 *               ownerReply:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "1234567890"
 *                     reply:
 *                       type: string
 *                       example: "Thank you for your review!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-23T06:21:36.315Z"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-23T06:21:36.315Z"
 */

export const createRestaurantSchema = zod.object({
  body: zod.object({
    restaurantName: zod
      .string({ required_error: "Restaurant Name is required" })
      .min(3, "Minimum 3 characters Required"),
    contactInfo: zod.object({
      emailId: zod
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      phoneNumber: zod.string().length(10, "Phone Number should be 10 digits"),
    }),
    tableCapacity: zod.number(),
    address: zod.object({
      line_1: zod.string(),
      street: zod.string(),
      city: zod.string({ required_error: "City is required" }),
      pincode: zod
        .string({ required_error: "Pincode is required" })
        .length(6, "Pincode should be 6 digits"),
      country: zod.string({ required_error: "Country is required" }),
    }),
    images: zod.array(zod.string()).optional(),
    foodMenu: zod
      .array(
        zod.object({
          itemName: zod.string().min(1),
          itemPrice: zod.string(),
        })
      )
      .optional(),
  }),
});

/* Update Restaurant */
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateRestaurantInput:
 *       type: object
 *       properties:
 *         restaurantName:
 *           type: string
 *           minLength: 3
 *           example: "Updated Restaurant"
 *         contactInfo:
 *           type: object
 *           properties:
 *             emailId:
 *               type: string
 *               format: email
 *               example: "updated.restaurant@gmail.com"
 *             phoneNumber:
 *               type: string
 *               minLength: 10
 *               maxLength: 10
 *               example: "1234567890"
 *         address:
 *           type: object
 *           properties:
 *             line_1:
 *               type: string
 *               example: "123 Updated Main Street"
 *             street:
 *               type: string
 *               example: "Updated Downtown"
 *             city:
 *               type: string
 *               example: "Updated City"
 *             pincode:
 *               type: string
 *               minLength: 6
 *               maxLength: 6
 *               example: "654321"
 *             country:
 *               type: string
 *               example: "Updated Country"
 *         tableCapacity:
 *           type: integer
 *           example: 100
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: ["updated_image1.jpg", "updated_image2.jpg"]
 *         foodMenu:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: "Updated Burger"
 *               itemPrice:
 *                 type: string
 *                 example: "$7.99"
 *     UpdateRestaurantResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65fe79b1b576257cde2d913e"
 *         restaurantName:
 *           type: string
 *           example: "Updated Restaurant"
 *         contactInfo:
 *           type: object
 *           properties:
 *             emailId:
 *               type: string
 *               example: "Updated.restaurant@gmail.com"
 *             phoneNumber:
 *               type: string
 *               example: "1234567890"
 *         address:
 *           type: object
 *           properties:
 *             line_1:
 *               type: string
 *               example: "Updated 123 Main Street"
 *             street:
 *               type: string
 *               example: "Updated Downtown"
 *             city:
 *               type: string
 *               example: "Updated City"
 *             pincode:
 *               type: string
 *               example: "Updated 123456"
 *             country:
 *               type: string
 *               example: "Updated Country"
 *         tableCapacity:
 *           type: integer
 *           example: 50
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://example.com/Updatedimage1.jpg"
 *         foodMenu:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: "Updated Burger"
 *               itemPrice:
 *                 type: string
 *                 example: "150.00"
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             onwerName:
 *               type: string
 *               example: "Owner Name"
 *             ownerType:
 *               type: string
 *               example: "bo"
 *         reviewsInfo:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "1234567890"
 *               review:
 *                 type: string
 *                 example: "Great restaurant!"
 *               rating:
 *                 type: number
 *                 example: 5
 *               reviewerId:
 *                 type: string
 *                 example: "987654321"
 *               reviewerName:
 *                 type: string
 *                 example: "Reviewer Name"
 *               ownerReply:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "1234567890"
 *                     reply:
 *                       type: string
 *                       example: "Thank you for your review!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-23T06:21:36.315Z"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-23T06:21:36.315Z"
 */

/* GetAllRestaurants */
/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllRestaurantsResponse:
 *       type: object
 *       properties:
 *         contactInfo:
 *           type: object
 *           properties:
 *             emailId:
 *               type: string
 *             phoneNumber:
 *               type: string
 *         address:
 *           type: object
 *           properties:
 *             line_1:
 *               type: string
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             pincode:
 *               type: string
 *             country:
 *               type: string
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             onwerName:
 *               type: string
 *             ownerType:
 *               type: string
 *         _id:
 *           type: string
 *         restaurantName:
 *           type: string
 *         tableCapacity:
 *           type: integer
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         foodMenu:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *               itemPrice:
 *                 type: string
 *               _id:
 *                 type: string
 *         reviewsInfo:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               review:
 *                 type: string
 *               rating:
 *                 type: integer
 *               reviewerId:
 *                 type: string
 *               reviewerName:
 *                 type: string
 *               ownerReply:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     reply:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *               createdAt:
 *                 type: string
 *       example:
 *         contactInfo:
 *           emailId: maduraivillas@gmail.com
 *           phoneNumber: "1234567890"
 *         address:
 *           line_1: 12
 *           street: Vizhakuthoon
 *           city: Madurai
 *           pincode: "625001"
 *           country: India
 *         createdBy:
 *           _id: "65fc5760a6ebc1c47bdb99ed"
 *           onwerName: BO
 *           ownerType: bo
 *         _id: "65fd255c18affdf45d849141"
 *         restaurantName: Madurai Villas
 *         tableCapacity: 50
 *         images:
 *           - https://example.com/image1.jpg
 *         foodMenu:
 *           - itemName: Mutton Biriyani
 *             itemPrice: "210.00"
 *             _id: SjelAZ0CSG
 *           - itemName: Chicken Biriyani
 *             itemPrice: "180.00"
 *             _id: PfCQ9PS09j
 *         reviewsInfo:
 *           - _id: "65fdcee0a5035b763d686521"
 *             review: Food city is Madurai, semma sappadu
 *             rating: 5
 *             reviewerId: "65fd08f34fb8cbd5f05aa159"
 *             reviewerName: Ram Vignesh M
 *             ownerReply: []
 *             createdAt: "2024-03-22T18:33:04.610Z"
 */

/* Delete Restaurant */
/**
 * @openapi
 * components:
 *   schemas:
 *     DeleteRestaurantResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *         message:
 *           type: string
 *           example: Deleted successfully!...
 */

export const deleteRestaurantSchema = zod.object({
  query: zod.object({
    restaurantId: zod.string({
      required_error: "RestaurantId should be string",
    }),
  }),
});

/**
 * Define the type for the input data
 */
export type CreateRestaurantInput = TypeOf<
  typeof createRestaurantSchema
>["body"];
export type DeleteRestaurantQuery = TypeOf<
  typeof deleteRestaurantSchema
>["query"];
