import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IMediator, Result } from '@softobiz-df/shared-lib';
import { UserCreateCommand } from '../use-cases/user/commands/user/user.cmd';
import { UserCreateResponseType } from '../use-cases/user/commands/user/user.response.type';
import { GetUserQuery } from '../use-cases/user/queries/user/user.query';
import { GetUserReponseType } from '../use-cases/user/queries/user/user.response.type';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Put,Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UpdateUserCommand } from '../use-cases/user/commands/updateUser/update-user.cmd';
import { UpdateUserResponseType } from '../use-cases/user/commands/updateUser/update-user.response.type';
import { DeleteUserResponseType } from '../use-cases/user/commands/deleteUser/delete-user.response.type';
import { DeleteUserCommand } from '../use-cases/user/commands/deleteUser/delete-user.cmd';
import { User } from 'src/domain/user';

// import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly _mediator: IMediator) { }


	@Post('create')
	async createUser(@Body() payload: UserCreateCommand): Promise<UserCreateResponseType> {
		return this._mediator.send<UserCreateResponseType>(new UserCreateCommand(payload))
	}
//update
	@Put()
	async updateUser(@Query('id') _id: string, @Body() payload: UpdateUserCommand): Promise<UpdateUserResponseType> {
		return this._mediator.send<UpdateUserResponseType>(new UpdateUserCommand(payload))
	}

//delete
@Delete()
async deleteUser(@Query('id') _id: string, @Body() payload: DeleteUserCommand): Promise<DeleteUserResponseType> {
	return this._mediator.send<DeleteUserResponseType>(new DeleteUserCommand(payload))
}


	@ApiQuery({ name: 'id', description: 'Gets the Action id' })
	@Get()
	async getUser(@Query("id") id): Promise<GetUserReponseType> {
		return this._mediator.send<GetUserReponseType>(new GetUserQuery({ id }))

	}
	// @Get('getall')
	// async getAllUser(user: User): Promise<GetAllReponseType> {
	// 	return this._mediator.send<GetAllReponseType>(new GetAllQuery({ user }))

	// }

	@Get("health")
	async getHealth(): Promise<Result<string>> {
		return Result.ok(" Service running ")

	}
}
