import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService, IRequestHandler, RecordIdModel, Result} from '@softobiz-df/shared-lib';
import { User } from 'src/domain/user';
import { IUserRepository } from 'src/infrastructure/data-access/irepositories';
import { DeleteUserCommand } from './delete-user.cmd';
import { DeleteUserResponseType } from './delete-user.response.type';

@Injectable()
export class DeleteUserCommandHandler implements IRequestHandler<DeleteUserCommand, DeleteUserResponseType> {
	private readonly _logger = AppLoggerService.getLogger(DeleteUserCommandHandler)

	constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) { }
	async handle(commandOrQuery: DeleteUserCommand, token?: string): Promise<DeleteUserResponseType> {

		const users: Result<User> = await this._userRepo.findById(commandOrQuery.id)
		const userValue = users.getValue()
        console.log(userValue);
 

		await this._userRepo.remove(userValue)
		console.log("Delete successfully");	
		return Result.ok(new RecordIdModel({ id: userValue.id.toString()}))
 		
	}
		
}