import { HttpException, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";

export const PrismaErrorHandler = (error) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma request errors (e.g., unique constraint violation)
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown Prisma request errors
        throw new HttpException(
          'An unexpected error occurred while creating the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        // Handle validation errors
        throw new HttpException(
          'Validation failed. Please check your input data.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        // Handle other unexpected errors
        throw new HttpException(
          'An unexpected error occurred.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  };