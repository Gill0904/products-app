import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiProperty } from '@nestjs/swagger';


class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: ['error info'], type: [String] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export function ApiValidationErrorResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Error de validación',
      type: ValidationErrorResponseDto,
    })
  );
}
