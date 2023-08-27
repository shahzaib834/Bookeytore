import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import * as moment from 'moment';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(AppService.name);

  @Cron('10 * * * * *', {
    name: 'setIsDefaulterValuesToMembers',
  })
  async handleCron() {
    this.logger.debug('JOB STARTED setIsDefaulterValuesToMembers');
    try {
      // fetch members
      const members = await this.prisma.member.findMany({
        include: { RentedBooks: true },
      });

      // check if they have books and not returned for 15 days after the return time
      members.map((member) => {
        member.RentedBooks.map(async (rentedbook) => {
          if (rentedbook.rentEndDate) {
            const rentEndData = moment(rentedbook.rentEndDate);
            const currentDate = moment('01-01-2019');
            const diffDays = rentEndData.diff(currentDate, 'days');
            if (diffDays > 15) {
              // set member to isDefaulter
              await this.prisma.member.update({
                where: {
                  id: member.id,
                },
                data: { isDefaulter: true },
              });
            }
          }
        });
      });

      // check if user is a monthly member and has not paid fee for 15 days
      this.logger.debug('JOB ENDED SUCCESFULLY setIsDefaulterValuesToMembers');
    } catch (err) {
      this.logger.debug(
        'JOB ENDED WITH ERRORS setIsDefaulterValuesToMembers',
        err
      );
    }
  }
}
