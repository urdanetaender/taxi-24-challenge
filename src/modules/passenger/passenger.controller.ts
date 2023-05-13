import {
  Controller,
  Get,
  HttpStatus,
  Param,
  HttpCode,
  ParseUUIDPipe,
  Logger,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import catchError from 'src/common/catch-error';
import { PassengerOutputDto } from './dto/passenger-output.dto';
import { ResponseErrorDto } from 'src/common/response.dto';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {
  private readonly logger = new Logger(PassengerController.name);
  constructor(private readonly passengerService: PassengerService) {}

  @Get(':uid')
  @ApiOperation({ summary: 'Get driver for uid.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: PassengerOutputDto,
    description: 'Signer get successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ResponseErrorDto,
    description: 'Internal server error',
  })
  async findOne(
    @Param('uid', new ParseUUIDPipe()) uid: string,
  ): Promise<PassengerOutputDto> {
    try {
      const response = await this.passengerService.findOne(uid);
      return new PassengerOutputDto(response);
    } catch (error) {
      catchError(this.logger, error, 'findOne', 'GET passenger/:uid');
    }
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }
}
