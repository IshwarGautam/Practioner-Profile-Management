/**
 * @openapi
 * components:
 *  schemas:
 *    PractitionerInput:
 *      type: object
 *      required:
 *        - fullName
 *        - email
 *        - contact
 *        - dob
 *        - workingDays
 *        - startTime
 *        - endTime
 *      properties:
 *        fullName:
 *          type: string
 *          default: Martin Luthar
 *        email:
 *          type: string
 *          default: martin@example1.com
 *        contact:
 *          type: number
 *          default: 9811122233
 *        dob:
 *          type: string
 *          default: 2022-12-08
 *        workingDays:
 *          type: number
 *          default: 5
 *        startTime:
 *          type: string
 *          default:  09:00
 *        endTime:
 *          type: string
 *          default: 18:00
 *    PractitionerResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        fullName:
 *          type: string
 *        email:
 *          type: string
 *        contact:
 *          type: number
 *        dob:
 *          type: string
 *        workingDays:
 *          type: number
 *        startTime:
 *          type: string
 *        endTime:
 *          type: string
 */
